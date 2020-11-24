var express = require("express");
var router = express.Router();

const brandController = require("../controllers/BrandController");

/* GET users listing. */
router.get("/", brandController.getAllBrands);

module.exports = router;
