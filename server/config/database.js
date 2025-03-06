const mongoose = require("mongoose");
const { updateLateFeeOverDueFees } = require("../middleware/addLateFee");

const connectDatabase = async () => {
  try {
    const data = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB is connected with server: ${data.connection.host}`);

    // Call Late Fee Update function asynchronously in the background
    updateLateFeeOverDueFees()
      .then((result) => {
        console.log(result.message);
      })
      .catch((err) => {
        console.error("Error while applying late fee:", err);
      });

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Graceful shutdown to close DB connections properly
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});

module.exports = connectDatabase;
