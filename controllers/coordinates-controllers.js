const Coordinates = require("../models/coordinates-model");

module.exports.getAllCoordinates = async (req, res, next) => {
  try {
    const { userIdBody } = req.query;
    await Coordinates.find().where({userId: userIdBody}).then((result) => {
      res.send({ data: result });
    });
  } catch (e) {
    console.log(e)
    res.send({ message: "Server error" });
  }
};

module.exports.createCoordinates = async (req, res, next) => {
  try {
    const coordinates = new Coordinates(req.body);
    await coordinates.save().then((result) => {
      res.send({ data: result });
    });
  } catch (e) {
    res.send({ message: "Server error" });
  }
};

module.exports.editCoordinates = async (req, res) => {
  await Coordinates.updateOne({_id: req.body._id}, req.body).then(result => {
    Coordinates.find().then(result => {
      res.send({data: result})
    })
  })
}

module.exports.deleteCoordinates = async (req, res) => {
  await Coordinates.deleteOne({_id: req.body.id}).then(result => {
    Coordinates.find().then(result => {
      res.send({data: result});
    })
  })
}
