import express from "express";
import bodyParser from "body-parser";
import userRouter from "./src/route/user.js";
import questionRoutes from "./src/route/questions.js";

const app = express();
const PORT = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use(express.json());

app.use("/api", userRouter);

app.use(questionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
