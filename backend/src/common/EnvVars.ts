/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */

export default {
  NodeEnv: process.env.NODE_ENV ?? "",
  Host: process.env.HOST ?? "localhost",
  Port: process.env.PORT ?? 5010,
  JwtSecret: process.env.JWT_SECRET ?? "jwt_secret",
  SecretKey: process.env.SECRET_KEY ?? "secret",
  MongodbUrl: process.env.MONGODB_URI ?? "",
} as const;
