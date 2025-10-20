import express from "express";
import {
  deleteUser,
  getSingleUser,
  getUserDetails,
  getUsersList,
  loginUser,
  logout,
  registerUser,
  requestPasswordReset,
  resetPassword,
  updateProfile,
  updateUserPassword,
  updateUserRole,
} from "../controller/userController.js";
import {roleBasedaccess, verifyUserAuth} from "../middleware/userAuth.js"
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/password/forgot").post(requestPasswordReset);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").post(verifyUserAuth,getUserDetails);
router.route("/password/update").post(verifyUserAuth,updateUserPassword);
router.route("/profile/update").post(verifyUserAuth,updateProfile);
router.route("/admin/users").get(verifyUserAuth,roleBasedaccess("admin"),getUsersList);
router.route("/admin/user/:id").get(verifyUserAuth,roleBasedaccess("admin"),getSingleUser)
.put(verifyUserAuth,roleBasedaccess("admin"),updateUserRole)
.delete(verifyUserAuth,roleBasedaccess("admin"),deleteUser);
export default router;

