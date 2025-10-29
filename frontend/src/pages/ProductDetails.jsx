import React, { useEffect, useState } from "react";
import "../pageStyles/ProductDetails.css";
import PageTitle from "../componentStyles/PageTitle";
import Navbar from "../components/Navbar";
// import Rating from "@mui/material/Rating";
import Rating from "../components/Rating";
import Footer from "../components/Footer";
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";
import { getProductDetails } from "../features/products/productSlice";
import { removeErrors } from "../features/products/productSlice";
function ProductDetails() {
  const [userRating, setUserRating] = useState(0);

  const HandleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  const {loading,error,product}=useSelector((state)=>state.product)
  const dispatch=useDispatch()
  const {id}=useParams()
  useEffect(()=>{
    if(id){
 dispatch(getProductDetails(id));
    }
    return ()=>{
      dispatch(removeErrors())
    }
  },[])
  
  return (
    <>
      <PageTitle title="Product Details - DesiCart Gulbarga Site" />
      <Navbar />
      <div className="product-details-container">
        <div className="product-detail-container">
          <div className="product-image-container">
            <img src="" alt="Product title" className="product-detail-image" />
          </div>

          <div className="product-info">
            <p className="product-description">Product Description</p>
            <p className="product-price">
              <strong>Price: </strong> 999/-
            </p>

            <div className="product-rating">
              <Rating value={1} disabled />
              <span className="productCardSpan">(1 Review)</span>
            </div>

            <div className="stock-status">
              <span className="in-stock">In Stock (8 avialable)</span>
            </div>

            <div className="quantity-controls">
              <span className="quantity-label">Quantity:</span>
              <button className="quantity-button">-</button>
              <input
                type="text"
                value={1}
                className="quantity-value"
                readOnly
              />
              <button className="quantity-button">+</button>
            </div>

            <button className="add-to-cart-btn">Add to Cart</button>

            <form className="review-form">
              <h3>Write a Review</h3>
              <Rating
                value={0}
                disabled={false}
                onRatingChange={HandleRatingChange}
              />
              <textarea
                className="review-input"
                placeholder="Write your review here..."
              ></textarea>
              <button type="submit" className="submit-review-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>

        <div className="reviews-container">
          <h3>Customer Reviews</h3>
          <div className="reviews-section">
            <div className="review-item">
              <div className="review-header">
                <Rating value={1} disabled />
              </div>
              <p className="review-comment">Review Comment</p>
              <p className="review-name">By Madhavi</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
