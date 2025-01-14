import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const answerSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  answer_text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  gained_likes_number: { type: Number, default: 0 },
  question_id: {
    type: String,
    ref: "Question",
    required: true,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  likes: [{ type: String, ref: "User" }],
  dislikes: [{ type: String, ref: "User" }],
});

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
