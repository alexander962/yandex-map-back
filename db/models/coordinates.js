const mongoose = require("mongoose");

const {Schema} = mongoose;

const coordinatesSchema = new Schema({
  name: String,
  longitude: Number,
  latitude: Number,
  userId: String
});

module.exports = Coordinates = mongoose.model("coordinates", coordinatesSchema)
