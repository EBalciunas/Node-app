import Answer from "../models/Answer.js";

const likeAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found." });
    }

    if (!answer.likes.includes(req.user.id)) {
      answer.likes.push(req.user.id);
      await answer.save();
      res.status(200).json({ message: "Answer liked." });
    } else {
      res.status(400).json({ error: "You already liked this answer." });
    }
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

    if (!answer.dislikes.includes(req.user.id)) {
      answer.dislikes.push(req.user.id);
      await answer.save();
      res.status(200).json({ message: "Answer disliked." });
    } else {
      res.status(400).json({ error: "You already disliked this answer." });
    }
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

export { likeAnswer, dislikeAnswer, getAnswerLikes };
