import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import storeRoutes from "./routes/store.js";
import authRoutes from "./routes/auth.js"; // Assuming you have user routes
import productRoutes from "./routes/productRoutes.js"; // Assuming you have user routes
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(express.json());

// Add CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api/store", storeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
