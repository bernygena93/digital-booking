/** @format */

import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { deleteBookingById } from "../../service/bookingService";
import { deleteProductById } from "../../service/productService";
import styles from "../styles/confirmDelete.module.css";
import { header } from "../../config/HeadersRequest";

export default function ConfirmDelete({
  product,
  data,
  handleCancelClick,
  handleDelete,
}) {
  const token = localStorage.getItem("Token");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (data === "accommodation") {
      setMessage(`el alojamiento "${product.name}"`);
    } else {
      setMessage("la reserva");
    }
  }, [data]);

  const handleConfirmDelete = (id) => {
    handleCancelClick();
    if (data === "booking") {
      deleteBookingById(id, header(token));
    } else {
      deleteProductById(id, header(token));
    }
    handleDelete();
  };

  return (
    <div className={styles.sectionContainer}>
      <h3>
        ¿Esta seguro que desea eliminar {message} con id{" "}
        <span>{product.id}</span>?
      </h3>
      <div className={styles.containerButtons}>
        <button className={styles.buttonBack} onClick={handleCancelClick}>
          Cancelar
        </button>
        <button
          className={styles.buttonOk}
          onClick={() => handleConfirmDelete(product.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
