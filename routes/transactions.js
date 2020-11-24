var express = require("express");
var router = express.Router();
var auth = require("../utils/auth");

const transactionController = require("../controllers/TransactionController");
const paypalPayoutController = require("../controllers/PaypalPayoutController");

/* GET users listing. */
router.get("/", transactionController.getAllTransactions);
router.get(
  "/user",
  auth.isAuthenticated,
  transactionController.getTransactionsOfUser
);
router.get("/:id", transactionController.getOneTransaction);
router.post(
  "/",
  transactionController.createTransaction,
  paypalPayoutController.createPayout
);

module.exports = router;
