const _ = require("lodash");
const models = require("../models");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");

class RecipientController {
  async getAllRecipients(req, res) {
    try {
      const recipients = await models.Recipient.findAll({
        include: [
          { model: models.City, as: "city" },
          { model: models.District, as: "district" },
          { model: models.Ward, as: "ward" },
        ],
      });

      return res.status(200).json(recipients);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneRecipient(req, res) {
    try {
      const { id } = req.params;

      const recipient = await models.Recipient.findOne({
        where: { id: id },
        include: [
          { model: models.City, as: "city" },
          { model: models.District, as: "district" },
          { model: models.Ward, as: "ward" },
        ],
      });
      if (!recipient) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(recipient);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getRecipientsOfUser(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const recipients = await models.Recipient.findAll({
        where: { userId: userId },
        include: [
          { model: models.City, as: "city" },
          { model: models.District, as: "district" },
          { model: models.Ward, as: "ward" },
        ],
      });
      if (!recipients) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(recipients);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getRecipientsOfUserAdmin(req, res) {
    try {
      const { userId } = req.params;

      const recipients = await models.Recipient.findAll({
        where: { userId: userId },
        include: [
          { model: models.City, as: "city" },
          { model: models.District, as: "district" },
          { model: models.Ward, as: "ward" },
        ],
      });
      if (!recipients) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(recipients);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createRecipient(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const oldRecipients = await models.Recipient.findAll({
        where: { userId: userId },
      });

      if (oldRecipients.length <= 0) req.body.isDefault = true;

      const recipient = await models.Recipient.create({
        ...req.body,
        userId: userId,
      });

      return res.status(200).json(recipient);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateRecipient(req, res) {
    try {
      const { id } = req.params;

      const recipient = await models.Recipient.findOne({ where: { id: id } });

      if (!recipient) {
        return res.status(501).json("Id does not exist");
      }

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      if (recipient.userId != userId)
        return res.status(500).json("You don't have permission");

      recipient.name = req.body.name;
      recipient.phone = req.body.phone;
      recipient.address = req.body.address;
      recipient.cityId = req.body.cityId;
      recipient.districtId = req.body.districtId;
      recipient.wardId = req.body.wardId;

      if (recipient.save()) {
        res.status(200).json(recipient);
      }

      return res.status(500).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async setDefaultRecipient(req, res) {
    try {
      const { id } = req.params;

      const recipient = await models.Recipient.findOne({ where: { id: id } });

      if (!recipient) {
        return res.status(501).json("Id does not exist");
      }

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      if (recipient.userId != userId)
        return res.status(500).json("You don't have permission");

      recipient.isDefault = true;

      if (recipient.save()) {
        res.status(200).json(recipient);
      }

      // if (recipient.isDefault) {
      const otherRecipients = await models.Recipient.findAll({
        where: { userId: userId },
      });

      otherRecipients.forEach(async (recipient) => {
        recipient.isDefault = false;

        await recipient.save();
      });
      // }

      return res.status(500).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async deleteRecipient(req, res) {
    try {
      const { id } = req.params;

      const recipient = await models.Recipient.findOne({ where: { id: id } });

      if (!recipient) {
        return res.status(501).json("Id does not exist");
      }

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      if (recipient.userId != userId)
        return res.status(500).json("You don't have permission");

      const deletedRow = await models.Recipient.destroy({ where: { id: id } });

      return res.status(200).json(deletedRow);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new RecipientController();
