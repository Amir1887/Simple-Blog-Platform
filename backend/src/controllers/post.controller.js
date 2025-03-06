const {
  getAllPosts,
  createPost,
  getPostById,
} = require("../services/post.service");

// Get all posts
const getAllPostsHandler = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch posts", error: error.message });
    }
};


// Create a post
const createPostHandler = async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        const post = await createPost(title, content, authorId);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: "Failed to create post", error: error.message });
    }
};

// Get a single post by ID
const getPostByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await getPostById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch post", error: error.message });
    }
};

module.exports = {
    getAllPostsHandler,
    createPostHandler,
    getPostByIdHandler,
};