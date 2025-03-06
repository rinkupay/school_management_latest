const Student = require("../models/studentModel");
const Document = require("../models/studentDocumentsModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { generateStudentId } = require("../utils/generateStudentId");
const fs = require("fs").promises;

// Student Registration (ADMIN)
exports.registerStudent = catchAsyncErrors(async (req, res, next) => {
  // const {personalInfo,academicInfo,permanentAddress,temporaryAddress} = req.body;
  const personalInfo = JSON.parse(req.body.personalInfo);
  const academicInfo = JSON.parse(req.body.academicInfo);
  const permanentAddress = JSON.parse(req.body.permanentAddress);
  const temporaryAddress = JSON.parse(req.body.temporaryAddress);

  const studentId = await generateStudentId();

  const image = req.file ? req.file.path : null;

  const student = new Student({
    studentId: studentId,

    profileImage: image,

    personalInfo: {
      fullName: personalInfo.fullName,
      motherName: personalInfo.motherName,
      fatherName: personalInfo.fatherName,
      gardianName: personalInfo.gardianName,
      dob: personalInfo.dob,
      gender: personalInfo.gender,
      religion: personalInfo.religion,
      caste: personalInfo.caste,
      bloodGroup: personalInfo.bloodGroup,
      email: personalInfo.email,
      mobile: personalInfo.mobile,
    },
    academicInfo: {
      academicYear: academicInfo.academicYear,
      std: academicInfo.std,
      section: academicInfo.section,
      rollNo: academicInfo.rollNo,
      admissionFee: academicInfo.admissionFee,
      tutionFee: academicInfo.tutionFee,
      busFee: academicInfo.busFee,
      hostelFee: academicInfo.hostelFee,
      monthlyFee: academicInfo.monthlyFee,
    },

    permanentAddress: {
      address: permanentAddress.address,
      city: permanentAddress.city,
      state: permanentAddress.state,
      pinCode: permanentAddress.zip,
      phone: permanentAddress.phone,
    },

    correspondenceAddress: {
      address: temporaryAddress.address,
      city: temporaryAddress.city,
      state: temporaryAddress.state,
      pinCode: temporaryAddress.zip,
      phone: temporaryAddress.phone,
    },

    createdBy: req.user._id,
  });

  await student.save();

  res.status(201).json({
    success: true,
    message: "Student registered successfully",
    student,
  });
});



// // Utility function to handle file deletion
// const deleteOldFiles = (oldFiles, documents) => {
//   oldFiles.forEach(({ field, path, newFile }) => {
//     if (newFile && path !== newFile[0].path) {
//       // If a new file is uploaded and it is different from the old file, delete the old file
//       fs.unlink(path, (err) => {
//         if (err) {
//           console.error(`Failed to delete file ${path}`, err);
//         } else {
//           console.log(`Successfully deleted old file ${path}`);
//         }
//       });
//     }
//   });
// };

// // General function to upload or update documents
// const handleDocumentUpload = async (id, documents, existingDocument) => {
//   // Prepare document data
//   const documentData = {
//     studentId: id,
//     aadhar: documents.aadhar ? documents.aadhar[0].path : existingDocument?.aadhar,
//     tc: documents.tc ? documents.tc[0].path : existingDocument?.tc,
//     cc: documents.cc ? documents.cc[0].path : existingDocument?.cc,
//     rc: documents.rc ? documents.rc[0].path : existingDocument?.rc,
//   };

//   // If documents already exist, update them
//   if (existingDocument) {
//     // Prepare old file paths for deletion
//     const oldFiles = [
//       { field: 'aadhar', path: existingDocument.aadhar, newFile: documents.aadhar },
//       { field: 'tc', path: existingDocument.tc, newFile: documents.tc },
//       { field: 'cc', path: existingDocument.cc, newFile: documents.cc },
//       { field: 'rc', path: existingDocument.rc, newFile: documents.rc },
//     ];

//     // Delete old files if they are being replaced
//     deleteOldFiles(oldFiles, documents);

//     // Update the existing document with the new files
//     await Document.findOneAndUpdate({ studentId: id }, documentData, { new: true });
//     return { message: "Student documents updated successfully!" };
//   }

//   // If no existing document, create a new one
//   await Document.create(documentData);
//   return { message: "Student documents uploaded successfully!" };
// };

// // UPLOAD STUDENT DOCUMENTS
// exports.uploadStudentDocuments = catchAsyncErrors(async (req, res, next) => {
//   const { id } = req.params; // Get student ID
//   const documents = req.files; // Files from the request

//   // Find if the student already has documents uploaded
//   const existingDocument = await Document.findOne({ studentId: id });

//   // If no files (Aadhar, TC, CC, RC) are uploaded, return an error
//   if (!documents.aadhar && !documents.tc && !documents.cc && !documents.rc) {
//     return res.status(400).json({
//       message: "At least one document (Aadhar, TC, CC, RC) must be provided for upload.",
//     });
//   }

//   // Handle document upload/update
//   try {
//     const result = await handleDocumentUpload(id, documents, existingDocument);
//     return res.status(200).json(result);
//   } catch (err) {
//     return res.status(500).json({
//       message: "Something went wrong while uploading the documents.",
//     });
//   }
// });


const deleteOldFiles = (oldFiles) => {
  oldFiles.forEach(({ path, newFile }) => {
    if (newFile && path !== newFile[0]?.path) {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(`Failed to delete file ${path}`, err);
        } else {
          console.log(`Successfully deleted old file ${path}`);
        }
      });
    }
  });
};

const handleDocumentUpload = async (id, documents, existingDocument) => {
  const documentData = {
    studentId: id,
    aadhar: documents.aadhar ? documents.aadhar[0].path : existingDocument?.aadhar,
    tc: documents.tc ? documents.tc[0].path : existingDocument?.tc,
    cc: documents.cc ? documents.cc[0].path : existingDocument?.cc,
    rc: documents.rc ? documents.rc[0].path : existingDocument?.rc,
  };

  if (existingDocument) {
    const oldFiles = [
      existingDocument?.aadhar ? { field: "aadhar", path: existingDocument.aadhar, newFile: documents.aadhar } : null,
      existingDocument?.tc ? { field: "tc", path: existingDocument.tc, newFile: documents.tc } : null,
      existingDocument?.cc ? { field: "cc", path: existingDocument.cc, newFile: documents.cc } : null,
      existingDocument?.rc ? { field: "rc", path: existingDocument.rc, newFile: documents.rc } : null,
    ].filter(Boolean);

    deleteOldFiles(oldFiles);
    await Document.findOneAndUpdate({ studentId: id }, documentData, { new: true });
    return { message: "Student documents updated successfully!" };
  }

  await Document.create(documentData);
  return { message: "Student documents uploaded successfully!" };
};

exports.uploadStudentDocuments = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const documents = req.files;

  if (!documents.aadhar && !documents.tc && !documents.cc && !documents.rc) {
    return res.status(400).json({
      message: "At least one document (Aadhar, TC, CC, RC) must be provided for upload.",
    });
  }

  try {
    const existingDocument = await Document.findOne({ studentId: id });
    const result = await handleDocumentUpload(id, documents, existingDocument);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error while uploading documents:", err);
    return res.status(500).json({
      message: "Something went wrong while uploading the documents.",
    });
  }
});

// Handle unhandled promise rejections and uncaught exceptions
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});




// GET DOCUMENTS OF SINGLE STUDENT
exports.getSingleStudentDocuments = catchAsyncErrors(async (req,res)=>{

  const {id} = req.params;

  try {
    const documents = await Document.findOne({studentId:id});
    if(!documents){
      return res.status(404).json({
        success:false,
        message:"Documents not found"
      })
    }
    res.status(200).json({
      success:true,
      documents
    })
}
catch (error) { 
  return res.status(500).json({
    success:false,
    message:"Server Error",
    error:error.message
  })  
}
});



// UPDATE STUDENT SECTION
exports.updateStudentSection = catchAsyncErrors(async(req,res)=>{

  const {id} = req.params;
  const {section} =req.body;




  const student = await Student.findByIdAndUpdate(id,{"academicInfo.section":section},{new:true})
  if(!student){
    return res.status(200).json({
      success:false,
      message:"Student not found"
    })

   
  }

  return res.status(200).json({
    success:true,
    message:"Section updated successfully"
  })
})



// Get All Students (ADMIN)
exports.getAllStudents = catchAsyncErrors(async (req, res, next) => {
  try {
    const std = req.query.std;
 
    const section = req.query.section;
    const isActive = req.query.isActive;
    let filter = {};

    if(std){
      filter["academicInfo.std"] = std;
    }
    if(section){
      filter["academicInfo.section"] = section;
    }
    if(isActive){
      filter["isActive"] = isActive;
    }
    const students = await Student.find(filter);
    const totalStudents = await Student.countDocuments(filter);
    const maleStudents = await Student.countDocuments({
      ...filter,
      "personalInfo.gender": "male",
    });
    const femaleStudents = await Student.countDocuments({
      ...filter,
      "personalInfo.gender": "female",
    });

    res.status(200).json({
      success: true,
      totalStudents,
      maleStudents,
      femaleStudents,
      students,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// Get ACTIVE Students (ADMIN)
exports.getActiveStudents = catchAsyncErrors(async (req, res, next) => {
  try {
    const std = req.query.std; // Fetch the standard from query parameters, e.g., ?std=5
    const section = req.query.section; // Fetch the section from query parameters, e.g., ?section=A
    const isActive = req.query.isActive;
    let filter = {  }; // Initial filter for active students

    // Add the 'std' filter if it is provided and equal to '5'
    if (std) {
      filter["academicInfo.std"] = std;
    }

    // Add the 'section' filter if it is provided
    if (section) {
      filter["academicInfo.section"] = section;
    }

    if(isActive){
      filter["isActive"] = isActive;
    }

    // Fetch students based on the filter criteria
    const students = await Student.find(filter);
    const totalStudents = await Student.countDocuments(filter);

    const maleStudents = await Student.countDocuments({
      ...filter,
      "personalInfo.gender": "male",
    });
    const femaleStudents = await Student.countDocuments({
      ...filter,
      "personalInfo.gender": "female",
    });

    res.status(200).json({
      success: true,
      totalStudents,
      maleStudents,
      femaleStudents,
      students,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// Get Single Student Details (ADMIN)
exports.studentDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// STUDENT DETAILS UPDATE

exports.studentDetailsUpdate = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const image = req.file ? req.file.path : null;

  const personalInfo = JSON.parse(req.body.personalInfo);
  const academicInfo = JSON.parse(req.body.academicInfo);
  const permanentAddress = JSON.parse(req.body.permanentAddress);
  const temporaryAddress = JSON.parse(req.body.temporaryAddress);

  try {
    // Find the student by ID
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // If an image is provided, delete the existing image and update the profile image
    if (image) {
      const existingImage = student.profileImage;
      if (existingImage) {
        fs.unlink(existingImage, (err) => {
          if (err) {
            console.error("Error deleting existing image:", err);
          }
        });
      }
      student.profileImage = image;
    }

    // Update the student's details
    student.personalInfo = personalInfo;
    student.academicInfo = academicInfo;
    student.permanentAddress = permanentAddress;
    student.correspondenceAddress = temporaryAddress;

    // Add the admin information to the updateBy array
    const adminInfo = {
      adminName: req.user.userName, // Assuming the admin's name is stored in req.user
      adminId: req.user._id.toString(), // Assuming the admin's ID is stored in req.user
    };
    student.updateBy.push(adminInfo);

    // Save the updated student details
    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the student",
      error: error.message,
    });
  }
});

// Delete A Student  (ADMIN)
exports.deleteStudent = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // if (student.profileImage) {
    //   await fs.unlink(student.profileImage);
    // }

    if (student.profileImage) {
      await fs.unlink(student.profileImage);
    } else {
      console.log("File not found at path:", student.profileImage);
    }

    res.status(200).json({
      success: true,
      message: `${student?.personalInfo?.fullName} is deleted successfully`,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});




// SEARCH STUDENT BY NAME (ADMIN)
exports.searchStudentByName = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.query;

  try {
    const students = await Student.find({
      "personalInfo.fullName": { $regex: name, $options: "i" },
    });

    res.status(200).json({
      success: true,
      totalStudents: students.length,
      students,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// SEARCH BY SCHOOL ID (ADMIN)
exports.searchStudentBySchoolId = catchAsyncErrors(async (req, res, next) => {
  const { schoolId } = req.query;

  try {
    const student = await Student.findOne({ studentId: schoolId }); // Find a student by school ID

    if (!student) {
      // If no student is found
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});


// STUDENT PROGRESSION
exports.setProgression = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const { progressionStatus, marks, daysAttended, schoolingStatus, section, std,admissionFee,tuitionFee } = req.body;
  const isActive = false;



  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }

  const adminInfo = {
    adminId: req.user.id,
    adminName: req.user.userName,
    updateTime: new Date(),
  };

  try {
    const currentSession = new Date().getFullYear().toString();
    const student = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          "progressionInfo.progressionStatus": progressionStatus,
          "progressionInfo.marks": marks,
          "progressionInfo.daysAttended": daysAttended,
          "progressionInfo.schoolingStatus": schoolingStatus,
          "progressionInfo.section": section,
          "progressionInfo.std": std,
          "progressionInfo.currentSession": currentSession,
          "progressionInfo.progressedOn": new Date(),
          "academicInfo.std":std,
          "academicInfo.academicYear":currentSession,
          "isActive":isActive,
          "progressionInfo.isActive":isActive,
          "academicInfo.admissionFee":admissionFee,
          "academicInfo.tutionFee":tuitionFee,
          


       
        },
   
        $push: { "progressionInfo.progressedBy": adminInfo },
      },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Progression info updated successfully",
      student, // Return updated student data
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message });
  }
});


// CORRECT THE STUDENT PROGRESSION

exports.correctStudentProgression = catchAsyncErrors(async(req,res)=>{
  const { id } = req.params;
  const { progressionStatus, marks, daysAttended, schoolingStatus,std, section,isActive } = req.body;

  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }

  const adminInfo = {
    adminId: req.user.id,
    adminName: req.user.userName,
    updateTime: new Date(),
  };

  try {
    const currentSession = new Date().getFullYear().toString();
    const student = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          "progressionInfo.progressionStatus": progressionStatus,
          "progressionInfo.marks": marks,
          "progressionInfo.isActive": !isActive,
          "progressionInfo.daysAttended": daysAttended,
          "progressionInfo.schoolingStatus": schoolingStatus,
          "progressionInfo.prevStd": std,
          "progressionInfo.section": section,
          "progressionInfo.currentSession": currentSession,
          "progressionInfo.progressedOn": new Date(),
          "academicInfo.academicYear":currentSession,
          "isActive":!isActive,


       
        },
   
        $push: { "progressionInfo.progressedBy": adminInfo },
      },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Progression info updated successfully",
      student, // Return updated student data
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message });
  }
})


// STUDENT NOTIFICATION EMAIL AND SMS 

exports.setEmailSms = catchAsyncErrors(async(req,res) => {

  const {isEmail,isSms} = req.body;
  const {id} = req.params;


  try {

    const student = await Student.findByIdAndUpdate(
      id,
      { notificationInfo: { isEmail, isSms } },
      { new: true, runValidators: true }
    );
  
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
  
    res.status(200).json({ success: true, message: "Notification settings updated" });
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

})


