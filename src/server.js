import express from "express";
import cors from "cors";
import { CorsOptions } from "*/config/cors";
import { connectDB } from "*/config/mongodb";
import { env } from "*/config/environtment";
import { apiV1 } from "*/routes/v1";

connectDB()
  .then(() => console.log("Connected successfully to database server!"))
  .then(() => bootServer())
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.use(cors(CorsOptions));
  // Enable req.body data
  app.use(express.json());

  // Use APIs v1
  app.use("/v1", apiV1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`I'm running at http://${env.APP_HOST}:${env.APP_PORT}`);
  });
};
