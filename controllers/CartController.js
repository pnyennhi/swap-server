const _ = require("lodash");
const models = require("../models");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");

class CartController {
  async getAllCart(req, res) {
    try {
      const carts = await models.Cart.findAll({
        include: [{ model: models.Product, as: "product" }],
      });

      return res.status(200).json(carts);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getCartOfUser(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const carts = await models.Cart.findAll({
        where: { userId: userId },
        include: [
          {
            model: models.Product,
            as: "product",
            include: [
              { model: models.User, as: "owner" },
              { model: models.ProductImage, as: "images" },
            ],
          },
        ],
      });

      return res.status(200).json(carts);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async addCart(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const { productId } = req.body;

      console.log(productId);

      const oldCart = await models.Cart.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });

      if (oldCart) {
        return res.status(200).json(oldCart);
      }

      const cart = await models.Cart.create({
        userId: userId,
        productId: productId,
        quantity: 1,
      });

      const wishlist = await models.Wishlist.findOne({
        where: { productId: productId, userId: userId },
      });

      if (wishlist) {
        const result = await models.Wishlist.destroy({
          where: { productId: productId, userId: userId },
        });
      }

      return res.status(200).json(cart);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateCart(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const { productId } = req.body;

      const cart = await models.Cart.findOne({
        where: {
          productId: productId,
          userId: userId,
        },
        include: [
          {
            model: models.Product,
            as: "product",
          },
        ],
      });

      if (req.body.quantity > cart.product.quantity - cart.product.soldQuantity)
        return res.status(500).json("Quantity is over");

      if (cart.product.quantity === cart.product.soldQuantity)
        return res.status(500).json("Out of stock");

      cart.quantity = req.body.quantity;
      if (cart.save()) {
        return res.status(200).json(cart);
      }

      return res.status(400).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async deleteCart(req, res) {
    try {
      const { id } = req.params;

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const cart = await models.Cart.findOne({
        where: { productId: id, userId: userId },
      });

      if (!cart) {
        return res.status(200).json("Not found");
      }

      // if (cart.dataValues.userId !== userId) {
      //   return res.status(400).json("You are not allowed");
      // }

      const result = await models.Cart.destroy({
        where: { productId: id, userId: userId },
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new CartController();
