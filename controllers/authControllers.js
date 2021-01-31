var jwt = require("jsonwebtoken");
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
    }
    req.user = user;
    next();
  });
};

module.exports = allowedAccess;
