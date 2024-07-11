import express from "express";
import {
  signup,
  login,
  updateProfile,
  updatePassword,
} from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js"; // Middleware to protect routes
import upload from "../middleware/upload.js"; // Import the upload middleware

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put(
  "/profile",
  authMiddleware,
  upload.single("profilePic"),
  updateProfile
); // Protected route with file upload
router.put("/password", authMiddleware, updatePassword); // Protected route

export default router;
