var express = require("express");
const { UserModel } = require("../model/UserModel");
var jwt = require("jsonwebtoken");
var router = express.Router();
let multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { authenticateToken } = require("../controllers/authControllers");
const validateData = require("../controllers/validControllers");
const bcrypt = require("bcrypt");

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

router.get("/auth", authenticateToken, (req, res, next) => {
  const user = req.user;
  let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    // secure: true, // causing problems with cat-lovers!
  });
  UserModel.findById(user.id)
    .select(["-password", "-email"])
    .then((result) => {
      console.log(result);
      res.send({
        authorized: true,
        uname: result.uname,
        profileImage: result.profileImage,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/all", authenticateToken, (req, res, next) => {
  UserModel.find()
    .select(["-password"])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send({ err });
    });
});

router.get("/info", authenticateToken, (req, res, next) => {
  const user = req.user;
  UserModel.findById(user.id)
    .select(["-password", "-email"])
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/register", validateData, (req, res, next) => {
  console.log(req.body);
  let newUser = req.body;

  let addedUser = new UserModel({
    fullName: newUser.fullName,
    email: newUser.email,
    uname: newUser.uname,
    password: newUser.password,
  });

  bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
    if (!err) {
      addedUser.password = hashedPassword;
      addedUser
        .save()
        .then((result) => {
          res.send({ registered: true });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.send({ errorSource: "BCRYPT" });
    }
  });
});

router.post("/login", validateData, (req, res, next) => {
  console.log(req.body);
  let { email, password } = req.body;

  UserModel.find({ email: email })
    .then((users) => {
      if (users.length) {
        let user = users[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.send({ errorSource: "BCRYPT" });
          } else {
            if (result) {
              let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "3d",
              });
              res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                // secure: true, // causing problems with cat-lovers!
              });
              console.log(token);

              res.send({
                logged: result,
                uname: user.uname,
                profileImage: user.profileImage,
              });
            } else {
              res.send({ logged: result });
            }
          }
        });
      }
    })
    .catch((err) => res.send(err));
});

router.get("/logout", (req, res, next) => {
  res.clearCookie("token");
  res.send({ logged: false });
});

router.put("/updatePWD", validateData, authenticateToken, (req, res, next) => {
  const userID = req.user.id;
  let { password, newPassword } = req.body;
  UserModel.findById(userID)
    .select("password")
    .then((user) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.send({ errorSource: "BCRYPT" });
        } else {
          if (result) {
            bcrypt.hash(newPassword, 10, (err, hashedPasswordNew) => {
              if (!err) {
                UserModel.findByIdAndUpdate(userID, {
                  password: hashedPasswordNew,
                })
                  .then((update) => {
                    res.send({ updated: true });
                  })
                  .catch((err) => {
                    res.send(err);
                  });
              } else {
                res.send({ errorSource: "BCRYPT" });
              }
            });
          } else {
            res.send({ errorSource: "password verification" });
          }
        }
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put(
  "/updatePhoto",
  authenticateToken,
  uploads.single("file"),
  (req, res, next) => {
    console.log(req.body);
    const userID = req.user.id;
    UserModel.findByIdAndUpdate(
      userID,
      {
        profileImage: req.file.path,
      },
      { useFindAndModify: false }
    )
      .then((result) => {
        console.log(result);
        if (result) {
          res.send({ updated: true, profileImage: req.file.path });
        } else {
          res.send({ updated: false });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

module.exports = router;
