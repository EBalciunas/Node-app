import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
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
