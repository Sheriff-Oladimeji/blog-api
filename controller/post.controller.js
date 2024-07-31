import Post from "../model/Post.model";
import User from "../model/User.model";
const getAllPublishedPost = async (req, res) => {
    try {
        const posts = await Post.find({ state: "Published" })
         res.status(200).json({
           status: "success",
           posts,
         });
        
    } catch (error) {
          throw err;
    }
}

const getSinglePublishedPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .where("state")
      .eq("published");

    if (!post) {
      return res.status(404).json({
        status: "Failed",
        message: "Post with given Id not found",
      });
    } else {
      //increment the `readCount` property
      post.readCount === 0 ? post.readCount++ : post.readCount++;
      await post.save();
    }

    res.status(200).json({
      status: "success",
      post,
    });
  } catch (err) {
    throw err;
  }
};

const createAPost = async (req, res) => {
    try {
        const { title, description, tags, body } = req.body;

        //calculate read time of post from the body passed in
        const wpm = 225; //wpm => word per minute
        const numberOfWords = body.trim().split(/\s+/).length;
        const readTime = Math.ceil(numberOfWords / wpm);

        //get author name and author Id
        let { firstname, lastname } = req.user;
        let author = `${firstname} ${lastname}`;
        let authorId = req.user._id;
        const post = await Post.create({
            title,
            description,
            tags,
            body,
            author,
            authorId,
            readTime,
        });

        //add the new created post to 'posts' array property on the user document
        let user = await User.findById(req.user._id);
        user.posts.push(post._id);
        await user.save(); //save changes made to the user doc

        //send back response
        res.status(201).json({
            status: "success",
            post,
        });
    } catch (err) {
        throw err
    }
}