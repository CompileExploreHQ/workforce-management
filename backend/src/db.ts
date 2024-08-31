import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const dbURI = process.env.MONGODB_URI as string;
    await mongoose.connect(dbURI);
  } catch (error) {
    console.error("db connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
