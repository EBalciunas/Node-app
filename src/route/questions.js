import express from "express";
import Question from "../models/Questions.js";
import {
  getQuestions,
  createQuestion,
  deleteQuestion,
} from "../controller/questions.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.get("/questions", getQuestions);

router.get("/questions/filter", async (req, res) => {
  const { answered } = req.query;

  try {
    let query = {};

    if (answered === "true") {
      query = { answers: { $gte: 1 } };
    } else if (answered === "false") {
      query = { answers: { $lte: 0 } };
    }

    const questions = await Question.find(query);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to filter questions" });
  }
});

router.post("/question", authenticate, createQuestion);
router.delete("/question/:id", authenticate, deleteQuestion);

export default router;
