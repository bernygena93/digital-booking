/** @format */

import React, { useState, useEffect } from "react";
import Search from "../components/Search/Search";
import ListCategory from "../components/List/ListCategory";
import { getAllCategories } from "../service/categoryService";
import { getAllCities } from "../service/cityService";
import { getAllProducts } from "../service/productService";
import styles from "./styles/home.module.css";
import Spinner from "../components/Spinner";
import ListProduct from "../components/List/ListProduct";
import { useOutsideSelect } from "../hooks/useOutsideSelect";

export default function Home() {
  const { ref } = useOutsideSelect();
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApi() {
      const categories = await getAllCategories();
      setCategoriesList(categories.data);
      const products = await getAllProducts();
      setProductsList(products.data);
      const cities = await getAllCities();
      setCitiesList(cities.data);
      setLoading(false);
    }
    fetchApi();
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spinner /> Cargando...
        </div>
      ) : (
        <>
          <Search cities={citiesList} />
          <ListCategory categories={categoriesList} myref={ref} />
          <ListProduct
            products={productsList}
            title={"Recomendaciones"}
            myref={ref}
          />
        </>
      )}
    </>
  );
}
