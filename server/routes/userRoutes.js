const express = require("express");
const router = express.Router();

const {registerUser,userLogin,userLogout,userDetails, userUpdate, updateUserPassword, forgotPassword, resetPassword, getAllUsers, updateUserRole, deleteUser} = require("../controllers/userControllers");
const {isAuthenticatedUser,authorizeRole} = require("../middleware/authUser")



router.route("/register").post(registerUser);   // ADMIN ROUTE
router.route("/login").post(userLogin);        // ADMIN ROUTE
router.route("/logout").post(userLogout);      // ADMIN ROUTE
router.route("/me").get(isAuthenticatedUser,userDetails);   // ADMIN ROUTE
router.route("/profile-update/:id").put(isAuthenticatedUser,userUpdate);
router.route("/password-update").put(isAuthenticatedUser,updateUserPassword);
router.route("/reset-password").post(forgotPassword);
router.route("/new-password/:token").put(resetPassword);
router.route("/getAllUsers").get(isAuthenticatedUser,authorizeRole("super"),getAllUsers); // GET ALL USER ADMIN ROUTE
router.route("/updateUserRole/:id").put(isAuthenticatedUser,authorizeRole("super"),updateUserRole); // ADMIN ROUTE
router.route("/user-delete/:id").delete(isAuthenticatedUser,authorizeRole("super"),deleteUser);


module.exports = router



