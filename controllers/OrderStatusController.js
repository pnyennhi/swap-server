const _ = require("lodash");
const models = require("../models");

class OrderStatusController {
  async getAllOrderStatus(req, res) {
    try {
      const wards = await models.OrderStatus.findAll();

      return res.status(200).json(wards);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new OrderStatusController();
