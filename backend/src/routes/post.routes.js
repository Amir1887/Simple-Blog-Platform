const express = require("express");
const router = express.Router();
const { getAllPostsHandler, createPostHandler, getPostByIdHandler, editPostHandler } = require("../controllers/post.controller");
const authenticateJWT = require("../middleware/auth.middleware");


// Get all posts
router.get("/", getAllPostsHandler);

// Create a post
router.post("/", createPostHandler);

// Get single post
router.get("/:id", getPostByIdHandler);

// Edit single post 
router.put("/:id", authenticateJWT,  editPostHandler);

module.exports = router;
