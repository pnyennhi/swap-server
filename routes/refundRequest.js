var express = require("express");
var router = express.Router();

const refundRequestController = require("../controllers/RefundRequestController");

/* GET users listing. */
router.get("/:id", refundRequestController.getRequestOfOrder);
router.post("/", refundRequestController.createRequest);
router.put("/:id", refundRequestController.updateRequest);

module.exports = router;
