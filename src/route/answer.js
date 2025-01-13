import express from "express";
import {
  likeAnswer,
  dislikeAnswer,
  getAnswerLikes,
} from "../controller/answer.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/answer/:id/like", authenticate, likeAnswer);
router.post("/answer/:id/dislike", authenticate, dislikeAnswer);
router.get("/answer/:id/likes", getAnswerLikes);

export default router;
