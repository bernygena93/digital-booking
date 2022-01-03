import style from "../styles/productDetail.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductRating from "./ProductRating";

export default function ProductInfo({ product }) {
  return (
    <div className={style.productInfoBlock}>
      <div className={style.productLocationHeader}>
        <FontAwesomeIcon icon={['fas', 'map-marker-alt' ]}/>
        <p>
          {product.city.name}, {product.city.country}
        </p>
        {/* <p>{(product.relativeLocation)}</p> */}
      </div>

      <ProductRating product={product}/>
    </div>
  );
}
