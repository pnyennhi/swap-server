const _ = require("lodash");
const models = require("../models");

class BrandController {
  async getAllBrands(req, res) {
    try {
      const brands = await models.Brand.findAll({ order: [["brand", "asc"]] });

      return res.status(200).json(brands);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new BrandController();
