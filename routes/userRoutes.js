const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
} = require("../controllers/UserControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// routed

// GET USER
router.get("/getUser", authMiddleware, getUserController);

// Update USER
router.put("/updateUser", authMiddleware, updateUserController);

// Reset Password
router.post("/resetPassword", authMiddleware, resetPasswordController);

// Update Password
router.post("/updatePassword", authMiddleware, updatePasswordController);

// Delete User
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;
