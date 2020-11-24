var express = require("express");
var router = express.Router();

const subCategoryController = require("../controllers/SubCategoryController");

/* GET users listing. */
// router.get("/", categoryController.getAllCategories);
router.get("/:id", subCategoryController.getOneSubCategory);
router.post("/", subCategoryController.createSubCategory);

router.put("/:id", subCategoryController.updateSubCategory);

module.exports = router;
