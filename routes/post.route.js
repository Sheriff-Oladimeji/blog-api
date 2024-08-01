import express from "express";
import postController from "../controller/post.controller.js";
import authController from "../controller/auth.controller.js";

const router = express.Router();

router.get("/", postController.getAllPublishedPost);
router.get("/:postId", postController.getASinglePublishedPost);
router.put("/:postId", authController.authenticate, postController.updateAPost); //protected route
router.delete(
  "/:postId",
  authController.authenticate,
  postController.deleteAPost
); //protected route
const postRouter = router
export  default postRouter