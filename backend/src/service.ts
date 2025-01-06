import jwt from "jsonwebtoken";
require("dotenv").config();
const jwtSecret = process.env.SECRET_KEY as string;
export const createToken = ({
  id,
  username,
}: {
  id: string;
  username: string;
}) => {
  const token = jwt.sign({ id: id, username: username }, jwtSecret, {
    expiresIn: "2 days",
  });
  return token;
};
