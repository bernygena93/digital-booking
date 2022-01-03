/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ListProduct from "../components/List/ListProduct";
import Search from "../components/Search/Search";
import Spinner from "../components/Spinner";
import BookingContext from "../context/BookingContext";
import { useOutsideSelect } from "../hooks/useOutsideSelect";
import { getAllCities } from "../service/cityService";
import {
  getProductByCategory,
  getProductByDateAndCity,
} from "../service/productService";
import styles from "./styles/home.module.css";

export default function FilteredProductPage() {
  const { ref } = useOutsideSelect();
  const context = useContext(BookingContext);
  const { filter, id } = useParams();
  const [listProducts, setListProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [citiesList, setCitiesList] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  useEffect(() => {
    async function fetchApi() {
      setLoading(true);
      const cities = await getAllCities();
      const checkIn = query.get("checkIn");
      const checkOut = query.get("checkOut");
      setCitiesList(cities.data);
      try {
        if (filter === "category") {
          const productsCategory = await getProductByCategory(id);
          setListProducts(productsCategory.data);
          setLoading(false);
        } else if (filter === "date") {
          const productsDate = await getProductByDateAndCity(
            checkIn,
            checkOut,
            ""
          );
          setListProducts(productsDate.data);
          setLoading(false);
        } else if (filter === "city" && checkIn && checkOut) {
          const productsDateAndCity = await getProductByDateAndCity(
            checkIn,
            checkOut,
            id
          );
          setListProducts(productsDateAndCity.data);
          setLoading(false);
        } else {
          const productsCity = await getProductByDateAndCity(
            checkIn,
            checkOut,
            id
          );
          setListProducts(productsCity.data);
          setLoading(false);
        }
      } catch (error) {
        setListProducts([]);
        setLoading(false);
      }
    }
    fetchApi();
  }, [context.filter]);

  return (
    <div className={styles.containerFilteredProducts} ref={ref}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spinner /> Cargando...
        </div>
      ) : (
        <>
          <Search cities={citiesList} />
          {listProducts[0] ? (
            <ListProduct products={listProducts} title={context.filter} />
          ) : (
            <div className={styles.resultsNotFoundMessage}>
              <p>No se encontraron resultados.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
