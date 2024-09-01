import mongoose from "mongoose";
import logger from "jet-logger";
import EnvVars from "@src/common/EnvVars";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(EnvVars.MongodbUrl);
  } catch (error) {
    logger.err("db connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
