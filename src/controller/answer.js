import Answer from "../models/Answer.js";
import Question from "../models/Questions.js";

const answerQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    const newAnswer = new Answer({
      answer_text: req.body.answer_text,
      question_id: questionId,
      user: req.user.id,
    });

    await newAnswer.save();

    question.answers += 1;
    await question.save();

    res
      .status(201)
      .json({ message: "Answer submitted successfully.", answer: newAnswer });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to submit answer.", details: error.message });
  }
};

const likeAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res
        .status(404)
        .json({ error: `Answer with ID ${answerId} not found.` });
    }

    const userId = req.user.id;

    if (answer.likes.includes(userId)) {
      answer.likes = answer.likes.filter((id) => id !== userId);
      answer.gained_likes_number -= 1;
    } else {
      answer.dislikes = answer.dislikes.filter((id) => id !== userId);

      answer.likes.push(userId);
      answer.gained_likes_number += 1;
    }

    await answer.save();

    res.status(200).json({
      message: answer.likes.includes(userId)
        ? "Answer liked."
        : "Like removed.",
      likes: answer.likes.length,
      dislikes: answer.dislikes.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to like answer.", details: error.message });
  }
};

const dislikeAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found." });
    }

    const userId = req.user.id;

    if (answer.dislikes.includes(userId)) {
      answer.dislikes = answer.dislikes.filter((id) => id !== userId);
    } else {
      answer.likes = answer.likes.filter((id) => id !== userId);

      answer.dislikes.push(userId);
    }

    await answer.save();

    res.status(200).json({
      message: answer.dislikes.includes(userId)
        ? "Answer disliked."
        : "Dislike removed.",
      likes: answer.likes.length,
      dislikes: answer.dislikes.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to dislike answer.", details: error.message });
  }
};

const getAnswerLikes = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found." });
    }

    res.status(200).json({
      likes: answer.likes.length,
      dislikes: answer.dislikes.length,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch likes/dislikes count.",
      details: error.message,
    });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found." });
    }

    if (answer.user !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this answer." });
    }

    const question = await Question.findById(answer.question_id);
    if (question) {
      question.answers -= 1;
      await question.save();
    }

    await answer.deleteOne();

    res.status(200).json({ message: "Answer deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete answer.", details: error.message });
  }
};

export {
  answerQuestion,
  likeAnswer,
  dislikeAnswer,
  getAnswerLikes,
  deleteAnswer,
};
