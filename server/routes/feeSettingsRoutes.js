const express = require("express");
const router = express.Router();

const {
  isAuthenticatedUser,
  authorizeRole,
} = require("../middleware/authUser");
const {
  updateFeeStructures,
  getFeeStructure,
  setAdmissionExamFee,
} = require("../controllers/feeSettingsControllers");

router
  .route("/feeSettings")
  .post(isAuthenticatedUser, authorizeRole("super"), updateFeeStructures); // ADMIN ROUTE
router
  .route("/getFeeStructures")
  .get(isAuthenticatedUser, authorizeRole("admin", "super"), getFeeStructure); // ADMIN ROUTE
router
  .route("/exam&admission&Month")
  .post(isAuthenticatedUser, authorizeRole("super"), setAdmissionExamFee); // ADMIN ROUTE

module.exports = router;
