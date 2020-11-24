var express = require("express");
var router = express.Router();
var auth = require("../utils/auth");

const walletController = require("../controllers/WalletController");

/* GET users listing. */
router.get("/", auth.isAuthenticated, walletController.getWalletOfUser);

module.exports = router;
