const express = require("express");
const router = express.Router();
const { getAllPostsHandler, createPostHandler, getPostByIdHandler } = require("../controllers/post.controller");


// Get all posts
router.get("/", getAllPostsHandler);

// Create a post
router.post("/", createPostHandler);

// Get single post
router.get("/:id", getPostByIdHandler);

module.exports = router;
