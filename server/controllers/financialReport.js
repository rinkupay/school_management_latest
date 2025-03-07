const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentModel");
const StudentPayment = require("../models/paymentModel");
const Employee = require("../models/teacherModel");
const EmployeePayment = require("../models/teacherPaymentModel");

exports.getFinancialReportForAll = catchAsyncErrors(async (req, res) => {
  const { currentMonth } = req.params;
  const { startDate, endDate } = req.query;
  try {
    let studentsPayments = [];

    if (startDate && endDate) {
      // Date range filter
      const start = new Date(startDate);

      // Ensure the end date includes the last moment of the day
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Set the time to the last moment of the day

      payments = await Payment.find({
        date: { $gte: start, $lte: end },
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
