/** @format */

import React from "react";
import styles from "../styles/confirmDelete.module.css";

export default function ConfirmDeleteImage({
  handleCancelClick,
  handleConfirmClick,
  image,
}) {

  return (
    <div className={styles.sectionContainer2}>
      <h3>¿Esta seguro que desea eliminar la imagen "{image.title}"?</h3>
      <div className={styles.divImg}>
        <img src={image.image} alt={image.title} />
      </div>
      <div className={styles.containerButtons}>
        <button className={styles.buttonBack} onClick={handleCancelClick}>
          Cancelar
        </button>
        <button className={styles.buttonOk} onClick={handleConfirmClick}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
