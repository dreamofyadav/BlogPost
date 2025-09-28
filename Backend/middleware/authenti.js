
import jwt from "jsonwebtoken";
import Post from "../models/Post.js"; // Post model
import ExpressError from "../utils/ExpressError.js";

//  User Auth Check (JWT)
export const isLoggedIn = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid Authorization header" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // { id: 'user_id_here' }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

//  Owner Check (Post Owner)
export const isOwner = async (req, res, next) => {
  const { id } = req.params; // post id from URL
  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Compare logged-in user id with post author
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "You are not the owner of this post" });
  }

  next();
};
