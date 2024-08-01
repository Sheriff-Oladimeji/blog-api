import express from "express";
import connectDB from "./db/db.js";
import postRouter  from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use("/api/posts", postRouter);

connectDB()
app.listen(port, () => console.log(`Server is running on port ${port}`));
