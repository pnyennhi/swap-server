var express = require("express");
var router = express.Router();

const reviewController = require("../controllers/ReviewController");

/* GET users listing. */
router.get("/", reviewController.getAllReviews);
router.post("/", reviewController.createReview);

module.exports = router;
