const express = require("express");
const router = express.Router();
const {isAuthenticatedUser, authorizeRole} = require("../middleware/authUser")

const {duePayment, initiatePayment, getAllTransaction, getPaymentHistory, getSingleTransaction, getTotalTeacherTransactionAmount} = require("../controllers/teacherPaymentController")


router.route("/due-pay/:id").get(isAuthenticatedUser,authorizeRole("admin","super"),duePayment)
router.route("/teacher-pay/:id").post(isAuthenticatedUser,authorizeRole("admin","super"),initiatePayment);
router.route("/teacher-pay-his/:id").get(isAuthenticatedUser,authorizeRole("admin","super"),getAllTransaction); //GET SINGLE TEACHERR PAYMENTs
router.route("/teachers-pay-history").get(isAuthenticatedUser,authorizeRole("admin","super"),getPaymentHistory); // GET ALL TRANSACTIONS
router.route("/teacher-payment/:id").get(isAuthenticatedUser,authorizeRole("admin","super"),getSingleTransaction);// GET SINGLE TRANSACTION


router.route("/teacher-amount").get(isAuthenticatedUser,authorizeRole("admin","super"),getTotalTeacherTransactionAmount);// GET TOTAL AMOUNT TRANSACTION


 
module.exports = router;