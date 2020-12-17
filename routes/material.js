var express = require("express");
var router = express.Router();

const materialController = require("../controllers/MaterialController");

/* GET users listing. */
router.get("/", materialController.getAllMaterials);

module.exports = router;
