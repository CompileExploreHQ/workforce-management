import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";

import "express-async-errors";

import BaseRouter from "@src/routes";

import EnvVars from "@src/common/EnvVars";
import { NodeEnvs } from "@src/common/misc";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan("dev"));
}

if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// check health
app.get("/", (req, res) => {
  res.send({ status: "ok" });
});

app.use("/api", BaseRouter());

export default app;
