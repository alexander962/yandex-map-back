const Router = require("express").Router;
const userController = require("../controllers/user-controllers");
const router = new Router();
const { body } = require("express-validator");


router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({min: 5, max: 32}),
  body("password").matches(/(?=.*[0-9])(?=.*[A-Za-z]){5,}/, "i"),
  userController.createNewUser,
);
router.get("/activate/:link", userController.activate);
router.post("/login", userController.checkUser);

// const {
//   getAllCoordinates,
//   createCoordinates,
//   editCoordinates,
//   deleteCoordinates,
// } = require("../controllers/coordinates-controllers");

// router.get("/getAllCoordinates", getAllCoordinates);
// router.post("/createCoordinates", createCoordinates);
// router.patch("/editCoordinates", editCoordinates);
// router.delete("/deleteCoordinates", deleteCoordinates);

module.exports = router;
