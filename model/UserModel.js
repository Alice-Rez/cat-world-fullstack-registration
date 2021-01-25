let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  fullName: { type: String, minlength: 2 },
  email: { type: String, unique: true, required: true },
  uname: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
});

let UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
