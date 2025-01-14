import express from "express";
import {
  answerQuestion,
  likeAnswer,
  dislikeAnswer,
  getAnswerLikes,
  deleteAnswer,
} from "../controller/answer.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/:id/answer", authenticate, answerQuestion);
router.post("/:id/like", authenticate, likeAnswer);
router.post("/:id/dislike", authenticate, dislikeAnswer);
router.get("/:id/likes", getAnswerLikes);
router.delete("/:id/delete", authenticate, deleteAnswer);

export default router;
