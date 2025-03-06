const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");




const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique:true,
        validate: [validator.isEmail, "Please enter valid email"],
    },
    mobile: {
        type: Number,

    },
    gender: {
        type:String,
        default:"male"
    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        select: false,
      },
      role: {
        type: String,
        enum: ["user", "admin", "super"], 
        default: "user",
      },
      address:{
          address1:{
            type:String,
          },
          address2:{
            type:String
          },
          pinCode:{
            type:Number
          },
          state:{
            type:String
          }
      },
  
      resetPasswordToken: String,
      resetPasswordExpire: Date,
},

{timestamps:true}
);


// Hashing Password
userSchema.pre("save" , async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE});
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){

  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
}



module.exports = mongoose.model("User", userSchema);