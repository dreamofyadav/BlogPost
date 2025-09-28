// const Post = require("../models/Post");
import Post from "../models/Post.js";
// import { isLoggedIn } from "../middleware/authenti.js";

// Get all posts with optional filters (category + search)
export const index = async (req, res, next) => {
    try {
        const { category, search } = req.query;
        let filter = {};

        if (category && category !== "all") {
            filter.category = category;
        }
        if (search && search.trim() !== "") {
            filter.title = new RegExp(search.trim(), "i");
        } const posts = await Post.find(filter)
            .populate("author", "name email");
            
            
        res.json({ success: true, posts });
    } catch (err) {
        next(err);
    }
};
// Get single post
export const showPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id)
            .populate("author", "_id name email");
            
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.json({ success: true, post });
    } catch (err) {
        next(err);
    }
};
// Create new post 
export const createPost = async (req, res, next) => {
    try {
        const { title, description,content, category } = req.body;
        const validCategories = Post.schema.path("category").enumValues;
        if (!validCategories.includes(category)) {
            return res.status(400)
            .json({ success: false, message: "Invalid category selected" });
        }
        const newPost = new Post({ title, description,content, category, author: req.user.id, });
        if (req.file) {
            const fullfilename = req.file.filename;
            const actualFilename = fullfilename.split("/").pop();
            newPost.image = { url: req.file.path, filename: actualFilename };
        }
        await newPost.save();
        res.status(201).json({ success: true, message: "Post created successfully", post: newPost });
    } catch (err) {
        next(err);
    }
};
// Update post
export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        let post = await Post.findById(id);
        if (!post) {
            return res.status(404)
            .json({ success: false, message: "Post not found" });
        }
        // Ownership check
        if (post.author.toString() !== req.user.id) {
            return res
            .status(403)
            .json({ success: false, message: "Unauthorized" });
        }
        
        const { title, description,content, category } = req.body;
        post.title = title || post.title;
        post.description = description || post.description;
        // post.category = category || post.category;
        post.content = content || post.content;

        if (category) {
            const validCategories = Post.schema.path("category").enumValues;
        if (!validCategories.includes(category)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category" });
        }
            post.category = category;
        }

        if (req.file) {
            // let url = req.file.path;
            const fullfilename = req.file.filename;
            const actualFilename = fullfilename.split("/").pop();
            post.image = {
                url: req.file.path ,
                filename: actualFilename
            };
        }
        await post.save();
        res.json({ success: true, message: "Post updated successfully", post });
    }
    catch (err) {
        console.error("Update Error:",err.message,err.stack);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
        next(err);
    }
};
// Delete post
export const destroyPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        let post = await Post.findById(id);
        if (!post) {
            return res.status(404)
            .json({ success: false, message: "Post not found" });
        }
        if (post.author.toString() !== req.user.id) {
            return res
            .status(403)
            .json({ success: false, message: "Unauthorized" });
        }
        await Post.findByIdAndDelete(id);
        res.json({ success: true, message: "Post deleted successfully" });
    } catch (err) {
        next(err);

    }
};

