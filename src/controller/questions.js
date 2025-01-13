import Question from "../models/Questions.js";

const createQuestion = async (req, res) => {
  const { question_text } = req.body;
  const user_id = req.user.id;

  if (!question_text) {
    return res.status(400).json({ error: "Question text is required." });
  }

  try {
    const newQuestion = new Question({ question_text, user_id });
    await newQuestion.save();
    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create question" });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (question.user_id.toString() !== user_id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this question" });
    }

    await question.deleteOne();
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete question" });
  }
};

export { createQuestion, getQuestions, deleteQuestion };
