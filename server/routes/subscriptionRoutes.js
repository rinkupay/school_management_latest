const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRole,
} = require("../middleware/authUser");
const {
  setSubscriptionYear,
  getSubscriptionYear,
} = require("../controllers/subscriptionControler");

router
  .route("/subscription")
  .post(isAuthenticatedUser, authorizeRole("super"), setSubscriptionYear)
  .get(isAuthenticatedUser, authorizeRole("super"), getSubscriptionYear);

module.exports = router;
