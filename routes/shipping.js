var express = require("express");
var router = express.Router();

const shippingController = require("../controllers/ShippingController");

/* GET users listing. */
router.get("/", shippingController.getAllShippings);
router.get("/:id", shippingController.getOneShipping);
router.post("/", shippingController.calcShippingFee);
router.put("/:id", shippingController.updateShiping);

module.exports = router;
