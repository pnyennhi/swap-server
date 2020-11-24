var express = require("express");
var router = express.Router();

const categoryController = require("../controllers/CategoryController");

/* GET users listing. */
router.get("/", categoryController.getAllCategories);
router.get("/all", categoryController.getCategoryList);
router.get("/getFilters/:path", categoryController.getCategory);
router.get("/:id", categoryController.getOneCategory);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);

module.exports = router;
