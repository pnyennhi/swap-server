var express = require("express");
var router = express.Router();

const districtController = require("../controllers/DistrictController");

/* GET users listing. */
router.get("/", districtController.getAllDistricts);
router.get("/city/:cityId", districtController.getDistrictsOfCity);
router.get("/:id", districtController.getOneDistrict);

module.exports = router;
