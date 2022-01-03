import style from "../styles/productDetail.module.css";
import RatingStars from "../RatingStars";
import React, { useState, useEffect } from "react";

export default function ProductRating({ product }) {
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("")

  useEffect(() => {
    setRating(product.averageRating)
    
  }, [])

  useEffect(() => {
    if ( 0 < rating && rating < 4) {
      setRatingText("Malo")
    } else if (3 < rating && rating < 6) {
      setRatingText("Regular")
    } else if (5 < rating && rating < 8) {
      setRatingText("Bueno")
    } else if (rating === 8) {
      setRatingText("Muy bueno")
    } else if (8 < rating) {
      setRatingText("Excelente")
    }
  }, [rating])
  

  return (
    
    <div className={style.productRating}>
      <div className={style.productRatingSideOne}>
        <p>{ratingText}</p>
        <RatingStars rating={rating}/>
      </div>
      <div className={style.productNumberRating}>
        <p>{product.averageRating}</p>
      </div>
    </div>
  );
}
