/** @format */

import React, { useContext } from "react";
import Button from "../Button";
import Image from "../Image";
import styles from "../styles/card.module.css";
import { useHistory } from "react-router-dom";
import BookingContext from "../../context/BookingContext";
import CardBody from "./CardBody";

export default function Card({ product, category}) {
  const viewCategory = category;
  const history = useHistory();
  const nameParam = encodeURIComponent(product.name.replace(/ /g, "-"));
  const context = useContext(BookingContext);

  const handleClick = () => {
    history.push(`/product/${product.id}/${nameParam}`);
  };
  const filterClick = () => {
    const type = "category";
    context.filterType(product.name);
    history.push(`/products/${type}/${product.name}/${product.id}`);
  };
  return (
    <>
      {viewCategory ? (
        <div
          id={product.name}
          className={styles.containerCategory}
          onClick={filterClick}
        >
          <div className={styles.imgCategory}>
            <Image img={product.urlImage} />
          </div>

          <div className={styles.titleCategory}>
            <h2>{product.name}</h2>
            <h3>{product.totalProducts} alojamientos</h3>
          </div>
        </div>
      ) : (
        <div className={styles.containerCard}>
          <div className={styles.imgCard}>
            <Image img={product.images[0]?.image} />
          </div>

          <div className={styles.cardBodyAndButton}>
            <CardBody product={product} />
            <Button
              label="Ver Más"
              className={styles.cardButton}
              onClick={handleClick}
              id={product.name + product.id}
            />
          </div>
        </div>
      )}
    </>
  );
}
