const mongoose = require("mongoose");
const validator = require("validator");

const teacherSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
    },
    teacherId: {
      type: String,
      unique: true,
    },
    employeeRole: {
      type: String,
    },
    personalInfo: {
      fullName: {
        type: String,
        required: true,
      },
      fatherName: {
        type: String,
      },
      gender: {
        type: String,
      },
      dob: {
        type: Date,
      },
      aadharId: {
        type: Number,
        required:true,
      },
      age: {
        type: Number,
      },

      religion: {
        type: String,
      },
      caste: {
        type: String,
      },
      bloodGroup: {
        type: String,
      },
      mobile: {
        type: Number,
      },
      email: {
        type: String,
      },
    },

    documentInfo: {
      aadharImage: {
        type: String,
        required:true,
      },
    },

    educationInfo: {
      qualification: {
        type: String,
      },
      institution: {
        type: String,
      },
      languageKnown: [],
      specialSkill: {
        type: String,
      },
    },

    experienceInfo: {
      experiencePeriod: {
        type: String,
      },
      organization: {
        type: String,
      },
      designation: {
        type: String,
      },
      personalAchievements: {
        type: String,
      },
    },

    paymentInfo: {
      joinDate: {
        type: Date,
      },
      perMonthSalary: {
        type: Number,
      },
    },

    addressInfo: {
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      city: {
        type: String,
      },
      pinCode: {
        type: Number,
      },
      state: {
        type: String,
      },
    },
    isActive: {
      type: Boolean,
      default: false,
    },

    // Admin who created Student
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Admin",
      // required:true,
    },
    // Information about updates made by admins
    updateBy: [
      {
        adminName: {
          type: String,
        },
        adminId: {
          type: String,
        },
        updateTime: {
          type: Date, // Use Date type to store the time of the update
          default: Date.now, // Automatically set to the current date/time
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
