import express from "express";
import { z } from "zod";
import Content from "../model/content";
import Tag from "../model/tag";
import Link from "../model/link";
const router: express.Router = express.Router();
const VALUES = ["image", "video", "document", "audio"] as const;

const contentSchema = z.object({
  type: z.enum(VALUES),
  link: z.string(),
  title: z.string(),
  tags: z.string().array(),
});
type contentType = z.infer<typeof contentSchema>;

//add a new content
router.post("/", async (req, res) => {
  try {
    const contentBody: contentType = contentSchema.parse(req.body);

    //i think we have to use multer and cloudinary
    //see for the tag inside the database
    //create a tag if not exsist in the database
    //create a link instance in the database
    let tag = await Tag.findOne({ title: contentBody.tags[0] });//finMany 
    if (!tag) {
      tag = await Tag.create({ title: contentBody.tags[0] });//createMany or insertMany
    }
   
    // let link =await Link.findOne({})

    const newContent = await Content.create({
      title: contentBody.title,
      type: contentBody.type,
      link: contentBody.link,
      tags: tag._id,
      userId: req.user,
    });
    res.status(200).send({ msg: "New content added" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // console.log(error.issues[0].message);
      res.json({ msg: error.issues[0].message });
    }
    //error of zod
    console.log(error);
    res.status(500).json({
      msg: "some error occured",
    });
  }
});

// all user exsisting contents
router.get("/", async (req, res) => {
  const allContents = await Content.find({ userId: req.body.userId }); //later it is changed to userId given from middleware
  res.send({ contents: allContents });
});

//delete a content
router.delete("/:id", async (req, res) => {
  const findContent = await Content.findById({ _id: req.params.id });
  const allContents = await Content.deleteOne({ userId: req.body.userId }); //later it is changed to userId given from middleware
  res.send({ contents: allContents });
});

export default router;
