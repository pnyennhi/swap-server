var express = require("express");
var router = express.Router();

const productStatusController = require("../controllers/ProductStatusController");

/* GET users listing. */
router.get("/", productStatusController.getAllProductStatus);
module.exports = router;
