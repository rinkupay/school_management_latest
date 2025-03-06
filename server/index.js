const app = require("./app")
const connectDatabase = require("./config/database")
const dotenv = require("dotenv");




// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });


// Dotenv Configuration
dotenv.config();


// Database Connection
connectDatabase();



// Server Listening
app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Server is running at ${process.env.PORT}`)
    }
})


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });