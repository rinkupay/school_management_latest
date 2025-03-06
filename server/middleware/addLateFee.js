const Payment = require("../models/paymentModel");
const FeeStructure = require("../models/feeModel");

const updateLateFeeOverDueFees = async () => {
  try {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.toLocaleString("default", { month: "short" }); // e.g., "Feb"

    // Only apply late fee after the 10th
    if (currentDay <= 10) {
      console.log("Late fee can only be applied after the 10th of the month.");
      return { success: false, message: "Late fee can only be applied after the 10th of the month." };
    }

    // Fetch fee structure
    const feeStructure = await FeeStructure.findOne();
    if (!feeStructure) {
      console.log("Fee structure not found.");
      return { success: false, message: "Fee structure not found." };
    }

    // Fetch overdue payments for the current month
    const overduePayments = await Payment.find({ month: currentMonth, status: "pending" });
    if (overduePayments.length === 0) {
      console.log("No overdue payments found for this month.");
      return { success: true, message: "No overdue payments found for this month." };
    }

    // console.log("Overdue Payments:", overduePayments.map((p) => p.std)); // Log student details

    // Update payments by adding the correct late fee from FeeStructure
    const updatedPayments = await Promise.all(
      overduePayments.map(async (payment) => {
        // Find the late fee for the student's class
        const classFee = feeStructure.classWise.find((fee) => fee.className === payment.std);

        if (!classFee) {
          console.log(`No fee structure found for class ${payment.std}`);
          return payment;
        }

        const lateFeeAmount = classFee.lateFee || 0; // Get late fee for the class

        // Ensure late fee is not added multiple times
        if (payment.lateFee >= lateFeeAmount) return payment;

        payment.lateFee += lateFeeAmount;
        payment.totalAmount += lateFeeAmount;
        return payment.save();
      })
    );

    return { 
      success: true, 
      message: `Late fee applied to ${updatedPayments.length} overdue payments.`,
      updatedPayments 
    };

  } catch (error) {
    console.error("Error updating late fees:", error);
    return { success: false, message: "Server error", error };
  }
};

module.exports = { updateLateFeeOverDueFees };
