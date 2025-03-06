const Payment = require("../models/paymentModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentModel");
const FeeStructure = require("../models/feeModel");
const TeacherPayment = require("../models/teacherPaymentModel");

// SET STUDENTS MONTHLY FEES MEMO
exports.saveStudentFeesForAcademics = async (req, res , next) => {
  const adminId = req.user._id;
  const adminName = req.user.userName;
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student not found",
      });
    }
    const feeStructure = await FeeStructure.findOne();
    if (!feeStructure) {
      console.log("Fee structure not found.");
      return { success: false, message: "Fee structure not found." };
    }



   

    const studentName = student.personalInfo.fullName;
    const std = student.academicInfo.std;
    const rollNo = student.academicInfo.rollNo;
    const tutionFee = student.academicInfo.tutionFee;
    const admissionFee = student.academicInfo.admissionFee; // Only in Mar, Aug, and Feb
    const busFee = student.academicInfo.busFee;
    const hostelFee = student.academicInfo.hostelFee;
    const lateFee = 0; // By default Late fee
   
    let examFee = 0;
    const baseTotalAmount = tutionFee + busFee + hostelFee + lateFee; // Excludes admission & exam fee

    // Find Class wise fee structure and get exam fee
    const classFee = feeStructure.classWise.find(
      (fee) => fee.className === std
    );
    if (classFee) {
      examFee = classFee.examFee;
    }

    // Validate required fields
    // if (!id || !tuitionFee || !busFee || !hostelFee) {
    //   return res.status(400).json({ message: "All fields are required." });
    // }

    // Array of month names in correct order
    const months = [
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
    ];

    // Months where admission fee is applicable
    const admissionFeeMonths = feeStructure.monthSet.admissionFeeMonth;

    // Months where exam fee is applicable
    const examFeeMonths = feeStructure.monthSet.examFeeMonth;

    // Loop through March 2025 to February 2026
    const feeEntries = [];
    for (let i = 0; i < 12; i++) {
      const year = i < 10 ? 2025 : 2026; // First 10 months in 2025, last 2 in 2026
      const monthIndex = (i + 2) % 12; // Adjust index for JavaScript Date object

      const fromDate = new Date(year, monthIndex, 1); // 1st day of the month
      const toDate = new Date(year, monthIndex + 1, 0); // Last day of the month
      const monthName = months[i]; // Get month name

      // Assign admission fee & exam fee only in specified months
      const finalAdmissionFee = admissionFeeMonths.includes(monthName)
        ? admissionFee
        : 0;
      const finalExamFee = examFeeMonths.includes(monthName) ? examFee : 0;
      const totalAmount = baseTotalAmount + finalAdmissionFee + finalExamFee;

      const newFee = new Payment({
        studentId: id,
        studentName,
        std,
        rollNo,
        tutionFee,
        admissionFee: finalAdmissionFee, // Admission fee only in Mar, Aug, and Feb
        busFee,
        hostelFee,
        lateFee,
        examFee: finalExamFee, // Exam fee only in Jun, Sep, and Feb
        totalAmount,
        status: "pending",
        fromDate,
        toDate,
        month: monthName, // Correct month name

        createdBy: {
          adminId,
          adminName,
        },
      });

      feeEntries.push(newFee);
    }

    // student.isActive = true; // Activate student

    // Save all fee records in the database
   
    await Payment.insertMany(feeEntries);
    // await student.save();
    next();

    res
      .status(201)
      .json({
        message: "Fees saved successfully from March 2025 to February 2026.",
        fees: feeEntries,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while saving fees.", error });    
  }
};

// AFTER GENERATING  FEE MEMO ACTIVATE STUDENT

exports.activateStudent = catchAsyncErrors(async(req,res) => {
  const {id} = req.params;

  try {

    const student = await Student.findByIdAndUpdate(id,{isActive:true},{new:true})
    res.status(200).json({
      success:true,
      message:"Student activated successfully",
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message,
    })
    
  }
})










// COLLECT STUDENT FEES
exports.collectFees = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const studentId = id;
  const { months, paymentMode, transactionId } = req.body; // Expect studentId and months array
  const adminId = req.user._id;
  const adminName = req.user.userName;

  // Validate input
  if (!studentId || !Array.isArray(months) || months.length === 0) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Student ID and valid months array are required.",
      });
  }

  // Update all payments matching the studentId and months
  const updatedPayments = await Payment.updateMany(
    { studentId, month: { $in: months }, status: "pending" }, // Only update pending payments
    {
      $set: {
        status: "paid",
        date: Date.now(),
        paymentMode,
        transactionId,
        receivedBy: { adminId, adminName, date: Date.now() },
      },
    }
  );

  // If no payments were updated
  if (updatedPayments.modifiedCount === 0) {
    return res
      .status(404)
      .json({
        success: false,
        message: "No pending payments found for the selected months.",
      });
  }

  res.status(200).json({
    success: true,
    message: `Successfully collected fees for ${updatedPayments.modifiedCount} months.`,
    updatedPayments,
  });
});



// GET ALL MONTHLY FEES MEMO
exports.getSingleStudentFeeMemo = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  try {
    const payments = await Payment.find({ studentId: id });
    if (!payments) {
      return res.status(400).json({
        success: false,
        message: "No Memo found",
      });
    }

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});




// GET ALL TRANSACTIONS

exports.getAllTransaction = catchAsyncErrors(async (req, res, next) => {
  const { status  } = req.query;
  
console.log(req.query)
  const transactions = await Payment.find({ status });

  const transactionCount = await Payment.countDocuments({ status });

  res.status(200).json({
    success: true,
    transactionCount,
    transactions,
  });
});

















// <<<<<============= STUDENT TRANSACTIONS ================>>>>>>>>>>>>>
exports.getStudentTransactions = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.query;

  // Build query condition
  const query = { studentId: id };
  if (status === "paid") {
    query.status = "paid"; // Only filter by status if it's "paid"
  }

  // Fetch transactions
  const transactions = await Payment.find(query);
  const transactionCount = await Payment.countDocuments(query);

  res.status(200).json({
    success: true,
    transactionCount,
    transactions,
  });
});









// STATISTIC FUNCTION FOR DASHBOARD
exports.getTotalAmountForMonthOrDateRange = catchAsyncErrors(
  async (req, res, next) => {

    
    try {


      
      


      const { currentMonth } = req.params; 
      const { startDate, endDate } = req.query;

      

      let payments = [];

      if (startDate && endDate) {
        // Date range filter
        const start = new Date(startDate);
        
        // Ensure the end date includes the last moment of the day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);  // Set the time to the last moment of the day







        payments = await Payment.find({
          date: { $gte: start, $lte: end },
        });
      } else if (startDate && !endDate) {
        // Single day filter
        const specificDate = new Date(startDate);

    





        payments = await Payment.find({
          date: {
            $gte: new Date(specificDate.setHours(0, 0, 0, 0)), // Start of the day
            $lt: new Date(specificDate.setHours(23, 59, 59, 999)), // End of the day
          },
        });
      } else if (currentMonth) {
        // Validate and extract year/month
        const [year, month] = currentMonth.split("-").map(Number);

        if (!year || !month || month < 1 || month > 12) {
          return res.status(400).json({
            success: false,
            message: "Invalid currentMonth format. Expected format: YYYY-MM",
          });
        }

        // Construct start and end dates for the month
        const startOfMonth = new Date(Date.UTC(year, month - 1, 1)); // First day of the month
        const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)); // Last day of the month

        payments = await Payment.find({
          date: { $gte: startOfMonth, $lte: endOfMonth },
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Either startDate, endDate, or currentMonth is required.",
        });
      }

      // Calculate the total amount paid
      const totalAmount = payments.reduce(
        (acc, payment) => acc + payment.totalAmount,
        0
      );

      // Count the number of payments
      const paymentsCount = payments.length;

      res.status(200).json({
        success: true,
        paymentsCount,
        totalAmount,
        payments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error calculating total amount",
        error: error.message,
      });
    }
  }
);



// GET A SINGLE TRANSACTION
exports.getSingleTransaction = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const transaction = await Payment.findById(id);

  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }

  res.status(200).json({
    success: true,
    transaction,
  });
});





// GET A SINGLE TRANSACTION
exports.getSingleTransactionForRollBack = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
 

  const transaction = await Payment.findById(id);

  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }

  res.status(200).json({
    success: true,
    transaction,
  });
});








// DELETE A TRANSACTION ROLL BACK
exports.deleteTransaction = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;


  const transaction = await Payment.findByIdAndUpdate(id,{status:"pending"},{new:true});

  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Transaction rolled back successfully",
  });

});



// GET DUE PAYMENT OF STUDENTS REPORTS
// exports.duePaymentReportForAll = catchAsyncErrors(async (req, res) => {
//   const additionalFee = 0;

//   try {
//     const { std, section } = req.query; // Get class & section from query params
//     const currentDate = new Date();
//     const currentMonthStr = `${currentDate.getFullYear()}-${(
//       "0" +
//       (currentDate.getMonth() + 1)
//     ).slice(-2)}`;

//     const validEndDate = process.env.VALID_END_DATE;
//     const startDate = process.env.VALID_START_DATE;

//     // Find students based on class and section
//     const query = {};
//     if (std) query["academicInfo.std"] = std;
//     if (section) query["academicInfo.section"] = section;

//     const students = await Student.find(query); // Fetch filtered students

//     if (!students.length) {
//       return res
//         .status(404)
//         .json({ message: "No students found for this class and section" });
//     }

//     let allDues = [];

//     for (const student of students) {
//       const studentId = student._id;
//       const studentName = student.personalInfo.fullName;
//       const studentClass = student.academicInfo.std;
//       const studentSection = student.academicInfo.section;

//       const monthlyFee = student.academicInfo.tutionFee || 0;
//       const busFee = student.academicInfo.busFee || 0;
//       const hostelFee = student.academicInfo.hostelFee || 0;
//       const totalMonthlyFee = monthlyFee + busFee + hostelFee + additionalFee;

//       const payments = await Payment.find({ studentId }).sort("dueDate");

//       let totalDue = 0;
//       let monthsDue = [];
//       let coveredMonths = new Map();
//       let month = new Date(startDate);

//       payments.forEach((payment) => {
//         coveredMonths.set(
//           payment.month,
//           (coveredMonths.get(payment.month) || 0) + payment.amount
//         );
//       });

//       const validEndDateMonthStr = `${new Date(validEndDate).getFullYear()}-${(
//         "0" +
//         (new Date(validEndDate).getMonth() + 1)
//       ).slice(-2)}`;

//       if (
//         coveredMonths.has(validEndDateMonthStr) &&
//         coveredMonths.get(validEndDateMonthStr) >= totalMonthlyFee
//       ) {
//         allDues.push({
//           studentId,
//           studentName,
//           studentClass,
//           studentSection,
//           totalDue: 0,
//           monthsDue: [],
//         });
//         continue;
//       }

//       while (
//         `${month.getFullYear()}-${("0" + (month.getMonth() + 1)).slice(-2)}` <=
//         currentMonthStr
//       ) {
//         const monthStr = `${month.getFullYear()}-${(
//           "0" +
//           (month.getMonth() + 1)
//         ).slice(-2)}`;

//         if (monthStr > validEndDateMonthStr) break;

//         if (coveredMonths.has(monthStr)) {
//           const paidAmount = coveredMonths.get(monthStr);
//           if (paidAmount < totalMonthlyFee) {
//             totalDue += totalMonthlyFee - paidAmount;
//             monthsDue.push({
//               month: monthStr,
//               due: totalMonthlyFee - paidAmount,
//             });
//           }
//         } else {
//           totalDue += totalMonthlyFee;
//           monthsDue.push({ month: monthStr, due: totalMonthlyFee });
//         }
//         month.setMonth(month.getMonth() + 1);
//       }

//       allDues.push({
//         studentId,
//         studentName,
//         studentClass,
//         studentSection,
//         totalDue,
//         monthsDue,
//       });
//     }

//     res.json(allDues);
//   } catch (error) {
//     res.status(500).send("Error calculating due fees for all students");
//   }
// });

exports.duePaymentReportForAll = catchAsyncErrors(async (req, res) => {
  const additionalFee = 0;
  const { std, section } = req.query;


  try {
    // Get the current month in short format (e.g., "Mar")
    const currentMonth = new Date().toLocaleString('default', { month: 'short' });

    // Define the school session start month (March)
    const sessionStartMonth = 'Mar';

    // List of all months in the academic year starting from March
    const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

    // Find the index of the current month in the session months list
    const currentMonthIndex = months.indexOf(currentMonth);

    // Build the query to filter students by std and section if provided
    const query = { isActive: true };

    // Filter by std if provided
    if (std) query["academicInfo.std"] = { $regex: new RegExp(`^${std}$`, 'i') };

    // Filter by section if provided
    if (section) query["academicInfo.section"] = section;

    // Retrieve all active students based on the filters
    const students = await Student.find(query);

    // If no students are found, return an empty array
    if (!students || students.length === 0) {
      return res.json({ allDues: [] }); // Return empty array
    }

    // Store the result of dues for all students
    const allDues = [];

    // Iterate over each student to calculate their dues
    for (const student of students) {
      const studentId = student._id;
      const studentName = student.personalInfo.fullName;
      const studentClass = student.academicInfo.std;
      const studentSection = student.academicInfo.section;
      
      // Retrieve payments made by the student till the current month in the session
      const payments = await Payment.find({
        studentId,
        month: { $in: months.slice(0, currentMonthIndex + 1) }, // Payments till the current month
        status: { $ne: 'paid' } // Filter out any paid payments
      });

      let totalDueAmount = 0;
      let dueMonths = [];

      // Sum up the due amounts for each relevant payment and collect the due months
      payments.forEach(payment => {
        totalDueAmount += payment.totalAmount; // You can replace totalAmount with payableAmount if needed
        dueMonths.push(payment.month);
      });

      // Push the result for each student to the allDues array
      allDues.push({
        studentId,
        studentName,
        studentClass,
        studentSection,
        dueMonths,
        totalDueAmount,
      });
    }

    // Send the response with the calculated dues
    res.json({ allDues });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error calculating due fees for all students");
  }
});



