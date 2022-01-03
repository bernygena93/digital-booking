import style from "../styles/productDetail.module.css";
import Title from "./Title";
import Maps from "./Maps";

export default function ProductLocation({ product }) {
  const productLat = product.address ? parseFloat(product.address.latitude) : -34.606938029112975;
  const productLng = product.address ? parseFloat(product.address.longitude) : -58.3918721446864;

  return (
    <div className={style.productLocation}>
      <Title title={"¿Dónde vas a estar?"} />
      <p>
        {product.address && product.address.address + ", "}
        {product.city.name}, {product.city.country}
      </p>
      <Maps location={{ lat:productLat, lng: productLng }} />
    </div>
  );
}
