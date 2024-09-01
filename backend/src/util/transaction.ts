import mongoose, { ClientSession } from "mongoose";

type TransactionCallback = (session: ClientSession) => Promise<void>;

export async function withTransaction(callback: TransactionCallback) {
  const session: ClientSession = await mongoose.startSession();

  try {
    session.startTransaction();

    await callback(session);

    await session.commitTransaction();
    console.log("Transaction committed");
  } catch (error) {
    console.error("Error occurred during transaction:", error);
    await session.abortTransaction();
    console.log("Transaction aborted");
    throw error;
  } finally {
    session.endSession();
  }
}
