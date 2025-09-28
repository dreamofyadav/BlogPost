// const mongoose = require("mongoose");
import mongoose from "mongoose";
const Schema =  mongoose.Schema;
// const Review = require("./review.js");
// import Review from "./review.js";
const  PostSchema = new Schema({
    title:{
        type: String,
        required : true,
    },
    description : String,
    image:{
        url: String,
        filename: String,
    },
    content: String,
    // reviews: [
    //  {
    //     type: Schema.Types.ObjectId,
    //     ref: "Review",
    //  },
    // ],
    author: {
        type:Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        enum: ["technology","travel","lifestyle", "food","education"],
        default:"technology",
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});


PostSchema.pre('save', function (next) {
this.updatedAt = Date.now();
next();
});


const Post = mongoose.model('Post', PostSchema);
export default Post;