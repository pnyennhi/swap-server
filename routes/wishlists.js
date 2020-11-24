var express = require("express");
var router = express.Router();
var auth = require("../utils/auth");

const wishlistController = require("../controllers/WishlistController");

/* GET users listing. */
router.get("/", auth.isAuthenticated, wishlistController.getAllWishlist);
router.get("/user", auth.isAuthenticated, wishlistController.getWishlistOfUser);
router.get(
  "/:productId",
  auth.isAuthenticated,
  wishlistController.checkWishlist
);
router.post("/", auth.isAuthenticated, wishlistController.addWishlist);
router.delete("/:id", auth.isAuthenticated, wishlistController.deleteWishlist);

module.exports = router;
