import express from "express";
import { connectDB } from "*/config/mongodb";
import { env } from "*/config/environtment";

const app = express();

connectDB().catch(console.log)

app.get("/", async (req, res) => {
  res.end("<h1>Hello world!</h1><hr/>");
});

app.listen(env.PORT, env.HOST, () => {
  console.log(`I'm running at http://${env.HOST}:${env.PORT}`);
});
