const mongoose = require("mongoose");

const teacherPaymentSchema = new mongoose.Schema({
  transacionId: {
    type: String,
  },
  teacherId: {
    type: String,
  },
  teacherName: {
    type: String,
  },
  paidAmount: {
    type: Number,
  },
  bonusAmount:{
    type:Number,
  },
  totalAmount:{
     type:Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  status: { type: String, default: "paid" },
  month: {
    type: String,
  },
  paidBy: {
    adminId: {
      type: mongoose.Schema.ObjectId,
      ref: "Admin",
    },
    adminName: {
      type: String,
    },
  },
});

module.exports = mongoose.model("TeacherPayment", teacherPaymentSchema);
