import express from 'express'
import { createProducts, func1Single, getAllProducts, updateProduct } from '../controller/productController.js';
const router = express.Router()
// routes
router.route("/products").get(getAllProducts).post(createProducts);
// router.route("/product").get(func1Single);
router.route("/product/:id").put(updateProduct)

export default router