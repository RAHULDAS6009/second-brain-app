import { Request, Response } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDatabase from "./config";
import routes from "./routes/index";

const app = express();
const port = process.env.PORT;

connectToDatabase();
// Integrate the ai part
// https://excalidraw.com/#json=Zu2bpX5MQb0ckMvUBIVev,VFiMryfDBIluxCv4yFl7jw
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("hyu;");
});
app.use("/api/v1/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
