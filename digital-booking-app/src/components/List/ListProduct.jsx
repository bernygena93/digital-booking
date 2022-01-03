/** @format */

import React, { useState, useRef } from "react";
import Button from "../Button";
import Card from "../Card/Card";
import styles from "../styles/list.module.css";

export default function ListProduct({ products, title, myref }) {
  const productsQuantity = products.length;
  const productsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productsQuantity / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  //Logic for handling clicks on page numbers or arrows
  const handleClickPageNumber = (number) => {
    setCurrentPage(number);
  };

  const handleClickArrowPage = (state) => {
    handleScroll()
    if (state === "prev") {
      return currentPage === pageNumbers[0]
        ? ""
        : setCurrentPage(currentPage - 1);
    } else {
      return currentPage === pageNumbers.length
        ? ""
        : setCurrentPage(currentPage + 1);
    }
  };

  //Logic for disabling styles on prev or next page
  const classNameNextDisabled =
    currentPage < pageNumbers.length ? "" : styles.arrowDisabled;
  const classNamePrevDisabled =
    currentPage > pageNumbers[0] ? "" : styles.arrowDisabled;

  //Logic for scrolling to top of the container
  const myRef = useRef(null);
  const handleScroll = () => myRef.current.scrollIntoView();

  const handleNumberClassName = (number) => {
    if(number === currentPage) {
      return styles.activePageNumber
    } else if (number === currentPage + 1 || number === currentPage - 1 ) {
      return `${styles.pageNumber}, ${styles.pageNumberMobile}`
    } else {
      return styles.pageNumber
    }
  }

  
  return (
    <section className={styles.recommended} ref={myRef}>
      <div
        className={styles.recommendedContainer}
        id="recommendedContainer"
        ref={myref}
      >
        <h2 className={styles.productTitle}>{title}</h2>
        <div className={styles.containerList}>
          {currentProducts.map((product, index) => (
            <Card key={product.name + index} product={product} />
          ))}
        </div>
        <div className={styles.pageNumbers}>
          <Button
            className={`${styles.arrowPage} ${classNamePrevDisabled}`}
            onClick={() => handleClickArrowPage("prev")}
            label="<"
          />
          {/*           <li className={classNamePrevDisabled} onClick={()=>handleClickArrowPage("prev")}>prev</li> */}
          {/*           {currentPage > pageNumbers[0] && <li>prev</li>} */}
          {pageNumbers.map((number, index) => (
            <Button
              key={number + index}
              className={handleNumberClassName(number)}
              onClick={() => {
                handleClickPageNumber(number);
                handleScroll();
              }}
              label={number}
            />
          ))}
          <Button
            className={`${styles.arrowPage} ${classNameNextDisabled}`}
            onClick={() => handleClickArrowPage("next")}
            label=">"
          />
          {/*           <li className={classNameNextDisabled} onClick={()=>handleClickArrowPage("next")}>next</li> */}
          {/*           {currentPage < pageNumbers.length && <li>next</li>} */}
        </div>
      </div>
    </section>
  );
}
