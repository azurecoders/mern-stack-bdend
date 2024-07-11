import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/add-product",
  auth,
  upload.array("images", 10),
  (req, res, next) => {
    console.log("Files: ", req.files); // Log files for debugging
    console.log("Body: ", req.body); // Log body for debugging
    next();
  },
  addProduct
);

router.route("/").get(auth, getProducts);

router.post("/test-upload", upload.array("images", 10), (req, res) => {
  console.log("Files: ", req.files);
  console.log("Body: ", req.body);
  res
    .status(200)
    .json({ message: "Files uploaded successfully", files: req.files });
});

router
  .route("/:id")
  .get(getProductById)
  .put(auth, upload.array("images", 10), updateProduct)
  .delete(auth, deleteProduct);

export default router;
