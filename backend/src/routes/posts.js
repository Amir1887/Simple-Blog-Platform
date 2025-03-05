const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Get all posts
router.get("/", async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
});

// Create a post
router.post("/", async (req, res) => {
    const { title, content, authorId } = req.body;
    const post = await prisma.post.create({
        data: { title, content, authorId },
    });
    res.json(post);
});

// Get single post
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: { id },
    });
    res.json(post);
});

module.exports = router;
