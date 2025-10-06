// const express = require('express')
import express from 'express';
import product from './routes/productRoutes.js'
import products from './routes/productRoutes.js'
import errorHandlMiddleware from './middleware/error.js'
const app = express();

// middleware
app.use(express.json())

// app.use('/api/v1',product)
app.use('/api/v1',products)

app.use(errorHandlMiddleware

)
export default app;

