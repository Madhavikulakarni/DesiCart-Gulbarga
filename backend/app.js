// const express = require('express')
import express from "express";
import products from "./routes/productRoutes.js";
import errorHandlMiddleware from "./middleware/error.js";
import user from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"

const app = express();

// middleware
app.use(express.json());

// parse cookies
app.use(cookieParser());

// app.use('/api/v1',product)
app.use("/api/v1", products);
app.use("/api/v1", user);

// Passing middleware
app.use(errorHandlMiddleware);
export default app;
