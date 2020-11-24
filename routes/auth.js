var express = require("express");
var router = express.Router();

const authController = require("../controllers/AuthController");

router.post("/loginUser", authController.loginUser);
router.post("/loginAdmin", authController.loginAdmin);

module.exports = router;
