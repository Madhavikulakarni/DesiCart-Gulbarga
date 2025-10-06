// const express = require('express')
import express from "express";
import products from "./routes/productRoutes.js";
import errorHandlMiddleware from "./middleware/error.js";
const app = express();

// middleware
app.use(express.json());

// app.use('/api/v1',product)
app.use("/api/v1", products);

// Passing middleware
app.use(errorHandlMiddleware);
export default app;
