var express = require("express");
var router = express.Router();

const dashboardController = require("../controllers/DashboardController");

/* GET users listing. */
router.get("/", dashboardController.getDashboard);
router.get("/user", dashboardController.getDashboardOfUser);

module.exports = router;
