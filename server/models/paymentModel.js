const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    paymentMode:String,
    transactionId:String,
    studentId:{
      type: mongoose.Schema.ObjectId,
      ref: "Student",
    },
    studentName:String,
    std:String,
    rollNo:Number,
    totalAmount: Number,
    admissionFee:Number,
    tutionFee:Number,
    busFee:Number,
    hostelFee:Number,
    lateFee:Number,
    examFee:Number,
    payableAmount:Number,
    totalFee: Number, // total amount including additional fee
    month:{
     type:String,
     enum:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
 
    
    
    
    date: { type: Date },
    dueDate: Date,
    status: { type: String, default: 'pending' },
   




    receivedBy:{
      adminId:{
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
      },
      adminName:{
        type:String,
      },
      date:{
        type:Date,
        

       
      }

    },

    createdBy:{
      adminId:{
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
      },
      adminName:{
        type:String,
      },

    },
   
  });

  module.exports = mongoose.model("Payment",paymentSchema);