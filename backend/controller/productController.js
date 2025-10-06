import Product from "../models/productModel.js";
import HandleError from "../middleware/handleError.js";

// creating Products
export const createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// Get all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

// Update Product
export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

// Accessing Single product
export const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id); // ✅ Find product by ID

  if (!product) {
    // ❌ If not found
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    // ✅ If found
    success: true,
    product,
  });
};

export const func1Single = (req, res) => {
  res.status(200).json({
    message: "Single Products",
  });
};
