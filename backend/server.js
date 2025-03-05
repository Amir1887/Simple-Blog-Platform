require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

const postRoutes = require("./src/routes/posts");


app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
