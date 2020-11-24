var express = require("express");
var router = express.Router();
var auth = require("../utils/auth");

const recipientController = require("../controllers/RecipientController");

/* GET users listing. */
router.get("/", auth.isAuthenticated, recipientController.getAllRecipients);
router.get(
  "/user",
  auth.isAuthenticated,
  recipientController.getRecipientsOfUser
);
router.get(
  "/users/:userId",
  auth.isAuthenticated,
  auth.isAdmin,
  recipientController.getRecipientsOfUserAdmin
);
router.get("/:id", auth.isAuthenticated, recipientController.getOneRecipient);
router.post("/", auth.isAuthenticated, recipientController.createRecipient);
router.put(
  "/default/:id",
  auth.isAuthenticated,
  recipientController.setDefaultRecipient
);
router.put("/:id", auth.isAuthenticated, recipientController.updateRecipient);
router.delete(
  "/:id",
  auth.isAuthenticated,
  recipientController.deleteRecipient
);

module.exports = router;
