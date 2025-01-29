import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  // // take authorization header - > verify token or split the token into words -> then take the token and

  // const authorizationHeader = req.headers["Authorization"] as string;
  // const splitWords = authorizationHeader.split(" ");
  // const token = splitWords[1];
  // //check it initailly have Bearer or not

  // const decodedValue = jwt.verify(
  //   token,
  //   process.env.JWT_SECRET as string
  // ) as jwt.JwtPayload;
  // req.user = decodedValue?.id;
  const cookie = req.cookies.token;
  const splitWords = cookie.split(" ");
  const token = splitWords[1];

  if (!token) {
    res.json({ msg: "No cookies" });
  }

  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
  console.log(decodedToken);
  console.log(cookie);

  if (decodedToken.id == cookie.userId) {
    req.user = cookie.userId;
  }

  next();
};

export default auth;
