import Product from "../models/Product.js";

// @desc    Add new product
// @route   POST /api/products
// @access  Private
const addProduct = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);
    const {
      title,
      description,
      price,
      category,
      subcategory,
      sizes,
      colors,
      user,
    } = req.body;

    const newProduct = {
      title,
      description,
      price,
      images,
      category,
      subcategory,
      sizes: JSON.parse(sizes),
      colors: JSON.parse(colors),
      user,
    };

    // Save product to database
    const newProductMain = new Product(newProduct);
    await newProductMain.save();
    res.status(201).json(newProductMain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  const { title, description, price, category, subcategory, sizes, colors } =
    req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = title || product.title;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.subcategory = subcategory || product.subcategory;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.images = req.files.map((file) => file.path) || product.images;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
