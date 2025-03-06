const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRole,
} = require("../middleware/authUser");
const {
  getEmailSmsSettings,
  setSmsEmailSettings,
} = require("../controllers/smsEmailSettingsController");

router
  .route("/email-sms-settings")
  .put(isAuthenticatedUser, authorizeRole("super"), setSmsEmailSettings)
  .get(isAuthenticatedUser, authorizeRole("super"), getEmailSmsSettings); // ADMIN ROUTE

module.exports = router;
