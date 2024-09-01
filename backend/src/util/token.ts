import jwt from "jsonwebtoken";
import EnvVars from "@src/common/EnvVars";

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
  return jwt.sign(payload, EnvVars.JwtSecret, {
    algorithm: ALGORITHM,
    expiresIn: EXPIRES_IN,
  });
};
