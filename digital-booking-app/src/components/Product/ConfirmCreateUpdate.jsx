/** @format */

import React from "react";
import styles from "../styles/confirmDelete.module.css";

export default function ConfirmDelete({
  handleCancelClick,
  handleConfirmClick,
  formData,
}) {

  return (
    <div className={styles.sectionContainer2}>
      <h3>¿Esta seguro que desea enviar el formulario?</h3>

      <div className={styles.containerButtons}>
        <button className={styles.buttonBack} onClick={handleCancelClick}>
          Cancelar
        </button>
        <button className={styles.buttonOk} onClick={handleConfirmClick}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
