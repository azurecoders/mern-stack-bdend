import express from "express";
import Store from "../models/Store.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create Store Route
router.post(
  "/create",
  authMiddleware,
  upload.fields([{ name: "profileImage" }, { name: "coverImage" }]),
  async (req, res) => {
    try {
      const { storeName, address, description, level, isVerified } = req.body;

      const existingStore = await Store.findOne({ userId: req.user.id });
      if (existingStore) {
        return res.status(400).json({ message: "User already has a store" });
      }

      const profileImage = req.files["profileImage"][0].path;
      const coverImage = req.files["coverImage"][0].path;

      const store = new Store({
        userId: req.user.id,
        storeName,
        address,
        description,
        profileImage,
        coverImage,
        level: level || 1,
        isVerified: isVerified || false,
      });

      await store.save();
      res.status(201).json({ message: "Store created successfully", store });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Fetch Store Route
router.get("/fetch", authMiddleware, async (req, res) => {
  try {
    const store = await Store.findOne({ userId: req.user.id });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Store Route
router.put(
  "/update",
  authMiddleware,
  upload.fields([{ name: "profileImage" }, { name: "coverImage" }]),
  async (req, res) => {
    try {
      const { storeName, description } = req.body;
      const updates = { storeName, description };

      if (req.files["profileImage"]) {
        updates.profileImage = req.files["profileImage"][0].path;
      }

      if (req.files["coverImage"]) {
        updates.coverImage = req.files["coverImage"][0].path;
      }

      const store = await Store.findOneAndUpdate(
        { userId: req.user.id },
        updates,
        { new: true }
      );

      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }

      res.status(200).json({ message: "Store updated successfully", store });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
