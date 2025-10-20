import express from "express";
import {
  createProductReview,
  createProducts,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getProductReviews,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
import { roleBasedaccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();
// routes
router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(verifyUserAuth, roleBasedaccess("admin"), getAdminProducts);

router
  .route("/admin/product/create")
  .post(verifyUserAuth, roleBasedaccess("admin"), createProducts);

router
  .route("/admin/product/:id")
  .put(verifyUserAuth, roleBasedaccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedaccess("admin"), deleteProduct);

router.route("/product/:id").get(getSingleProduct);

router.route("/review").put(verifyUserAuth,createProductReview);
router.route("/reviews").get(getProductReviews).delete(verifyUserAuth, deleteReview);

export default router; 
