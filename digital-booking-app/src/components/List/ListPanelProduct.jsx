/** @format */

import React, { useEffect, useState } from "react";
import styles from "../styles/listPanelProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import ConfirmDelete from "../Product/ConfirmDelete";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner";

export default function ListPanelProduct({ products, data, loading }) {
  const [idDelete, setIdDelete] = useState("");
  const [productList, setProductList] = useState([]);
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [productDelete, setProductDelete] = useState({});
  const [bookingData, setBookingData] = useState(false);
  const [buttonActive, setButtonActive] = useState();
  const [labelOption, setLabelOption] = useState({
    labelId: "Id",
    labelAddressName: "",
    labelNameEmail: "",
    labelAddressHotel: "",
    labelCityCheckIn: "",
    labelCategoryCheckOut: "",
    labelRatingTime: "",
  });

  useEffect(() => {
    if (products.length !== 0) {
      setProductList(products);
      setButtonActive(true);
    }
  }, [products, idDelete]);

  useEffect(() => {
    if (data === "booking") {
      setLabelOption({
        labelId: "Id",
        labelAddressHotel: "Alojamiento",
        labelNameEmail: "Email",
        labelCityCheckIn: "Check-In",
        labelCategoryCheckOut: "Check-Out",
        labelRatingTime: "Horario",
      });
      setBookingData(true);
    } else {
      setLabelOption({
        labelId: "Id",
        labelAddressHotel: "Dirección",
        labelNameEmail: "Nombre",
        labelCityCheckIn: "Ciudad",
        labelCategoryCheckOut: "Categoria",
        labelRatingTime: "Rating",
      });
      setBookingData(false);
    }
  }, [products]);

  useEffect(() => {
    if (products.length === 0 && data === "booking") {
      setButtonActive(false);
      let fillRows = [];
      for (let i = 0; i < 10; i++) {
        fillRows.push({
          id: "",
          user: {
            email: "",
          },
          checkInDate: "",
          checkOutDate: "",
          checkInTime: "",
        });
      }
      setProductList(fillRows);
    }
  }, [data, products]);

  const handleOpenPopUp = (product) => {
    setActive(true);
    setProductDelete(product);
  };
  const handleDelete = () => {
    console.log(idDelete);
    setIdDelete(productDelete.id);
    console.log(idDelete);
  };

  const handleCancelClick = () => {
    setActive(false);
  };

  const handleClickEdit = (id) => {
    history.push(`/admin-product/${id}`);
  };

  return (
    <>
      {loading ? (
        <div className={styles.containerSpinner}>
          {" "}
          <Spinner /> <h4>Cargando...</h4>{" "}
        </div>
      ) : (
        <>
          <div className={styles.productTable}>
            <div className={styles.headerTable}>{labelOption.labelId}</div>

            <div className={styles.headerTable}>
              {labelOption.labelNameEmail}
            </div>
            <div className={styles.headerTable}>
              {labelOption.labelCityCheckIn}
            </div>
            <div className={styles.headerTable}>
              {labelOption.labelAddressHotel}
            </div>
            <div className={styles.headerTable}>
              {labelOption.labelCategoryCheckOut}
            </div>
            <div className={styles.headerTable}>
              {labelOption.labelRatingTime}
            </div>
            <div className={styles.headerNameTable}></div>
            {productList.map((product, index) => (
              <>
                <div
                  className={styles.descriptionTable}
                  key={"0" + "-" + product.id + "-" + index}
                >
                  {product.id}
                </div>

                <div
                  className={styles.descriptionTable}
                  key={"1" + "-" + product.id + "-" + index}
                >
                  {bookingData ? product.user?.email : product.name}
                </div>
                <div
                  className={styles.descriptionTable}
                  key={"2" + "-" + product.id + "-" + index}
                >
                  {bookingData
                    ? product.checkInDate
                    : `${product.city?.name},
                    ${product.city?.country}`}
                </div>
                <div
                  className={styles.descriptionTable}
                  key={"3" + "-" + product.id + "-" + index}
                >
                  {bookingData
                    ? product.product?.name
                    : product.address.address}
                </div>

                <div
                  className={styles.descriptionTable}
                  key={"4" + "-" + product.id + "-" + index}
                >
                  {bookingData ? product.checkOutDate : product.category?.name}
                </div>
                <div
                  className={styles.descriptionTable}
                  key={"5" + "-" + product.id + "-" + index}
                >
                  {bookingData
                    ? product.checkInTime
                    : `${product.averageRating}(${product.ratings?.length})`}
                </div>
                {buttonActive ? (
                  <div
                    className={styles.descriptionNameTable}
                    key={"6" + "-" + product.id + "-" + index}
                  >
                    {data === "accommodation" && (
                      <button
                        className={styles.updateButton}
                        onClick={() => handleClickEdit(product.id)}
                        key={"button1" + product.id}
                      >
                        {/* <Link
                  to={"/administration-product/" + product.id}
                  className={styles.linkUpdateButton}
                > */}{" "}
                        <FontAwesomeIcon icon={faEdit} />
                        Editar
                        {/*  </Link> */}
                      </button>
                    )}
                    <button
                      className={styles.deleteButton}
                      key={"button2" + product.id + index}
                      onClick={() => handleOpenPopUp(product)}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faTimes}
                        key={"7" + "-" + product.id + "-" + index}
                      />
                    </button>
                  </div>
                ) : (
                  <div
                    className={styles.descriptionNameTable}
                    key={"fill" + product.id + index}
                  >
                    <div className={styles.fill}></div>
                  </div>
                )}
              </>
            ))}
          </div>
          {active && (
            <>
              <div className={styles.overlay} id="overlay"></div>
              <ConfirmDelete
                product={productDelete}
                data={data}
                handleCancelClick={handleCancelClick}
                handleDelete={handleDelete}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
