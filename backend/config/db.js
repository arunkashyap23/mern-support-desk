import mongoose from "mongoose";

const connectDB = async (MONGO_URI) => {
  try {
    const DB = {
      dbName: "support-desk",
    };

    await mongoose.connect(MONGO_URI, DB);
    console.log("Database Connected".cyan.bold);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
