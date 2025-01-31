import express, { Request, Response } from "express";
import { z } from "zod";
import User from "../model/user";
import bcrypt from "bcrypt";
import { createToken } from "../service";

const userSchema = z.object({
  username: z.string().min(3).max(10),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(new RegExp(".*[A-Z].*"))
    .regex(new RegExp(".*[a-z].*"))
    .regex(new RegExp(".*[0-9].*"))
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*")),
});

let router: express.Router = express.Router();

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const parsedUser = userSchema.parse(req.body);
    const user = await User.findOne({ username: parsedUser.username });
    const comparePassword = await bcrypt.compare(
      parsedUser.password,
      user?.password as string
    );
    if (!user) {
      res.status(403).json({ msg: "User does not exsist" });
    }
    if (!comparePassword) {
      res.status(403).json({ msg: "Password is wrong" });
    }

    const token = createToken({
      id: String(user?._id),
      username: user?.username as string,
    });

    res
      .cookie("token", "Bearer " + token, { httpOnly: true })//learn and right the important properties of cookies
      .json({
        msg: "Signed in Successfully",
      })
    // res.status(200).json({
    //   msg: "Signed in ",
    //   token: token,
    // });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("validation failed", error.issues[0]);
      res.json({ msg: error.issues[0].message });
    } else {
      console.error("Unexpected error : ", error);
      res.status(500).json({
        msg: "some error occured",
      });
    }
  }
});

router.post("/signup", async (req, res): Promise<any> => {
  try {
    const parsedUser = userSchema.parse(req.body);
    const user = await User.findOne({ username: parsedUser.username });
    if (user) return res.status(403).json({ msg: "User already exsist" });
    const newUser = await User.create({
      username: parsedUser.username,
      password: await bcrypt.hash(parsedUser.password, 10),
    });
    res.status(200).json({
      msg: "Signed Up",
      token: createToken({
        id: String(newUser._id),
        username: newUser.username,
      }),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("validation failed", error.issues[0]);
      if (error.issues[0].path[0] == "username") {
        res.json({ msg: "username should be 3-10 letters" });
      } else {
        res.status(411).json({
          msg: "Password should be 8 to 20 letters, should have atleast one uppercase, one lowercase, one special character, one number",
        });
      }
    } else {
      console.error("Unexpected error : ", error);
      res.status(500).json({
        msg: "some error occured",
      });
    }
  }
});

export default router;
