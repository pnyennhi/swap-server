var express = require("express");
var router = express.Router();

const conditionController = require("../controllers/ConditionController");

/* GET conditions listing. */
router.get("/", conditionController.getAllConditions);
router.get("/:id", conditionController.getOneCondition);
// router.post("/", conditionController.createCondition);
// router.post("/admin", conditionController.createAdmin);
router.put("/:id", conditionController.updateCondition);
// router.delete("/:id", conditionController.deleteCondition);

module.exports = router;
