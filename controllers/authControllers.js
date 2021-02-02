var jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");
require("dotenv").config();

const allowedAccess = {};

allowedAccess.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.send({ errorSource: "JWT" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.send({ errorSource: "JWT" });
    } else {
      req.user = user;
      next();
    }
  });
};

allowedAccess.verifyPassword = (req, res, next) => {
  let userID;
  const { password } = req.body;

  if (req.user) {
    userID = req.user.id;
    UserModel.findById(userID)
      .select("password")
      .then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.send({ errorSource: "BCRYPT" });
          } else {
            if (result) {
              next();
            } else {
              res.send({ errorSource: "password verification" });
            }
          }
        });
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    userID = req.body.email;
    UserModel.find({ email: userID })
      .then((users) => {
        if (users.length) {
          let user = users[0];
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              res.send({ errorSource: "BCRYPT" });
            } else {
              if (result) {
                req.user = user;
                next();
              } else {
                res.send({ logged: false, errorSource: "wrong pwd" });
              }
            }
          });
        } else {
          res.send({ errorSource: "No user" });
        }
      })
      .catch((err) => res.send(err));
  }
};

module.exports = allowedAccess;
