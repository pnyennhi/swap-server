const _ = require("lodash");
const models = require("../models");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");

class WishlistController {
  async getAllWishlist(req, res) {
    try {
      const wishlists = await models.Wishlist.findAll({
        include: [{ model: models.Product, as: "product" }],
      });

      return res.status(200).json(wishlists);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getWishlistOfUser(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const wishlists = await models.Wishlist.findAll({
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

      return res.status(200).json(wishlists);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async checkWishlist(req, res) {
    try {
      const { productId } = req.params;

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const wishlist = await models.Wishlist.findOne({
        productId: productId,
        userId: userId,
      });

      if (!wishlist) {
        return res.status(200).json({ isLiked: false });
      }

      return res.status(200).json({ isLiked: true });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async addWishlist(req, res) {
    try {
      const { productId } = req.body;
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const oldWishlist = await models.Wishlist.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });

      if (oldWishlist) {
        return res.status(200).json(oldWishlist);
      }

      const wishlist = await models.Wishlist.create({
        ...req.body,
        userId: userId,
      });

      return res.status(200).json(wishlist);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async deleteWishlist(req, res) {
    try {
      const { id } = req.params;

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const wishlist = await models.Wishlist.findOne({
        where: { productId: id, userId: userId },
      });

      if (!wishlist) {
        return res.status(200).json("Not found");
      }

      // if (wishlist.dataValues.userId !== userId) {
      //   return res.status(400).json("You are not allowed");
      // }

      const result = await models.Wishlist.destroy({
        where: { productId: id, userId: userId },
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new WishlistController();
