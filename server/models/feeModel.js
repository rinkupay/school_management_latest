const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    classWise: [
      {
        className: {
          type: String, // Class name or identifier (e.g., "Class 1", "Class 2")
          required: true, // Ensure each entry has a class name
        },
        admissionFee: {
          type: Number,
          min: 0, // Ensure the fee is not negative
          default: 0,
        },
        tuitionFee: {
          type: Number,
          min: 0,
          default: 0,
        },
        examFee: {
          type: Number,
          min: 0,
          default: 0,
        },
       
        lateFee: {
          type: Number,
          min: 0,
          default: 0,
        },
        libraryFee: {
          type: Number,
          min: 0,
          default: 0,
        },
      },
    ],
    monthSet: {
      admissionFeeMonth: {
        type: [String],
        enum: [
          "Jan", "Feb", "Mar", "Apr",
          "May", "Jun", "Jul", "Aug",
          "Sep", "Oct", "Nov", "Dec",
        ],
        default: [], // Default to an empty array
      },
      examFeeMonth: {
        type: [String],
        enum: [
          "Jan", "Feb", "Mar", "Apr",
          "May", "Jun", "Jul", "Aug",
          "Sep", "Oct", "Nov", "Dec",
        ],
        default: [],
      },

      libraryFeeMonth: {
        type: [String],
        enum: [
          "Jan", "Feb", "Mar", "Apr",
          "May", "Jun", "Jul", "Aug",
          "Sep", "Oct", "Nov", "Dec",
        ],
        default: [],
      },
    },
    updatedBy: [
      {
        adminId: {
          type: mongoose.Schema.ObjectId,
          ref: "Admin",
          required: true,
        },
        adminName: {
          type: String,
          required: true,
        },
        updateTime: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

module.exports = mongoose.model("Fee", feeSchema);
