import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
// creating Products

// http://localhost:8000/api/v1/products?keyword=top

export const createProducts = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  console.log(req.user);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 2;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

  // getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();
  // console.log(productCount)

  // calculate total pages based on filtered query
  const totalPages = Math.ceil(productCount / resultPerPage);
  // console.log(totalPages)
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This page doesn't exist", 404));
  }

  // Apply pagination
  apiFeatures.pagination(resultPerPage);
  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No Product Found", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    totalPages,
    currentPage: page,
  });
});

// Update Product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Accessing Single product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id); // ✅ Find product by ID

  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Creating, and updating review
export const createProductReview = handleAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const reviewExists = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (reviewExists) {
    // Update existing review
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    // Add new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Calculate average rating
  let totalRating = 0;
  product.reviews.forEach((rev) => {
    totalRating += rev.rating;
  });
  product.ratings = totalRating / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
});

// Getting reviws
export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Deleting reviews
export const deleteReview = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let sum = 0;
  reviews.forEach((rev) => {
    sum += rev.rating;
  });
  const ratings = reviews.length === 0 ? 0 : sum / reviews.length;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

// Admin - Getting all products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find(); 
  res.status(200).json({
    success: true,
    products,
  });
});
