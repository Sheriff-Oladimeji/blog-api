import express from "express";
import connectDB from "./db/db.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB()
app.listen(port, () => console.log(`Server is running on port ${port}`));
