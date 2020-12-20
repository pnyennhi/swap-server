var express = require("express");
var router = express.Router();

const orderController = require("../controllers/OrderController");
const orderHistoryController = require("../controllers/OrderHistoryController");
const orderItemController = require("../controllers/OrderItemController");

/* GET users listing. */
router.get("/:id", orderHistoryController.getOrderHistoryOfOrder);
router.post(
  "/",
  orderHistoryController.createOrderHistory,
  orderController.updateOrder,
  orderItemController.rejectOrderItem
);

module.exports = router;
