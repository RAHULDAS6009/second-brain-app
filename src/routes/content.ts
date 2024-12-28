import express from "express";
const router: express.Router = express.Router();

//add a new content
router.get("/content", (req, res) => {
  res.send("Hello content");
});


export default router;
