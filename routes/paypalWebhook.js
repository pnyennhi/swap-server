var express = require("express");
var router = express.Router();

const paypalWebhookController = require("../controllers/PaypalWebhookController");

/* GET users listing. */
router.post("/", paypalWebhookController.webhook);

module.exports = router;
