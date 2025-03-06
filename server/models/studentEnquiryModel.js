const mongoose = require("mongoose");

const studentEnquirySchema = mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender:{
      type:String,
      required:true,
    },
    className: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    createdBy: {
      adminId: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
      },
      adminName: {
        type: String,
    
      },
    },
    isViewd:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("StudentEnquiry", studentEnquirySchema);
