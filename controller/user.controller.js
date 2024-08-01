import Post from "../model/Post.model";

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      authorId: req.user._id,
    });
    res.status(200).json({
      status: "success",
      posts,
    });
  } catch (err) {
    throw err;
  }
};

export {getAllPosts}