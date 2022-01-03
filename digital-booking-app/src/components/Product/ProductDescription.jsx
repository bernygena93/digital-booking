import style from "../styles/productDetail.module.css";
import React, { useState, useEffect } from "react";

export default function ProductDescription({ product }) {
  let [productArr, setProductArr] = useState([])

  useEffect(() => {
    setProductArr([product.description])
  }, [])

  useEffect(() => {
    if(productArr.length !== 0) {
      if (productArr[0].includes("\n")) {
        const array = productArr[0].split("\n");
        setProductArr(array)
      }
    }
  }, [productArr])
  
  return (
    <div className={style.productDescription}>
      <h2>Alojate en el lugar de tus sueños</h2>
      {productArr.map((p, i) => {
        return <p key={"description" + i}>{p}</p>
      } )}
      
    </div>
  );
}
