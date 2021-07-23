const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
  login: String,
  password: String
});

module.exports = Users = mongoose.model("users", userSchema)