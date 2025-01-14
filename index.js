import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import userRouter from "./src/route/user.js";
import questionRoutes from "./src/route/questions.js";
import answerRoutes from "./src/route/answer.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Successfully connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(userRouter);
app.use(questionRoutes);
app.use(answerRoutes);

app.use((req, res) => {
  res.status(404).json({ response: "Your endpoint not exist!" });
});

app.listen(process.env.PORT, () => {
  console.log(`App was started on port ${process.env.PORT}`);
});
