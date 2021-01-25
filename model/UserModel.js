let mongoose = require("mongoose");
let connect = require("./connection");
const bcrypt = require("bcrypt");

let UserSchema = new mongoose.Schema({
  fullName: { type: String, minlength: 2 },
  email: { type: String, unique: true, required: true },
  uname: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
});

let UserModel = mongoose.model("users", UserSchema);

function registerUser(user) {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        let newUser = new UserModel(user);
        bcrypt.hash(user.password, 10, (err, hashedPassword) => {
          if (!err) {
            newUser.password = hashedPassword;
            newUser
              .save()
              .then(() => resolve())
              .catch((err) => reject(err));
          } else {
            reject(new Error("can not hash the password"));
          }
        });
      })
      .catch((err) => {
        reject();
      });
  });
}

module.exports = { UserModel, registerUser };
