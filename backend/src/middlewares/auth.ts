import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookie = req.cookies.token;
    const splitWords = cookie.split(" ");
    const token = splitWords[1];
    if (splitWords[0] !== "Bearer" && !token) {
      res.json({ msg: "Authenticaton required" });
    }
    const decodedValue = jwt.verify(
      token,
      process.env.SECRET_KEY as jwt.Secret
    ) as JwtPayload;
    if (!decodedValue.id) {
      res.json({ msg: "Wrong Authentication token" });
    }

    req.user = decodedValue.id;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ msg: "Inavlid token" });
    }
    console.log("Authentication middlware error ", error);
    return res.status(500).json({ msg: "Internal Server error" });
  }
};

export default auth;
