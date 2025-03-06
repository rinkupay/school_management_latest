const SchoolDetail = require("../models/schoolDetailModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");





// Create or update school details

exports.createSchoolDetails = catchAsyncErrors(async (req, res, next) => {
  const { schoolName, address } = req.body.schoolDetails;


 

  try {
    // Check if school details already exist
    let schoolDetail = await SchoolDetail.findOne({});

    if (schoolDetail) {
      // If school details exist, update them
      schoolDetail.schoolAddress = address;
        schoolDetail.schoolName = schoolName;

      await schoolDetail.save(); // Save the updated details
      return res.status(200).json({
        success: true,
        message: "School details updated successfully",
        schoolDetail, // Return the updated school detail
      });
    } else {
      // If school details do not exist, create a new record
      schoolDetail = new SchoolDetail({
        schoolName,
        schoolAddress:address,
      
      });

      await schoolDetail.save(); // Save the new school details
      return res.status(201).json({
        success: true,
        message: "School details created successfully",
        schoolDetail, // Return the created school detail
      });
    }
  } catch (error) {
    console.error("Error saving/updating school details:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



// SAVE SCHOOL SESSIONS
exports.saveSchoolSessions = catchAsyncErrors(async (req, res, next) => {   
    const { sessionStart, sessionEnd } = req.body.sessionDetails;

    
    try {
        // Check if school details already exist
        let schoolDetail = await SchoolDetail.findOne();
    
        if (schoolDetail) {
        // If school details exist, update them
        schoolDetail.sessionDetails = { startDate:sessionStart, endDate:sessionEnd };
    
        await schoolDetail.save(); // Save the updated details
        return res.status(200).json({
            success: true,
            message: "School session details updated successfully",
            schoolDetail, // Return the updated school detail
        });
        } else {
        return res.status(404).json({
            success: false,
            message: "School details not found",
        });
        }
    } catch (error) {
        console.error("Error saving/updating school session details:", error);
        return res.status(500).json({
        success: false,
        message: error.message,
        });
    }
    }       
)


// GET SCHOOL DETAILS
exports.getSchoolDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const schoolDetails = await SchoolDetail.findOne();
    if (!schoolDetails) {
      return res.status(200).json({
        success: true,
        message: "No school details found, returning default",
        schoolDetails: { schoolName: "", schoolAddress: "", sessionDetails: { startDate: "", endDate: "" } }
      });
    }   
    res.status(200).json({
      success: true,
      schoolDetails,
    });
    } catch (error) {
    console.error("Error fetching school details:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });

    }
    }
)