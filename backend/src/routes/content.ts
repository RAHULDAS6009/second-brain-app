import express from "express";
import { z } from "zod";
import Content from "../model/content";
import Tag from "../model/tag";
const router: express.Router = express.Router();
const VALUES = ["image", "video", "article", "audio"] as const;

const contentSchema = z.object({
  type: z.enum(VALUES),
  link: z.string(),
  title: z.string(),
  tags: z.string().array(),
});
type contentType = z.infer<typeof contentSchema>;
//add a new content
router.post("/content", async (req, res) => {
  try {
    const contentBody: contentType = contentSchema.parse(req.body);
    //i think we have to use multer and cloudinary
    //see for the tag inside the database
    //create a tag if not exsist in the database
    //create a link instance in the database

    let newTag = await Tag.findOne({ title: contentBody.title });
    if (!newTag) {
      newTag = await Tag.create({ title: contentBody.tags });
    }

    const newContent = await Content.create({
      title: contentBody.title,
      type: contentBody.type,
      link: contentBody.link,
      tags: newTag._id,
      userId: req.body.userId,
    });
    res.status(200).send({ msg: "new content added", content: newContent });
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
