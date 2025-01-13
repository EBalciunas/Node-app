import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  answer_text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  gained_likes_number: { type: Number, default: 0 },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
