var express = require("express");
var router = express.Router();

const wardController = require("../controllers/WardController");

/* GET users listing. */
router.get("/", wardController.getAllWards);
router.get("/district/:districtId", wardController.getWardsOfDistrict);
router.get("/:id", wardController.getOneWard);

module.exports = router;
