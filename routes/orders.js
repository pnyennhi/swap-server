var express = require("express");
var router = express.Router();
var auth = require("../utils/auth");

const orderItemController = require("../controllers/OrderItemController");
const orderController = require("../controllers/OrderController");

/* GET users listing. */
router.get(
  "/",
  auth.isAuthenticated,
  auth.isAdmin,
  orderController.getAllOrders
);
router.get("/user", auth.isAuthenticated, orderController.getOrdersOfUser);
router.get("/seller", auth.isAuthenticated, orderController.getOrdersOfSeller);
router.get(
  "/seller/statistic",
  auth.isAuthenticated,
  orderController.getStatisticOfSeller
);
router.get(
  "/seller/statistic/:id",
  auth.isAuthenticated,
  auth.isAdmin,
  orderController.adminGetStatisticOfSeller
);
router.get(
  "/revenue",
  auth.isAuthenticated,
  orderController.getRevenueOfSeller
);
router.get(
  "/users/:userId",
  auth.isAuthenticated,
  auth.isAdmin,
  orderController.adminGetOrdersOfUser
);

router.get("/:id", auth.isAuthenticated, orderController.getOneOrder);
router.post(
  "/",
  auth.isAuthenticated,
  orderController.createOrder,
  orderItemController.createOrderItems
);
router.put("/accept/:id", auth.isAuthenticated, orderController.acceptOrder);
router.put(
  "/reject/:id",
  auth.isAuthenticated,
  orderController.rejectOrder,
  orderItemController.rejectOrderItem
);

router.put(
  "/:id",
  auth.isAuthenticated,
  orderController.updateOrder,
  orderItemController.rejectOrderItem
);

router.put("/method/:id", auth.isAuthenticated, orderController.updateMethod);

module.exports = router;
