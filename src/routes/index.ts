import contentRouter from "./content";
import userRouter from "./user";
import express from "express";

let router: express.Router = express.Router();

router.use("/content", contentRouter);
router.use("/user", userRouter);

export = router;
