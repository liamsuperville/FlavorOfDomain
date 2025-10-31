import { useState } from 'react';

function StarRating({ rating = 0, onChange, readOnly = false }) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleStarClick = (starRating) => {
    if (readOnly) return;
    onChange(starRating);
  };
  
  const handleStarHover = (starRating) => {
    if (readOnly) return;
    setHoverRating(starRating);
  };
  
  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };
  
  return (
    <div 
      className="star-rating" 
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`star ${
            star <= (hoverRating || rating) ? 'filled' : 'empty'
          }`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          style={{ cursor: readOnly ? 'default' : 'pointer' }}
        >
          ★
        </span>
      ))}
      {rating > 0 && <span className="recipe-rating-value">({rating})</span>}
    </div>
  );
}

export default StarRating;