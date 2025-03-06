const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET ALL POSTS 
const getAllPosts = async () => {
    return await prisma.post.findMany({
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    username: true,
                }
            }
        }
    });
};

// Create a post
const createPost = async (title, content, authorId) => {
    return await prisma.post.create({
        data: { title, content, authorId },
    });
};


// Get a single post by ID
const getPostById = async (id) => {
    return await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    username: true,
                }
            }
        }
    });
};

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
};