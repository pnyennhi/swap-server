const _ = require("lodash");
const models = require("../models");

class ProductStatusController {
  async getAllProductStatus(req, res) {
    try {
      const wards = await models.ProductStatus.findAll();

      return res.status(200).json(wards);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new ProductStatusController();
