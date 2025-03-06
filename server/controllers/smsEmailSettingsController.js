const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../middleware/sendMail");
const EmailSms = require("../models/smsEmailSettingModel");

// SET EMAIL AND SMS SETTINGS
exports.setSmsEmailSettings = catchAsyncErrors(async (req, res) => {
  try {
    const { emailNotifications, smsNotifications } = req.body;

    let settings = await EmailSms.findOne();
    if (!settings) {
      settings = new EmailSms({ emailNotifications, smsNotifications });
    } else {
      settings.emailNotifications = emailNotifications;
      settings.smsNotifications = smsNotifications;
    }

    await settings.save();

    res.json({ message: ` Notification Settings updated successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET EMAIL AND SAM SETTINGS

exports.getEmailSmsSettings = catchAsyncErrors(async (req, res) => {
  try {
    const settings = await EmailSms.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
