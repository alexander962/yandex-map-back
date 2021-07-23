const express = require("express");
const router = express.Router();

const {
  createNewUser,
  checkUser,
} = require("../controllers/user-controllers");

router.post("/createUser", createNewUser);
router.post("/checkUser", checkUser);

const {
  getAllCoordinates,
  createCoordinates,
  editCoordinates,
  deleteCoordinates,
} = require("../controllers/coordinates-controllers");

router.get("/getAllCoordinates", getAllCoordinates)
router.post("/createCoordinates", createCoordinates)
router.patch("/editCoordinates", editCoordinates)
router.delete("/deleteCoordinates", deleteCoordinates)

module.exports = router;