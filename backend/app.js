// const express = require('express')
import express from "express";
import products from "./routes/productRoutes.js";
import errorHandlMiddleware from "./middleware/error.js";
import user from "./routes/userRoutes.js"
import order from "./routes/orderRoutes.js"
import cookieParser from "cookie-parser"

const app = express();

// middleware
app.use(express.json());

// parse cookies
app.use(cookieParser());

// routes
app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Passing middleware
app.use(errorHandlMiddleware);
export default app;
