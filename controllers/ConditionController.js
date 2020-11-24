const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("../config/app");
const { Condition, Product } = require("../models");

class ConditionController {
  async getAllConditions(req, res) {
    try {
      const { page, pageSize, sort, criteria, keyword } = req.query;

      const allConditions = await Condition.findAll({});
      if (!allConditions) {
        return res.status(200).json("Not found");
      }

      allConditions.forEach(async (condition) => {
        const totalProducts = await Product.count({
          where: { conditionId: condition.id },
        });
        condition.dataValues.totalProducts = totalProducts;
      });

      switch (criteria) {
        case "id":
          allConditions.sort((a, b) => {
            return sort === "asc" ? a.id - b.id : b.id - a.id;
          });
          break;
        case "condition":
          allConditions.sort((a, b) => {
            var conditionA = a.condition.toUpperCase(); // bỏ qua hoa thường
            var conditionB = b.condition.toUpperCase(); // bỏ qua hoa thường
            if (conditionA < conditionB) {
              return sort === "asc" ? -1 : 1;
            }
            if (conditionA > conditionB) {
              return sort === "asc" ? 1 : -1;
            }

            return 0;
          });
          break;
        case "totalProducts":
          allConditions.sort((a, b) => {
            return sort === "asc"
              ? a.totalProducts - b.totalProducts
              : b.totalProducts - a.totalProducts;
          });
          break;

        default:
          break;
      }

      const conditions =
        page & pageSize
          ? allConditions.slice(
              pageSize * (page - 1),
              pageSize * (page - 1) + pageSize
            )
          : allConditions;

      const count = await Condition.count();

      return res.status(200).json({ data: conditions, total: count });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneCondition(req, res) {
    try {
      const { id } = req.params;

      const condition = await Condition.findOne({
        where: { id: Number(id) },
      });
      if (!condition) {
        return res.status(200).json("Not found");
      }

      condition.dataValues.totalProducts = await Product.count({
        where: { conditionId: condition.id },
      });

      return res.status(200).json(condition);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createCondition(req, res) {
    try {
      let condition;
      // TODO: validate username
      condition = await Condition.findOne({
        where: { condition: req.body.condition },
      });
      if (condition) {
        return res.status(500).json("Condition existed");
      }

      condition = await Condition.create(req.body);

      res.status(200).json(condition);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateCondition(req, res) {
    try {
      const { id } = req.params;

      const condition = await Condition.findOne({
        where: { id: Number(id) },
      });

      condition.condition = req.body.condition;
      condition.description = req.body.description;

      if (condition.save()) {
        res.status(200).json(condition);
      }

      res.status(400).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  // async deleteCondition(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const condition = await Condition.findOne({
  //       where: { id: Number(id) },
  //     });

  //     condition.isActive = false;

  //     if (condition.save()) {
  //       res.status(200).json(condition);
  //     }

  //     res.status(400).json("Error");
  //   } catch (error) {
  //     return res.status(400).json(error.message);
  //   }
  // }
}
module.exports = new ConditionController();
