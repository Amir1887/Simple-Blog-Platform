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
                    id: true,
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
                    id: true,
                }
            }
        }
    });
};

 // edit single post by id 
 const editPostById = async (id, data) => {
    return await prisma.post.update({
        where: {id},
        data: {...data}    // Ensure data contains the updated values
    });
 }

 // delete single post 

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    editPostById
};