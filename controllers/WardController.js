const _ = require("lodash");
const models = require("../models");

class WardController {
  async getAllWards(req, res) {
    try {
      const wards = await models.Ward.findAll();

      return res.status(200).json(wards);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneWard(req, res) {
    try {
      const { id } = req.params;

      const ward = await models.Ward.findOne({
        where: { id: id },
      });
      if (!ward) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(ward);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getWardsOfDistrict(req, res) {
    try {
      const { districtId } = req.params;

      const wards = await models.Ward.findAll({
        where: { districtId: districtId },
      });
      if (!wards) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(wards);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new WardController();
