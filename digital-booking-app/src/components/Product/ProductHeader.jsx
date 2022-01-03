/** @format */

import style from "../styles/productDetail.module.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";

export default function ProductHeader({ product }) {
  const [categoryName, setCategoryName] = useState()

  useEffect(() => {
    if(product.category.name === "Hoteles") {
        setCategoryName("HOTEL")
    } else if (product.category.name === "Hostels") {
        setCategoryName("HOSTEL")
    } else if (product.category.name === "Departamentos"){
        setCategoryName("DEPARTAMENTO")
    } else {
        setCategoryName("BED & BREAKFAST")
    }
}, [])

  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <div className={style.productHeader}>
      <div>
        <h3>{categoryName}</h3>
        <h2 id="product-detail-header">{product.name}</h2>
      </div>
      <div onClick={handleClick} className={style.arrowBack}>
        <FontAwesomeIcon icon={['fas', 'chevron-left']}/>
      </div>
    </div>
  );
}
