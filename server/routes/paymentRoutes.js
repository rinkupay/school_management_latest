const express = require("express");
const router = express.Router();
const {isAuthenticatedUser, authorizeRole} = require("../middleware/authUser")

const { getAllTransaction,getStudentTransactions, getTotalAmountForMonthOrDateRange, deleteTransaction, getSingleTransaction, duePaymentReportForAll, saveStudentFeesForAcademics, collectFees, getSingleStudentFeeMemo, getSingleTransactionForRollBack, activateStudent,  } = require("../controllers/paymentControllers");


router.route("/generate-fees-memo/:id").get(isAuthenticatedUser,authorizeRole("admin","super"),saveStudentFeesForAcademics,activateStudent)  // ADMIN ROUTE
router.route("/collect-fees/:id").post(isAuthenticatedUser,authorizeRole("admin","super"),collectFees)  // ADMIN ROUTE
router.route("/transaction/:id").get(isAuthenticatedUser,authorizeRole("admin","super"),getStudentTransactions);
router.route("/student-transaction/:id").get(isAuthenticatedUser,authorizeRole("admin","super"),getSingleStudentFeeMemo); // GET ALL MONTHLY FEES MEMO
router.route("/student-recept/:id").get(isAuthenticatedUser,authorizeRole("admin","super"),getSingleTransaction);
router.route("/transactions").get(isAuthenticatedUser,authorizeRole("admin","super"),getAllTransaction)    // ADMIN ROUTE
router.route("/roll-back-payment/:id").patch(isAuthenticatedUser,authorizeRole("admin","super"),deleteTransaction).get(isAuthenticatedUser,authorizeRole("admin","super"),getSingleTransactionForRollBack);





router.route("/total-amount/:currentMonth").get(
    isAuthenticatedUser,
    authorizeRole("admin", "super"),
    getTotalAmountForMonthOrDateRange
  );
  


router.route("/due-reports").get(isAuthenticatedUser,authorizeRole("admin","super"),duePaymentReportForAll);


module.exports = router