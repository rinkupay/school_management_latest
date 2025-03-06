const nodeMailer = require("nodemailer");

// const sendEmail = async(options)=>{

//     const transporter = nodeMailer.createTransport({
//         service:"gmail",
//         port: 465,
//         secure: true,  // True for 465, false for other ports
//         logger:true,
//         debug:true,
//         secureConnection:false,
//         auth:{
//             user: "rinkumurmupay@gmail.com",
//             pass: "jbqrnfjyrhvbgsig",
//         },
//         tls:{
//             rejectUnauthorized:true,
//         }
//     });

//     const mailOptions = {
//         from:"rinkumurmupay@gmail.com",
//         to:options.email,
//         subject:options.subject,
//         text:options.message,
//     };

//     await transporter.sendMail(mailOptions)

// }




const sendEmail = async(options)=>{

    const transporter = nodeMailer.createTransport({
        service:process.env.SERVICE_NAME,
        port: process.env.EMAIL_PORT,
        secure: true,  // True for 465, false for other ports
        logger:true,
        debug:true,
        secureConnection:false,
        auth:{
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
        },
        tls:{
            rejectUnauthorized:true,
        }
    });

    const mailOptions = {
        from:process.env.EMAIL_FROM,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

    await transporter.sendMail(mailOptions)

}

module.exports = sendEmail