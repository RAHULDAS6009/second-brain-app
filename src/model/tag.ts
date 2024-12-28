import mongoose from "mongoose";
const tagSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const tag = mongoose.model("Tag", tagSchema);

export default tag;
