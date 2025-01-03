import { Request, Response, Router } from "express";
import express from "express";
const router: express.Router = express.Router();

//create a shareable link
router.post("/share", (req: Request, res: Response) => {
    //create a url 
    // res.redirect to the original url
});

export default router;