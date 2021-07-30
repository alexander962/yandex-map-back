const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
  email: {type: String, require: true, index:true, unique:true, sparse:true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String}
});

module.exports = model('User', UserSchema)