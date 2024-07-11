import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  price: { type: Number, required: true },
});

const colorSchema = new mongoose.Schema({
  color: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  sizes: [sizeSchema],
  colors: [colorSchema],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
