import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI);
  mongoose.connection.on("connected", () => {
    console.log("Connection to db successful");
  });
    mongoose.connection.on("error", (err) => {
        console.log("Connection to db failed");
        console.log(err);
    })
};


export default connectDB