const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Fee = require("../models/feeModel");

exports.updateFeeStructures = catchAsyncErrors(async (req, res) => {
  const {
  
    admissionFee,
    tuitionFee,
    examFee,
    // busFee,
    // hostelFee,
    lateFee,
    libraryFee,
  } = req.body.fees;


const {className} = req.body;

  const { userName, _id } = req.user;

  try {
    // Validate required fields
    if (!className) {
      return res.status(400).json({
        success: false,
        message: "Class name is required",
      });
    }

    if (
      admissionFee == null ||
      tuitionFee == null ||
      examFee == null ||
      // busFee == null ||
      // hostelFee == null ||
      lateFee == null ||
      libraryFee == null
    ) {
      return res.status(400).json({
        success: false,
        message: "All fee fields are required",
      });
    }

    // Find existing fee structure
    const feeStructure = await Fee.findOne(); // Assuming a single fee structure exists

    if (!feeStructure) {
      // If no fee structure exists, create a new one
      const newFeeStructure = await Fee.create({
        classWise: [
          {
            className,
            admissionFee,
            tuitionFee,
            examFee,
            // busFee,
            // hostelFee,
            lateFee,
            libraryFee,
          },
        ],
        updatedBy: [
          {
            adminId: _id,
            adminName: userName,
            updateTime: new Date(),
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Fee structure created successfully",
        feeStructure: newFeeStructure,
      });
    }

    // Check if class exists in classWise array
    const classIndex = feeStructure.classWise.findIndex(
      (cls) => cls.className === className
    );

    if (classIndex > -1) {
      // Update existing class fees
      const updatedClass = {
        className,
        admissionFee,
        tuitionFee,
        examFee,
        // busFee,
        // hostelFee,
        lateFee,
        libraryFee,
      };
      feeStructure.classWise[classIndex] = updatedClass;
    } else {
      // Add new class fees
      feeStructure.classWise.push({
        className,
        admissionFee,
        tuitionFee,
        examFee,
        // busFee,
        // hostelFee,
        lateFee,
        libraryFee,
      });
    }

    // Add update log
    feeStructure.updatedBy.push({
      adminId: _id,
      adminName: userName,
      updateTime: new Date(),
    });

    // Save the updated fee structure
    const updatedFee = await feeStructure.save();

    res.status(200).json({
      success: true,
      message: classIndex > -1
        ? `${className} Class fee structure updated successfully`
        : `${className} Class fee structure added successfully`,
      
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});




exports.setAdmissionExamFee = catchAsyncErrors(async (req, res) => {

  
    const {admissionFeeMonth,examFeeMonth,libraryFeeMonth} = req.body;

  try {

    const fee = await Fee.findOneAndUpdate({monthSet:{admissionFeeMonth,examFeeMonth,libraryFeeMonth}})


    if(fee){
        return res.status(200).json({
            success:true,
            message:"Month updated successfully!"
        })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


exports.getFeeStructure = catchAsyncErrors(async (req, res) => {
  try {
    const fees = await Fee.findOne().lean(); // Optimize query with .lean()

    if (!fees) {
      return res.status(200).json({
        success: false,
        message: "Fee structure not found",
       
      });
    }

    return res.status(200).json({
      success: true,
      fees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Include error details
    });
  }
});


