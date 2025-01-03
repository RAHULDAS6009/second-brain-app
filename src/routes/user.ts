import express from "express";
import { z } from "zod";
import User from "../model/user";
import bcrypt from "bcrypt";
import { createToken } from "../service";

const userSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8).max(20),
});

let router: express.Router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const parsedUser = userSchema.parse(req.body);
    const user = await User.findOne({ username: parsedUser.username });
    const comparePassword = await bcrypt.compare(
      parsedUser.password,
      user?.password as string
    );
    if (!user) {
      res.json({ msg: "User does not exsist" });
    }
    if (!comparePassword) {
      res.json({ msg: "password does not match" });
    }

    res.status(200).json({
      msg: "Signed in ",
      token: createToken({
        id: String(user?._id),
        username: user?.username as string,
      }),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("validation failed", error.issues[0]);
      res.json({ msg: error.issues[0].message });
    } else {
      console.error("Unexpected error : ", error);
      res.json({
        msg: "some error occured",
      });
    }
  }
});

router.post("/signup", async (req, res) => {
  try {
    const parsedUser = userSchema.parse(req.body);
    const user = await User.findOne({ username: parsedUser.username });
    if (user) res.status(403).json({ msg: "User already exsist" });
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
      res.json({ msg: error.issues[0].message });
    } else {
      console.error("Unexpected error : ", error);
      res.json({
        msg: "some error occured",
      });
    }
  }
});

export default router;
