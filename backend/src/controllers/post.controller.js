const {
  getAllPosts,
  createPost,
  getPostById,
  editPostById,
  deletePostById,
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

// edit post by id 
const editPostHandler = async (req, res) => {
 
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // Fetch the post to check if the current user is the author
        const post = await getPostById(id);
        if (!post){
            return res.status(404).json({message: "post not found"})
        }
        // Check if the current user is the author of the post
        if(req.user.id !== post.authorId){
            return res.status(403).json({ message: "you are not authorized to edit this post." })
        }

        // update the post 
        const editedPost = await editPostById(id, { title, content });
        res.json(editedPost);
    } catch (error) {
        res.status(500).json({message: "Failed to edit post", error: error.message})
    }
}

// delete post by id 
const deletePostHandler = async (req, res) => {
    try {
        // Ensure id is a number
        const { id } = req.params;
     

        const post = await getPostById(id);
        if (!post){
            return res.status(404).json({message: "post not found"});
        }
        // Check if the current user is the author of the post
        if ( req.user.id !== post.authorId ) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }
        await deletePostById(id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "failed to delete post", error: error.message});
    }
    
}

module.exports = {
    getAllPostsHandler,
    createPostHandler,
    getPostByIdHandler,
    editPostHandler,
    deletePostHandler
};