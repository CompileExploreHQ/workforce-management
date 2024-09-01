import mongoose from "mongoose";
import EnvVars from "@src/common/EnvVars";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(EnvVars.MongodbUrl);
  } catch (error) {
    console.error("db connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
