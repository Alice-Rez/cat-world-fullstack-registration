var express = require("express");
const { UserModel, registerUser, checkUser } = require("../model/UserModel");
var jwt = require("jsonwebtoken");
var router = express.Router();
let multer = require("multer");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

let storage = multer.diskStorage({
  destination: "uploads/images/",
  filename: function (req, file, cb) {
    console.log("###########");
    console.log(req.body);
    cb(null, uuidv4() + "." + file.mimetype.split("/")[1]);
  },
});

let uploads = multer({ storage: storage, limits: { fileSize: 1000000 } });

/* GET users listing. */
router.get("/all", function (req, res, next) {
  UserModel.find()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.get("/info/:id", function (req, res, next) {
  let user = req.params.id;
  UserModel.find({ email: user })
    .select("-password")
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.post("/register", (req, res, next) => {
  console.log(req.body);
  req
    .check("fullName", "fullname")
    .custom((value) => {
      return value.match(/^[A-Za-z ]+$/);
    })
    .trim()
    .escape();
  req.check("email", "email").isEmail().trim().escape();
  req
    .check("password", "password length")
    .isLength({ min: 10 })
    .trim()
    .escape();
  req.check("uname", "uname").isAlphanumeric().trim().escape();

  let errors = req.validationErrors();

  if (errors) {
    res.send({ msg: errors });
  } else {
    console.log(req.body);
    let newUser = req.body;

    let addedUser = new UserModel({
      fullName: newUser.fullName,
      email: newUser.email,
      uname: newUser.uname,
      password: newUser.password,
    });

    addedUser
      .save()
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  }
});

router.post("/login", (req, res, next) => {
  console.log("uuid:", uuidv4());
  console.log(req.body);
  req.check("email", "email").trim().escape();
  req.check("password", "password length").trim().escape();
  let { email, password } = req.body;

  UserModel.find({ email: email, password: password })
    .then((result) => {
      if (result.length) {
        // let token = jwt.sign({ name: "fahim" }, process.env.secret);
        console.log("user ID:", result[0]._id);
        // res.cookie("isLogged", true, { httpOnly: false });
        let user = result[0];
        res.send({
          logged: true,
          uname: user.uname,
          email: user.email,
          profileImage: user.profileImage,
        });
      } else {
        res.send({ logged: false });
      }
      console.log(result);
    })
    .catch((err) => res.send(err));
});

router.get("/logout", (req, res, next) => {
  res.send({ logged: false });
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
