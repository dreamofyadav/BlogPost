import express from "express";
import  bodyParser  from 'body-parser';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user-routes.js";
import blogRoutes from "./routes/Blog-routes.js";

import path from "path";
import { fileURLToPath } from "url";

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');


dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // exit process if DB connection fails
  }
};
connectDB();

// Routes
app.use("/auth", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
