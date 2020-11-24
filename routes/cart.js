var express = require("express");
var router = express.Router();
var auth = require("../utils/auth");

const cartControler = require("../controllers/CartController");

/* GET users listing. */
router.get("/", auth.isAuthenticated, cartControler.getAllCart);
router.get("/user", auth.isAuthenticated, cartControler.getCartOfUser);
router.post("/", auth.isAuthenticated, cartControler.addCart);
router.put("/", auth.isAuthenticated, cartControler.updateCart);
router.delete("/:id", auth.isAuthenticated, cartControler.deleteCart);

module.exports = router;
