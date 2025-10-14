import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
// creating Products

// http://localhost:8000/api/v1/products?keyword=top

export const createProducts = handleAsyncError(async (req, res, next) => {
  req.body.user=req.user.id
  console.log(req.user)
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 2
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()  
    .filter();

    // getting filtered query before pagination
    const filteredQuery=apiFeatures.query.clone()
    const productCount=await filteredQuery.countDocuments()
    // console.log(productCount)

    // calculate total pages based on filtered query
    const totalPages=Math.ceil(productCount/resultPerPage)
    // console.log(totalPages)
    const page=Number(req.query.page) || 1

    if(page>totalPages && productCount>0){
      return next(new HandleError("This page doesn't exist",404))
    }

// Apply pagination
apiFeatures.pagination(resultPerPage)
  const products = await apiFeatures.query;

  if(!products || products.length===0){
    return next(new HandleError("No Product Found",404))
  }


  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    totalPages,
    currentPage:page
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
