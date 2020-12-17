const _ = require("lodash");
const models = require("../models");

class MaterialController {
  async getAllMaterials(req, res) {
    try {
      const materials = await models.Material.findAll({
        order: [["material", "asc"]],
      });

      return res.status(200).json(materials);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new MaterialController();
