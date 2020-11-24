var express = require("express");
var router = express.Router();

const cityController = require("../controllers/CityController");

/* GET users listing. */
router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getOneCity);

module.exports = router;
