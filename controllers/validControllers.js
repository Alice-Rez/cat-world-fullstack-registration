const validateData = (req, res, next) => {
  console.log(req.body);
  Object.keys(req.body).map((input) => {
    req.check(`${input}`).trim().escape();
  });

  let { fullName, email, password, uname, newPassword } = req.body;

  if (fullName) {
    req.check("fullName", "fullname").custom((value) => {
      return value.match(/^[A-Za-z ]+$/);
    });
  }
  if (email) {
    req.check("email", "email").isEmail();
  }

  if (password) {
    req
      .check("password", "password length")
      .isLength({ min: 10 })
      .trim()
      .escape();
  }
  if (uname) {
    req.check("uname", "uname").isAlphanumeric();
  }

  if (newPassword) {
    req.check("newPassword", "password length").isLength({ min: 10 });
  }

  let errors = req.validationErrors();

  if (!errors) {
    next();
  } else {
    res.send({ msg: errors });
  }
};

module.exports = validateData;
