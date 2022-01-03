/** @format */

import React, { useState, useEffect } from "react";
import ProductHeader from "../components/Product/ProductHeader";
import ProductInfo from "../components/Product/ProductInfo";
import ProductGallery from "../components/Product/ProductGallery";
import ProductDescription from "../components/Product/ProductDescription";
import ProductFeatures from "../components/Product/ProductFeatures";
import ProductLocation from "../components/Product/ProductLocation";
import ProductPolicy from "../components/Product/ProductPolicy";
import ProductCalendar from "../components/Product/ProductCalendar";
import productData from "../json/product.json";
import { useParams } from "react-router-dom";
import { getProductById } from "../service/productService";
import styles from "./styles/home.module.css";
import Spinner from "../components/Spinner";
import { useWindowResize } from "../hooks/useWindowResize";

export default function ProductDetail() {
  const { viewType, monthAmount } = useWindowResize(window.innerWidth);
  const [product, setProduct] = useState(productData);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchApi() {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct.data);
      setLoaded(true);
    }
    fetchApi();
  }, [id]);

  return (
    <>
      {!loaded ? (
        <div className={styles.spinnerContainer}>
          <Spinner /> Cargando...
        </div>
      ) : (
        <div>
          <ProductHeader product={product}></ProductHeader>
          <ProductInfo product={product}></ProductInfo>
          <ProductGallery product={product} viewType={viewType}></ProductGallery>
          <ProductDescription product={product}></ProductDescription>
          <ProductFeatures product={product}></ProductFeatures>
          <ProductCalendar product={product} monthAmount={monthAmount}></ProductCalendar>
          <ProductLocation product={product}></ProductLocation>
          <ProductPolicy product={product}></ProductPolicy>
        </div>
      )}
    </>
  );
}
