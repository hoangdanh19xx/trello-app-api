import express from "express";
import { mapOrder } from "*/utilities/sorts.js";

const app = express();

const hostname = "localhost";
const port = 8017;

app.get("/", async (req, res) => {
  res.end("<h1>Hello world!</h1><hr/>");
});

app.listen(port, hostname, () => {
  console.log(`I'm running at http://${hostname}:${port}`);
});
