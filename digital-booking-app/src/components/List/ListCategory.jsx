/** @format */

import React from "react";
import styles from "../styles/list.module.css";
import Card from "../Card/Card";

export default function ListCategory({ categories, productsFilter, myref }) {

  return (
    <div className={styles.searchByContainer} ref={myref}>
      <h2 className={styles.searchByCategoryTitle}>
        Buscar por tipo de alojamiento
      </h2>
      <div className={styles.containerCategories}>
        {categories.map((category, index) => (
          <Card
            key={category.name + index}
            product={category}
            category="true"
            productsFilter={productsFilter}
          />
        ))}
      </div>
    </div>
  );
}
