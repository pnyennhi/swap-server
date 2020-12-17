const _ = require("lodash");
const models = require("../models");
const { ChangeToSlug } = require("../utils/slug");

class SubCategoryController {
  async getOneSubCategory(req, res) {
    try {
      const { id } = req.params;

      const subCategory = await models.SubCategory.findOne({
        where: { id: id },
        include: [
          {
            model: models.Category,
            as: "parent",
          },
        ],
      });

      if (!subCategory) {
        return res.status(500).json("Not found");
      }

      const totalProducts = await models.Product.count({
        where: { subCategoryId: subCategory.id },
      });

      subCategory.dataValues.totalProducts = totalProducts;

      return res.status(200).json(subCategory);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createSubCategory(req, res) {
    try {
      const bodySubCategory = req.body.subCategory;

      const parentId = req.body.parentId;
      const category = await models.Category.findOne({
        where: { id: parentId },
      });

      const path = `${category.path}/${ChangeToSlug(bodySubCategory)}`;

      const subCategory = await models.SubCategory.create({
        ...req.body,
        path,
      });

      return res.status(200).json(subCategory);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateSubCategory(req, res) {
    try {
      const { id } = req.params;

      const subCategory = await models.SubCategory.findOne({
        where: { id: id },
      });

      const parentId = req.body.parentId;
      const category = await models.Category.findOne({
        where: { id: parentId },
      });

      const path = `${category.path}/${ChangeToSlug(req.body.subCategory)}`;

      subCategory.subCategory = req.body.subCategory;
      subCategory.path = path;
      subCategory.parentId = req.body.parentId;

      if (subCategory.save()) {
        return res.status(200).json(subCategory);
      }

      return res.status(400).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new SubCategoryController();
