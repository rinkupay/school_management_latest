const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'images' folder exists, create it if it doesn't
const images = path.join(__dirname, '../images');

if (!fs.existsSync(images)) {
  fs.mkdirSync(images, { recursive: true });
}

// <<<<<<<<<<<<<================= MULTR CONFIGURATION ========================>>>>>>>>>>>>>>>>
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
  });
  
  const upload = multer({ storage: storage });
  
  module.exports = upload;