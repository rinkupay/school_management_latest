const Payment = require("../models/teacherPaymentModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Teacher = require("../models/teacherModel");
const SchoolDetails = require ("../models/schoolDetailModel");




// <<<<<<<<<============= TEACHER  CALCULATE DUES ================>>>>>>>>>>>>
exports.duePayment = catchAsyncErrors(async (req, res) => {
    const {id} = req.params;
    const currentDate = new  Date();
    const currentMonthStr = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}`





  try {


    const teacher = await Teacher.findById(id)


    if(teacher.isActive === false){
      return res.status(500).json({
        success:false,
        message:"No dues "
      })
    }

    const schoolDetail = await SchoolDetails.findOne()

    console.log(schoolDetail)
   

    if(!schoolDetail){
      return res.status(200).json({
        success:false,
        message:"School session is missing!"
      })
    }


    // const validEndDate = process.env.VALID_END_DATE;
    // const startDate =  process.env.VALID_START_DATE ;
    const validEndDate = schoolDetail.sessionDetails.endDate;
    const startDate =   teacher.paymentInfo.joinDate;
 


       // Ensure valid environment variables
   if (!validEndDate || !startDate) {
    return res.status(500).json({
        success: false,
        message: "Server configuration error."
    });
}


    if(!teacher) {
        return res.status(400).json({
            success:false,
            message:"Teacher not found"
        })
    }

    const payingAmount = teacher.paymentInfo.perMonthSalary;

    const totalMonthlyAmount = payingAmount;

    // Fetch Previous Payment
    const payments = await Payment.find({teacherId:id}).sort('dueDate')

    let totalDue = 0;
    let monthsDue = [];
    let coveredMonths = new Map();
    let month = new Date(startDate);

    payments.forEach(payment => {
        coveredMonths.set(payment.month),(coveredMonths.get(payment.month) || 0)
    })

      // Check if the validEndDate month is fully covered
      const validEndDateMonthStr = `${new Date(validEndDate).getFullYear()}-${('0' + (new Date(validEndDate).getMonth() + 1)).slice(-2)}`;
      if (coveredMonths.has(validEndDateMonthStr) && coveredMonths.get(validEndDateMonthStr) >= totalMonthlyAmount) {
        return res.json({ totalDue: 0, monthsDue: [] });
      }

      
     // Ensure the current month is considered
     while (`${month.getFullYear()}-${('0' + (month.getMonth() + 1)).slice(-2)}` <= currentMonthStr) {
        const monthStr = `${month.getFullYear()}-${('0' + (month.getMonth() + 1)).slice(-2)}`;
        
        if (monthStr > validEndDateMonthStr) {
          break; // Stop calculating if past the valid end date
        }
        
        if (coveredMonths.has(monthStr)) {
          const paidAmount = coveredMonths.get(monthStr);
          if (paidAmount < totalMonthlyAmount) {
            totalDue += (totalMonthlyAmount - paidAmount);
            monthsDue.push({ month: monthStr, due: (totalMonthlyAmount - paidAmount) });
          }
        } else {
          totalDue += totalMonthlyAmount;
          monthsDue.push({ month: monthStr, due: totalMonthlyAmount });
        }
        month.setMonth(month.getMonth() + 1);
      }

 

   return res.status(200).json({
      success: true,
      totalDue,monthsDue,
    });
  } catch (err) {
    console.log(err);
   return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});





// <<<<<<<<<<<<============== INITIATE PAYMENT ================>>>>>>>>>

exports.initiatePayment = catchAsyncErrors(async(req,res)=>{
    const {id} = req.params;
    const {amount,bonusAmount,totalAmount,dueDate} = req.body;

    const dueDateObj = new Date(dueDate);


    try {
        const teacher = await Teacher.findById(id);

        if(!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found",
              });
        }

        // const totalMonthlyFee = amount;
        const totalMonthlyFee = teacher.paymentInfo.perMonthSalary + bonusAmount;

        let remainingAmount = totalAmount;
        let currentMonth = new Date(dueDateObj);

        const payments = [];

        // Process full months
        while (remainingAmount >= totalMonthlyFee){
            const paymentMonthStr = `${currentMonth.getFullYear()}-${("0" + (currentMonth.getMonth() + 1)).slice(-2)}`
            
            const payment = new Payment({
                teacherId:id,
                teacherName:teacher.personalInfo.fullName,
                paidAmount:totalMonthlyFee,
                bonusAmount:bonusAmount,
                totalAmount:totalMonthlyFee,
                month:paymentMonthStr,
                dueDate: new Date(currentMonth),
                status:"paid",
                paidBy:{
                    adminId:req.user._id,
                    adminName:req.user.userName,
                }


            })

            await payment.save();
            payments.push(payment);

            remainingAmount -= totalMonthlyFee
            currentMonth.setMonth(currentMonth.getMonth() + 1);
        }


        res.status(201).json({
            success: true,
            message: "Payment successful",
            payments,
          });


        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "Payment failed",
            
          });
    }
})








// <<<<<<<<<============= GET ALl TRANSACTION OF A TEACHER ================>>>>>>>>>>>>

exports.getAllTransaction = catchAsyncErrors(async(req,res)=>{
  const {id} = req.params;

  try {
    const payments = await Payment.find({teacherId:id});
    const paymentCounts = await Payment.countDocuments({teacherId:id});


    if(!payments){
      return res.status(200).json({
        success:true,
        message:"No Transaction yet"
      })
    }

    res.status(200).json({
      success:true,
      payments,
      paymentCounts
    })



  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success:false,
      message:error.message
    })
  }
})



// <<<<<<<<<============= GET ALl TRANSACTIONS  ================>>>>>>>>>>>>

exports.getPaymentHistory = catchAsyncErrors(async(req,res)=>{

  try {
    const payments = await Payment.find();
    if(!payments){
    return res.status(500).json({
      success:false,
      message:"No payment yet!"
    })

 
    }
    return res.status(200).json({
      success:true,
      payments
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
})



// <<<<<<<<<============= GET SINGLE TRANSACTIONS  ================>>>>>>>>>>>>

exports.getSingleTransaction = catchAsyncErrors(async(req,res)=>{

  const {id} = req.params;


  try {

    const payments = await Payment.findById(id);
    if(!payments){
    return res.status(500).json({
      success:true,
      message:"Payment not found"
    })

    }

    return res.status(200).json({
      success:true,
      payments
    })
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
})




// <<<<<<<<<============= GET TOTAL TRANSACTION AMOUNT FOR STATISTC  ================>>>>>>>>>>>>
// exports.getTotalTeacherTransactionAmount = catchAsyncErrors(async (req, res) => {
//   const { currentMonth } = req.params; 
//   const { startDate, endDate } = req.query;

//   try {
//     let filter = {}; // Filter object to build query

//     if (startDate && endDate) {
//       // Date range filter
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       end.setHours(23, 59, 59, 999); // Ensure we include the full end date
      
//       filter.date = { $gte: start, $lte: end };
//     } else if (startDate && !endDate) {
//       // Single day filter
//       const specificDate = new Date(startDate);
//       filter.date = {
//         $gte: new Date(specificDate.setHours(0, 0, 0, 0)), // Start of the day
//         $lt: new Date(specificDate.setHours(23, 59, 59, 999)), // End of the day
//       };
//     } else if (currentMonth) {
//       // Validate and extract year/month
//       const [year, month] = currentMonth.split("-").map(Number);

//       if (!year || !month || month < 1 || month > 12) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid currentMonth format. Expected format: YYYY-MM",
//         });
//       }

//       // Construct start and end dates for the month
//       const startOfMonth = new Date(Date.UTC(year, month - 1, 1)); // First day of the month
//       const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)); // Last day of the month

//       filter.date = { $gte: startOfMonth, $lte: endOfMonth };
//     }

//     // Fetch payments based on the filter
//     const payments = await Payment.find(filter);

//     if (!payments || payments.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No payments found for the given criteria",
//       });
//     }

//     // Calculate the total transaction amount
//     const totalAmount = payments.reduce(
//       (acc, payment) => acc + payment.totalAmount, 
//       0
//     );

//     // Return the response with total amount and payment details
//     return res.status(200).json({
//       success: true,
//       totalAmount,
//       payments,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error calculating total transaction amount",
//       error: error.message,
//     });
//   }
// });





// TEACHER TRANSACTION AMOUNT FOR STATISTIC
exports.getTotalTeacherTransactionAmount = catchAsyncErrors(async (req, res) => {
  const { currentMonth, startDate, endDate } = req.query;

  try {
    let totalAmount = 0;
    let filter = {}; // Query filter

    if (startDate && endDate) {
      // Date range filter
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include the full end date

      filter.date = { $gte: start, $lte: end };
    } else if (startDate) {
      // Single day filter
      const specificDate = new Date(startDate);
      filter.date = {
        $gte: new Date(specificDate.setHours(0, 0, 0, 0)), // Start of the day
        $lte: new Date(specificDate.setHours(23, 59, 59, 999)), // End of the day
      };
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

      filter.date = { $gte: startOfMonth, $lte: endOfMonth };
    }

    // Fetch payments based on the filter
    const payments = await Payment.find(filter);

    // Calculate payments count
    const paymentsCount = payments.length;

    // Calculate the total transaction amount
    totalAmount = payments.reduce((acc, payment) => acc + payment.totalAmount, 0);

    // Return the response with total amount and payment details
    return res.status(200).json({
      success: true,
      totalAmount,
      paymentsCount,
      message: paymentsCount ? "Payments retrieved successfully" : "No payments found",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error calculating total transaction amount",
      error: error.message,
    });
  }
});

