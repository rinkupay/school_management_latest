const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler")
const bcrypt = require("bcryptjs");
const sendEmail = require("../middleware/sendMail");
const  crypto = require("crypto");
const mongoose = require("mongoose");

// Register Admin
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { userName, email, password,mobile } = req.body;
  

    try {

        const isEmail = await User.findOne({email:email});
        if(isEmail){
            res.status(201)
            .json({success:false, message: "Email already registerd"})
        }else{
            const user = new User({
                userName,
                mobile,
                email,
                password,
            });
    
            await user.save();
    
           // Send token in response
        sendToken(user, 201, res);
        }

        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Admin registration failed",
            error: error.message
        });
    }
});


// Admin Login
exports.userLogin = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter email and password"
        });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});





// Admin Details
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
    // Ensure user ID exists in request
    if (!req.user || !req.user.id) {
        return res.status(400).json({
            success: false,
            message: "User ID is missing from request",
        });
    }

    // Fetch user and exclude sensitive fields like password
    const user = await User.findById(req.user.id).select("-password -tokens");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        user,
    });
});



// Admin Update
exports.userUpdate = catchAsyncErrors(async (req, res) => {
   const {id} = req.params;

   console.log(req.body)
    // Find the user by ID
    const user = await User.findById(id);

    

    if (user) {
        // Update user fields with new data from the request body
        user.userName = req.body.userName || user.userName;
        user.gender = req.body.gender || user.gender;
        user.mobile = req.body.mobile || user.mobile;
        user.email = req.body.email || user.email;
       user.address ={
        address1 : req.body.address1 ,
         address2 : req.body.address2 ,
        pinCode : req.body.pinCode ,
        state : req.body.state 
       }

        // Save the updated user to the database
        await user.save();

        // Send a response with the updated user data
        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            user,
        });
    } else {
        // If the user is not found, send an error response
        res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
   
});



//  Update user Password
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  
  const user = await User.findById(req.user.id).select("+password");
 

  await bcrypt.compare(
    currentPassword,
    user.password,
    async function (error, result) {
      if (result) {
        user.password = newPassword;

        await user.save();
        sendToken(user, 200, res);
      } else {
        res.status(400).json({
          success: true,
          message: "Password did not matched",
        });
      }
    }
  );
  
});


// Logout Admin
exports.userLogout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});


// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      // return next(new ErrorHandler("User not found", 404));
      return res.status(500).json({
        success:true,
        message:"Email not found"
      })
    }
  
    // Get Reset Password token
  
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.PASSWORD_RECOVERY_API}/password/reset/${resetToken}`;
  
    const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this eamil then please ignore it`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Password reset link sent to your email ${user.email} successfully.`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });


  // Reset Password using reset link
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Creating Token Hash

 
  const resetPasswordToken = crypto
    .createHash("sha256")

    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});


// GET ALL USERS (ADMIN)
exports.getAllUsers = catchAsyncErrors(async (req, res) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });


  // Update User Role
// Update User Role
exports.updateUserRole = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  // Validate role input
  if (!role) {
    return res.status(400).json({ success: false, message: "Role is required." });
  }

  // Find and update the user
  const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  res.status(200).json({ success: true, message: "User role updated successfully.", user });
});

// DELETE A USER (ADMIN)
exports.deleteUser = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;


  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID format"
    });
  }

  const user = await User.findByIdAndDelete(id).lean();

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }


  return res.status(204).json({
    success: true,
    message: "User deleted successfully"
  });
});

      