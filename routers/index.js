const Router = require("express").Router;
const userController = require("../controllers/user-controllers");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware")

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({min: 5, max: 32}),
  body("password").matches(/(?=.*[0-9])(?=.*[A-Za-z]){5,}/, "i"),
  userController.createNewUser,
);
router.get("/activate/:link", userController.activate);
router.post("/login", userController.checkUser);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/getActivated", userController.getActivated);

const {
  getAllCoordinates,
  createCoordinates,
  editCoordinates,
  deleteCoordinates,
} = require("../controllers/coordinates-controllers");

router.get("/getAllCoordinates", authMiddleware, getAllCoordinates);
router.post("/createCoordinates", authMiddleware, createCoordinates);
router.patch("/editCoordinates", authMiddleware, editCoordinates);
router.delete("/deleteCoordinates", authMiddleware, deleteCoordinates);

module.exports = router;
