var express = require("express");
var router = express.Router();
var auth = require("../utils/auth");

const productController = require("../controllers/ProductController");

/* GET users listing. */
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);
router.post("/", auth.isAuthenticated, productController.createProduct);
router.put("/verify/:id", productController.verifyProduct);
router.put("/reject/:id", productController.rejectProduct);
router.put("/:id", productController.updateProduct);

router.delete(
  "/:id",
  auth.isAuthenticated,
  auth.isAdmin,
  productController.blockProduct
);

module.exports = router;
