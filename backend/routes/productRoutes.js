import express from "express";
import {
  createProducts,
  func1Single,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
const router = express.Router();
// routes
router.route("/products").get(getAllProducts).post(createProducts);

router.route("/product/:id").put(updateProduct).get(getSingleProduct);

export default router;
