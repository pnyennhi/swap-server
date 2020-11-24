const _ = require("lodash");
const models = require("../models");

class CityController {
  async getAllCities(req, res) {
    try {
      const cities = await models.City.findAll({ order: [["city", "asc"]] });

      return res.status(200).json(cities);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneCity(req, res) {
    try {
      const { id } = req.params;

      const city = await models.City.findOne({
        where: { id: id },
      });
      if (!city) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(city);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new CityController();
