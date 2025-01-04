import express from "express";
import { z } from "zod";
import Content from "../model/content";
const router: express.Router = express.Router();
const VALUES = ["image", "video", "article", "audio"] as const;

const contentSchema = z.object({
  type: z.enum(VALUES),
  link: z.string(),
  title: z.string(),
  tags: z.string().array(),
});
//add a new content
router.post("/content", async (req, res) => {
  try {
    const contentBody = contentSchema.parse(req.body);
    const newContent = await Content.create({
      title: contentBody.title,
      type: contentBody.type,
      link: contentBody.link,
      tags: contentBody.tags,
      userId: req.body.userId,
    });
    res.send({ msg: "new content added" });
  } catch (error) {}
});

// all user exsisting contents
router.get("/content", async (req, res) => {
  const allContents = await Content.find({ userId: req.body.userId }); //later it is changed to userId given from middleware
  res.send({ contents: allContents });
});

//delete a content
router.delete("/content/:id", async (req, res) => {
  const findContent = await Content.findById({ _id: req.params.id });
  const allContents = await Content.deleteOne({ userId: req.body.userId }); //later it is changed to userId given from middleware
  res.send({ contents: allContents });
});

export default router;
