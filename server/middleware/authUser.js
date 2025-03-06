const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Authenticated User
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        // return next(new ErrorHandler("Please login to access this resource", 401));
        res.status(401).json({
            success:false,
            message:"Please login  to access this resource"
        })
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);

        if (!req.user) {
            // return next(new ErrorHandler("Admin not found", 404));
            res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        next();

    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
});



// Authorized Role Middleware
exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
      }
      next();
    };
  };
  



  