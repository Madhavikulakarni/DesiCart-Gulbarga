import React from "react";
import "../componentStyles/Product.css";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useState } from "react";

function Product({ product }) {
  const [rating, setRating] = useState(0);
  const HandleRatingChange = (newRating) => {
    setRating(rating);
    console.log(`Rating changed to: ${newRating}`);
  };
  return (
    <Link to={`/product/${product._id}`} className="product_id">
      <div className="product-card">
        <img src={product.image[0].url} alt={product.name} />
        <div className="product-details">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">
            <strong>Price</strong>
            {product.price}/-
          </p>
          <div className="rating_container">
            <Rating
              value={product.ratings}
              onRatingChange={HandleRatingChange}
              disabled={true}
            />
          </div>
          <span className="productCardSpan">
            {product.numOfReviews}{" "}
            {product.numOfReviews === 1 ? "Review" : "Reviews"}
          </span>
          <button className="add-to-cart">View Details</button>
        </div>
      </div>
    </Link>
  );
}

export default Product;
