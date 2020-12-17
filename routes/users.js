var express = require("express");
var router = express.Router();
var auth = require("../utils/auth");

const userController = require("../controllers/UserController");

/* GET users listing. */
router.get("/profile", auth.isAuthenticated, userController.getProfile);
router.get("/", userController.getAllUsers);
router.get("/owner/:id", userController.getOwnerInfo);
router.get(
  "/:id",
  auth.isAuthenticated,
  auth.isAdmin,
  userController.getOneUser
);
router.post("/", userController.createUser);
router.post(
  "/admin",
  auth.isAuthenticated,
  auth.isAdmin,
  userController.createAdmin
);
router.put("/profile", auth.isAuthenticated, userController.updateProfile);
router.put(
  "/change-password",
  auth.isAuthenticated,
  userController.updatePassword
);
router.put(
  "/unlock/:id",
  auth.isAuthenticated,
  auth.isAdmin,
  userController.unlockUser
);

router.put(
  "/:id",
  auth.isAuthenticated,
  auth.isAdmin,
  userController.updateUser
);
router.delete(
  "/:id",
  auth.isAuthenticated,
  auth.isAdmin,
  userController.deleteUser
);

module.exports = router;
