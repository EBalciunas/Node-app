import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const questionSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    date: { type: Date, required: true },
    question_text: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    answers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
