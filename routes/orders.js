// routes/orders.js
import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create a new order
router.post("/", auth, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId).populate("storeId");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalPrice = product.prices.default * quantity; // Adjust this logic based on product pricing

    const newOrder = new Order({
      userId: req.user.id,
      productId,
      storeId: product.storeId._id,
      quantity,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get orders by user
router.get("/user", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("productId")
      .populate("storeId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get orders by store owner
router.get("/store", auth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "storeId",
        match: { userId: req.user.id },
      })
      .populate("productId")
      .exec();

    const storeOrders = orders.filter((order) => order.storeId);
    res.json(storeOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
