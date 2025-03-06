const ErrorHandler = require("../utils/errorHandler")

module.exports = (err,req,res,next)=>{
    err.statusCode || 500;
    err.message = err.message || "Internal Server Error";



    // Wrong MongoDb ID error or CasteError
    if(err.name === "CastError"){
        const message = `Resource not found, Invalid: ${err.path} `;
        err = new ErrorHandler(message,400)
    }


       // Wrong JWT Error
       if(err.name === "jsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHandler(message,400);
    }

   //  JWT Expire Error
   if(err.name === "TokenExpiredError"){
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandler(message,400);
}

res.status(err.statusCode).json({
    success:false,
    error:err.message
})


}