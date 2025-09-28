// const express = require("express");
import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import multer from "multer";
import { storage} from "../cloudConfig.js";
//  import * as blogController from "../controller/blog-control.js";
import { index, createPost, showPost, updatePost, destroyPost } from "../controller/blog-control.js";

 // const wrapAsync = require("../utils/wrapAsync.js");
// const blogController = require("../controller/blog-control.js");
// const multer = require("multer");
// const { storage } = require("../cloudConfig.js");
// const upload = multer({ dest: "uploads/" }); //for saving photos localstorag
// import { upload } from "../cloudConfig.js";
const upload = multer({ storage });

// Middlewares
// const { isLoggedIn } = require("../middleware.js"); // only auth check krenge
import { isLoggedIn ,isOwner } from "../middleware/authenti.js";

// Routes

// Get all posts OR Create new post
router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    upload.single("image"), // React se file bhjte time key="image"
    wrapAsync(createPost)
  );

// Get single post / Update post / Delete post
router
  .route("/:id")
  .get(wrapAsync(showPost))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    wrapAsync(updatePost)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(destroyPost));

export default router;
