const validateData = (req, res, next) => {
  let { fullName, email, password, uname, newPassword } = req.body;
  if (fullName && email && password && uname) {
    req.check("fullName", "fullname").custom((value) => {
      return value.match(/^[A-Za-z ]+$/);
    });
    req.check("email", "email").isEmail();
    req
      .check("password", "password length")
      .isLength({ min: 10 })
      .trim()
      .escape();
    req.check("uname", "uname").isAlphanumeric();
  }
  if (newPassword) {
    req.check("newPassword", "password length").isLength({ min: 10 });
  }

  Object.keys(req.body).map((input) => {
    req.check(`${input}`).trim().escape();
  });

  let errors = req.validationErrors();

  if (errors) {
    res.send({ msg: errors });
  } else {
    next();
  }
};

module.exports = validateData;
