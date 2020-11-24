const _ = require("lodash");
const models = require("../models");

class DistrictController {
  async getAllDistricts(req, res) {
    try {
      const districts = await models.District.findAll();

      return res.status(200).json(districts);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneDistrict(req, res) {
    try {
      const { id } = req.params;

      const district = await models.District.findOne({
        where: { id: id },
      });
      if (!district) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(district);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getDistrictsOfCity(req, res) {
    try {
      const { cityId } = req.params;

      const districts = await models.District.findAll({
        where: { cityId: cityId },
      });
      if (!districts) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(districts);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new DistrictController();
