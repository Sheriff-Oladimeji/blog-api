import express from "express"
import authController from "../controller/auth.controller.js";
import userController from "../controller/user.controller.js";

const router = express.Router()

//API endpoint for an author
router.get('/author', authController.authenticate, userController.getAllPosts);

//API endpoint for signup and login
router.post("/auth/signup", authController.signup)
router.post("/auth/login", authController.login)

const userRouter = router

export default userRouter