const validateData = (req, res, next) => {
  let { fullName, email, password, uname, newPassword } = req.body;
  if (fullName && email && password && uname) {
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
  }
  if (email) {
    req.check("email", "email").trim().escape();
  }
  if (password) {
    req.check("password", "password").trim().escape();
  }
  if (newPassword) {
    req
      .check("newPassword", "password length")
      .isLength({ min: 10 })
      .trim()
      .escape();
  }

  let errors = req.validationErrors();

  if (errors) {
    res.send({ msg: errors });
  } else {
    next();
  }
};

module.exports = validateData;
