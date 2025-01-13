import Answer from "../models/Answer.js";

const likeAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ error: "Answer was not found." });
    }

    if (!answer.likes.includes(req.user.id)) {
      answer.likes.push(req.user.id);
      await answer.save();
      res.status(200).json({ message: "Answer liked." });
    } else {
      res.status(400).json({ error: "You already liked this answer." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to like answer." });
  }
};

const dislikeAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ error: "Answer wasnot found." });
    }

    if (!answer.dislikes.includes(req.user.id)) {
      answer.dislikes.push(req.user.id);
      await answer.save();
      res.status(200).json({ message: "Answer disliked." });
    } else {
      res.status(400).json({ error: "You already disliked this answer." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to dislike answer." });
  }
};

const getAnswerLikes = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ error: "Answer was not found." });
    }

    const likesCount = answer.likes.length;
    const dislikesCount = answer.dislikes.length;

    res.status(200).json({ likes: likesCount, dislikes: dislikesCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch likes/dislikes count." });
  }
};

export { likeAnswer, dislikeAnswer, getAnswerLikes };
