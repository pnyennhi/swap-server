var express = require("express");
var router = express.Router();

const sizeController = require("../controllers/SizeController");

/* GET users listing. */
router.get("/", sizeController.getAllSizes);

module.exports = router;
