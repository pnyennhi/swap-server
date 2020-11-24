var express = require("express");
var router = express.Router();

const orderStatusController = require("../controllers/OrderStatusController");

/* GET users listing. */
router.get("/", orderStatusController.getAllOrderStatus);
module.exports = router;
