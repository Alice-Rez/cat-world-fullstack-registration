var express = require("express");
const { UserModel, registerUser } = require("../model/UserModel");
var router = express.Router();
let multer = require("multer");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

let storage = multer.diskStorage({
  destination: "uploads/images/",
  filename: function (req, file, cb) {
    console.log("###########");
    console.log(req.body);
    cb(
      null,
      /*req.body.email.split("@")[0] + "-" + Date.now() + "." // +
      file.mimetype.split("/")[1] */
      uuidv4() + "." + file.mimetype.split("/")[1]
    );
  },
});

// we can limit size of file - imageSize is in bites

let uploads = multer({ storage: storage, limits: { fileSize: 1000000 } });

/* GET users listing. */
router.get("/all", function (req, res, next) {
  UserModel.find()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.get("/info/:id", function (req, res, next) {
  if (req.session.isLogged) {
    let user = req.params.id;
    UserModel.find({ email: user })
      .select("-password")
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  } else {
    res.send("you have to log-in to see this information");
  }
});

router.post("/register", (req, res, next) => {
  console.log(req.body);
  req.check("fullName", "fullname").custom((value) => {
    return value.match(/^[A-Za-z ]+$/);
  });
  req.check("email", "email").isEmail();
  // req
  //   .check("email", "user already exists")
  //   .normalizeEmail()
  //   .custom((validateEmail) => {
  //     UserModel.find({ email: validateEmail })
  //       .then((users) => {
  //         if (users.length) {
  //           return false;
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   });
  req.check("password", "password length").isLength({ min: 10 });
  req.check("uname", "uname").isAlphanumeric();

  let errors = req.validationErrors();

  if (errors) {
    res.send({ msg: errors });
  } else {
    console.log(req.body);
    registerUser(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  let loginData = req.body;
  UserModel.find(loginData)
    .then((result) => {
      if (result.length) {
        req.session.isLogged = true;
        console.log(result);
        res.cookie("isLogged", true, { httpOnly: false });
        res.cookie("userID", result[0].email, { httpOnly: true });
        res.send({
          logged: req.session.isLogged,
          uname: result[0].uname,
          email: result[0].email,
        });
      } else {
        res.send({ logged: false });
      }
      console.log(result);
    })
    .catch((err) => res.send(err));
});

router.get("/logout", (req, res, next) => {
  req.session.isLogged = false;
  res.clearCookie("isLogged");
  res.clearCookie("userID");
  res.send({ logged: req.session.isLogged });
});

router.put("/updatePWD", (req, res, next) => {
  console.log(req.body);
  let { userID, password, newPassword } = req.body;
  UserModel.updateOne(
    { email: userID, password: password },
    { password: newPassword }
  )
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.put("/updatePhoto", uploads.single("file"), (req, res, next) => {
  console.log(req.body);
  let { userID } = req.body;
  UserModel.updateOne({ email: userID }, { profileImage: req.file.path })
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

module.exports = router;
