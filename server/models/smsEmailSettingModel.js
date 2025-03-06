const mongoose =require("mongoose");

const smsEmailsettingsSchema = new mongoose.Schema({
  emailNotifications: { type: Boolean, default: true },
  smsNotifications: { type: Boolean, default: true },
}, { timestamps: true });

module.exports =  mongoose.model('Settings', smsEmailsettingsSchema);
