import mongoose, { Types } from "mongoose";
export enum contentType {
  image,
  video,
  document,
  audio,
}
const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: contentType, required: true },
  link: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

const content = mongoose.model("Content", contentSchema);
export default content;
