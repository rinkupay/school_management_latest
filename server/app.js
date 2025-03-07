const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error")
const path = require("path");

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use of Cors
app.use(cors({
    origin: ["http://localhost:5173","https://school-management-1-4bjb.onrender.com","https://school-management-latest-1.onrender.com"],
    methods:["POST","GET","DELETE","PUT","PATCH"],
    credentials: true
}));



// Use of cooki Parser
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(errorMiddleware);

app.get("/",(req,res)=>{
    res.send("<h1> Hello form server</h1>")

})



// Usage Of user Routes
const user = require("./routes/userRoutes");
const student = require("./routes/studentRoutes");
const studentEnquiry = require("./routes/studentEnquiryRoutes");
const payment = require("./routes/paymentRoutes");
const teacher = require("./routes/teacherRoutes");
const teacherPayment = require("./routes/teacherPayment");
const feeSttings = require("./routes/feeSettingsRoutes");
const smsEmailSettings = require("./routes/emailSmsSettingsRoutes");
const schoolDetail = require("./routes/schoolDetailRoutes");
const subscription = require("./routes/subscriptionRoutes");

app.use("/api/v1",user);
app.use("/api/v1",student);
app.use("/api/v1",studentEnquiry);
app.use("/api/v1",payment);
app.use("/api/v1",teacher);
app.use("/api/v1",teacherPayment);
app.use("/api/v1",feeSttings);
app.use("/api/v1",smsEmailSettings);
app.use("/api/v1",schoolDetail);
app.use("/api/v1",subscription);






module.exports = app