import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  // take authorization header - > verify token or split the token into words -> then take the token and

  const authorizationHeader = req.headers["Authorization"] as string;
  const splitWords = authorizationHeader.split(" ");
  const token = splitWords[1];

  const decodedValue = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as jwt.JwtPayload;
  req.user = decodedValue?.id;
  next();
};

export default auth;
