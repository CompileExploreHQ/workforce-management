import mongoose, { ClientSession } from "mongoose";
import logger from "jet-logger";

type TransactionCallback<T> = (session: ClientSession) => Promise<T>;

export async function withTransaction<T>(
  callback: TransactionCallback<T>
): Promise<T> {
  const session: ClientSession = await mongoose.startSession();

  try {
    session.startTransaction();
    logger.info("Transaction started");

    const result = await callback(session);

    await session.commitTransaction();
    logger.info("Transaction committed");

    return result;
  } catch (error) {
    logger.err("Error occurred during transaction:", error);
    await session.abortTransaction();
    logger.info("Transaction aborted");
    throw error;
  } finally {
    session.endSession();
  }
}
