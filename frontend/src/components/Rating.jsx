import React, { useState } from "react";
import "../componentStyles/Rating.css";

function Rating({ value, onRatingChange, disabled }) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value || 0);

  // Handle star hover
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoveredRating(rating);
    }
  };

  // Mouse leave
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoveredRating(0);
    }
  };

  // Handle star click
  const handleClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);
      if (onRatingChange) onRatingChange(rating);
    }
  };

  // Generate stars dynamically
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || selectedRating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? "filled" : "empty"}`}
          onMouseEnter={() => handleMouseEnter}
          onMouseLeave={()=>handleMouseLeave}
          onClick={() => handleClick}
          style={{
            pointerEvents: disabled ? "none" : "auto",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return <div className="rating">{generateStars()}</div>;
}

export default Rating;
