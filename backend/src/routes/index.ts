import contentRouter from "./content";
import userRouter from "./user";
import brainRouter from "./brain";
import express, { RequestHandler } from "express";
import auth from "../middlewares/auth";

let router: express.Router = express.Router();

router.use("/user", userRouter);
router.use(auth as RequestHandler);
router.use("/content", contentRouter);
router.use("/brain", brainRouter);

export = router;
