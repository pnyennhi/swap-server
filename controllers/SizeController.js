const _ = require("lodash");
const models = require("../models");
const Sequelize = require("sequelize");

class SizeController {
  async getAllSizes(req, res) {
    try {
      const { categoryId, category, isUnique } = req.query;

      const query = { where: {} };

      if (categoryId) {
        query.where.categoryId = categoryId;
      }
      if (category) {
        const categoryPath = category.includes("/")
          ? category.slice(0, path.indexOf("/"))
          : category;

        const categoryData = await models.Category.findOne({
          where: { path: categoryPath },
        });

        query.where.categoryId = categoryData.id;
      }

      if (isUnique) {
        query.attributes = [
          [Sequelize.fn("DISTINCT", Sequelize.col("size")), "size"],
        ];
      }

      const sizes = await models.Size.findAll({
        where: query.where,
        ...query,
      });

      return res.status(200).json(sizes);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new SizeController();
