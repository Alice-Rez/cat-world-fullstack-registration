let mongoose = require("mongoose");
let connection = require("./connection");

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
    connection()
      .then(() => {
        const newUser = new UserModel(user);
        newUser
          .save()
          .then(() => resolve())
          .catch((err) => reject(err));
      })
      .catch((err) => {
        reject();
      });
  });
}

module.exports = { UserModel, registerUser };
