import { Request, Response } from "express";
import connectToDatabase from "./config";
import routes from "./routes/index";

const express = require("express");
const app = express();
const port = 3000;

connectToDatabase();
app.use(express.json());
app.use("/api/v1/", routes);
// app.post("/randomData", (req: Request, res: Response) => {
//   res.send({
//     mdg: req.body.username,
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
