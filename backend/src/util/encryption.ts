import bcrypt from "bcrypt";
import crypto from "crypto";
import EnvVars from "@src/common/EnvVars";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const secretKeyHash = crypto
      .createHash("sha256")
      .update(EnvVars.SecretKey)
      .digest("hex");

    const combinedPassword = `${password}${secretKeyHash}`;
    const hashedPassword = await bcrypt.hash(combinedPassword, SALT_ROUNDS);

    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const secretKeyHash = crypto
      .createHash("sha256")
      .update(EnvVars.SecretKey)
      .digest("hex");

    const combinedPassword = `${password}${secretKeyHash}`;
    const isMatch = await bcrypt.compare(combinedPassword, hashedPassword);

    return isMatch;
  } catch (error) {
    throw new Error(`Error validating password: ${error.message}`);
  }
};
