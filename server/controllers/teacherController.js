const Teacher = require("../models/teacherModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const { generateTeacherId } = require("../utils/generateTeacherId");

// REGISTER TEACHER
exports.registerTeacher = catchAsyncErrors(async (req, res) => {
  try {
    // const image = req.file ? req.file.path : null;
    const profileImage = req.files["profileImage"]
      ? req.files["profileImage"][0]
      : null;
    const image = req.files["image"] ? req.files["image"][0] : null;
    const teacherId = await generateTeacherId();

    const {
      fullName,
      fatherName,
      gender,
      dob,
      age,
      religion,
      caste,
      bloodGroup,
      mobile,
      email,
      qualification,
      institution,
      languageKnown,
      employeeRole,
      joinDate,
      perMonthSalary,
      experiencePeriod,
      organization,
      designation,
      personalAchievements,
      aadharId,

      address,
      city,
      state,
      pinCode,
    } = req.body;



    const teacher = await Teacher.create({
      profileImage: profileImage?.path,

      teacherId,
      employeeRole,

      personalInfo: {
        fullName,
        fatherName,
        gender,
        dob,
        aadharId,
        age,
        religion,
        caste,
        bloodGroup,
        mobile,
        email,
      },

      documentInfo: {
        aadharImage: image?.path,
      },
      educationInfo: {
        qualification,
        institution,
        languageKnown,
      },
      experienceInfo: {
        experiencePeriod,
        organization,
        designation,
        personalAchievements,
      },
      paymentInfo: {
        joinDate,
        perMonthSalary,
      },
      addressInfo: {
        address1: address,
        city,
        state,
        pinCode,
      },
    });
    teacher.createdBy = req.user._id;

    await teacher.save();

    res.status(201).json({
      success: true,
      message: "Employee added successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Update Teacher Profile Image

exports.updateTeacherProfilePicture = catchAsyncErrors(async (req, res) => {
  try {
    const id = req.params.id;
    const newImage = req.file ? req.file.path : null;

    const teacher = await Teacher.findById(id);

    const existingImage = teacher.profileImage;

    if (existingImage) {
      fs.unlink(existingImage, (err) => {
        if (err) {
          console.error("Error deleting existing image:", err);
        }
      });
    }

    teacher.profileImage = newImage;

    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Picture updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE TEACHER
// exports.updateTeacher = catchAsyncErrors(async (req, res) => {
//   const permanentAddress = JSON.parse(req.body.permanentAddress);
//   const personalInfo = JSON.parse(req.body.personalInfo);
//   const educationInfo = JSON.parse(req.body.educationInfo);
//   const acheivement = JSON.parse(req.body.acheivement);
//   const salary = JSON.parse(req.body.salary);

//   const teacher = await Teacher.findById(req.params.id);
//   if (!teacher) {
//     res.status(404).json({
//       success: false,
//       message: "Employee not found",
//     });
//   }

//   teacher.personalInfo = {
//     fullName: personalInfo.fullName,
//     fatherName: personalInfo.fatherName,
//     gender: personalInfo.gender,
//     dob: personalInfo.dob,
//     age: personalInfo.age,
//     religion: personalInfo.religion,
//     caste: personalInfo.caste,
//     bloodGroup: personalInfo.bloodGroup,
//     mobile: personalInfo.mobile,
//     email: personalInfo.email,
//     aadharId: personalInfo.aadharId || teacher.personalInfo.aadharId,
//   };

//   teacher.educationInfo = {
//     qualification: educationInfo.highestQualification,
//     institution: educationInfo.institution,
//     languageKnown: educationInfo.languageKnown,
//   };

//   teacher.experienceInfo = {
//     experiencePeriod: acheivement.experiencePeriod,
//     organization: acheivement.organization,
//     designation: acheivement.designation,
//     personalAchievements: acheivement.personalAchievements,
//   };

//   teacher.addressInfo = {
//     address1: permanentAddress.address,
//     city: permanentAddress.city,
//     state: permanentAddress.state,
//     pinCode: permanentAddress.pinCode,
//   };

//   teacher.paymentInfo = {
//     perMonthSalary: salary,
//   };

//   teacher.updateBy.push({
//     adminName: req.user.userName,
//     adminId: req.user._id,
//     updateTime: Date.now(), // Automatically sets the current date and time
//   });

//   await teacher.save();

//   res.status(201).json({
//     success: true,
//     message: "Employee updated successfully!",
//   });
// });



exports.updateTeacher = catchAsyncErrors(async (req, res) => {
  const permanentAddress = req.body.permanentAddress ? JSON.parse(req.body.permanentAddress) : {};
  const personalInfo = req.body.personalInfo ? JSON.parse(req.body.personalInfo) : {};
  const educationInfo = req.body.educationInfo ? JSON.parse(req.body.educationInfo) : {};
  const achievement = req.body.acheivement ? JSON.parse(req.body.acheivement) : {};
  const salary = req.body.salary ? JSON.parse(req.body.salary) : null;

  // Prepare update object
  const updateFields = {
    ...(personalInfo && {
      "personalInfo.fullName": personalInfo.fullName,
      "personalInfo.fatherName": personalInfo.fatherName,
      "personalInfo.gender": personalInfo.gender,
      "personalInfo.dob": personalInfo.dob,
      "personalInfo.age": personalInfo.age,
      "personalInfo.religion": personalInfo.religion,
      "personalInfo.caste": personalInfo.caste,
      "personalInfo.bloodGroup": personalInfo.bloodGroup,
      "personalInfo.mobile": personalInfo.mobile,
      "personalInfo.email": personalInfo.email,
      "personalInfo.aadharId": personalInfo.aadharId,
    }),

    ...(educationInfo && {
      "educationInfo.qualification": educationInfo.highestQualification,
      "educationInfo.institution": educationInfo.institution,
      "educationInfo.languageKnown": educationInfo.languageKnown,
    }),

    ...(achievement && {
      "experienceInfo.experiencePeriod": achievement.experiencePeriod,
      "experienceInfo.organization": achievement.organization,
      "experienceInfo.designation": achievement.designation,
      "experienceInfo.personalAchievements": achievement.personalAchievements,
    }),

    ...(permanentAddress && {
      "addressInfo.address1": permanentAddress.address,
      "addressInfo.city": permanentAddress.city,
      "addressInfo.state": permanentAddress.state,
      "addressInfo.pinCode": permanentAddress.pinCode,
    }),

    ...(salary !== null && {
      "paymentInfo.perMonthSalary": salary,
    }),

    $push: {
      updateBy: {
        adminName: req.user.userName,
        adminId: req.user._id,
        updateTime: Date.now(),
      },
    },
  };

  // Ensure we don't update with undefined values
  Object.keys(updateFields).forEach((key) => {
    if (updateFields[key] === undefined) {
      delete updateFields[key];
    }
  });

  const updatedTeacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedTeacher) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Employee updated successfully!",
    teacher: updatedTeacher,
  });
});



//  TEACHER DETAILS
exports.teacherDetails = catchAsyncErrors(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(201).json({
    success: true,
    teacher,
  });
});

// DELETE TEACHER
exports.deleteTeacher = catchAsyncErrors(async (req, res) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);
  if (!teacher) {
    res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
});

// ALL  TEACHERS
exports.allTeachers = catchAsyncErrors(async (req, res) => {
  const { gender, role } = req.query;

  const query = {};
  if (gender) query["personalInfo.gender"] = new RegExp(`^${gender}`, "i");
  if (role) query["employeeRole"] = role;

  const teachers = await Teacher.find(query);
  const teacherCounts = await Teacher.countDocuments(query);
  const maleTeacherCounts = await Teacher.countDocuments({
    "personalInfo.gender": "Male",
  });
  const femaleTeacherCounts = await Teacher.countDocuments({
    "personalInfo.gender": "Female",
  });

  if (!teachers) {
    res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(200).json({
    success: true,
    teachers,
    teacherCounts,
    maleTeacherCounts,
    femaleTeacherCounts,
  });
});

// UPDATE EMPLOYEE ACTIVATION
exports.updateTeacherStatus = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const teacher = await Teacher.findByIdAndUpdate(
    id,
    { isActive: status },
    { new: true }
  );
  if (!teacher) {
    res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(201).json({
    success: true,
    message: "Employee updated successfully!",
  });
});
