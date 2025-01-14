import express from "express";
import {
  likeAnswer,
  dislikeAnswer,
  getAnswerLikes,
} from "../controller/answer.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/:id/like", authenticate, likeAnswer);
router.post("/:id/dislike", authenticate, dislikeAnswer);
router.get("/:id/likes", getAnswerLikes);

export default router;
