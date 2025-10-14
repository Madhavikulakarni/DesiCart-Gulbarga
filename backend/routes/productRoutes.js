import express from "express";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
import { roleBasedaccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();
// routes
router
  .route("/products")
  .get(verifyUserAuth, getAllProducts)
  .post(verifyUserAuth, roleBasedaccess("admin"), createProducts);

router
  .route("/product/:id")
  .put(verifyUserAuth,roleBasedaccess('admin'),updateProduct)
  .delete(verifyUserAuth,roleBasedaccess('admin'), deleteProduct)
  .get(verifyUserAuth, getSingleProduct);

export default router;
