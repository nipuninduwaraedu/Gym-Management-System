const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
    return true;
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    return false;
  }
};

module.exports = connectDB;
