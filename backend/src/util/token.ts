import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

interface Payload {
  sub: string;
  [key: string]: any;
}

const EXPIRES_IN = "1h";
const ALGORITHM = "HS256";

/**
 * Generates a JWT token
 * @param payload - The payload to include in the token
 * @returns The JWT token
 */
export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, SECRET_KEY, {
    algorithm: ALGORITHM,
    expiresIn: EXPIRES_IN,
  });
};
