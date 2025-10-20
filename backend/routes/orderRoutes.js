import express from "express";
import { roleBasedaccess, verifyUserAuth } from "../middleware/userAuth.js";
import { allMyOrders, createOrder, deleteOrder, getAllOrders, getSingleOrder, updateOrderStatus } from "../controller/orderController.js";

const router = express.Router();
// routes
router.route("/new/order").post(verifyUserAuth, createOrder);

router.route("/admin/order/:id").get(verifyUserAuth, roleBasedaccess("admin"), getSingleOrder)
.put(updateOrderStatus)
.delete(verifyUserAuth, roleBasedaccess("admin"), deleteOrder)

router.route("/admin/orders").get(verifyUserAuth, roleBasedaccess("admin"), getAllOrders);
router.route("/orders/user").get(verifyUserAuth, allMyOrders);

export default router;
