import mongoose from "mongoose";
const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

const link = mongoose.model("Link", linkSchema);
export default link;
