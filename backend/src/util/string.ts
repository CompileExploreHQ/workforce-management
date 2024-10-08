import crypto from "crypto";

export const generateUniqueString = (length: number): string => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};
