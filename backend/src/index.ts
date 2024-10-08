import logger from "jet-logger";

import "./dotenv";
import EnvVars from "@src/common/EnvVars";
import server from "./server";
import connectDB from "./db";

connectDB();

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
