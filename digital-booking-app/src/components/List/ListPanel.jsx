/** @format */
import OptionList from "./OptionList";
import styles from "../styles/listPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ConfirmDelete from "../Product/ConfirmDelete";

export default function ListPanel({ product, data }) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [labelOption, setLabelOption] = useState({
    labelId: "Id",
    labelNameEmail: "",
    labelAddressHotel: "",
    labelCityCheckIn: "",
    labelCategoryCheckOut: "",
    labelRatingTime: "",
  });

  useEffect(() => {

    if (data === "booking") {
      setLabelOption({
        labelId: "Id",
        labelNameEmail: "Email",
        labelAddressHotel: "Alojamiento",
        labelCityCheckIn: "Check-In",
        labelCategoryCheckOut: "Check-Out",
        labelRatingTime: "Horario",
      });
      setLoading(false);
    } else {
      setLabelOption({
        labelId: "Id",
        labelNameEmail: "Nombre",
        labelAddressHotel: "Direccion",
        labelCityCheckIn: "Ciudad",
        labelCategoryCheckOut: "Categoria",
        labelRatingTime: "Rating",
      });
      setLoading(false);
    }
  }, [data]);

  const handleDelete = (product) => {
    setActive(true);
  };

  const handleCancelClick = () => {
    setActive(false);
  };

  const handleClickEdit = (id) => {
    history.push(`/admin-product/${id}`);
  };

  return (
    <>
      <div className={styles.containerCardList}>
        <h3 className={styles.titleCard}>
          {data === "booking" ? `Reserva # ${product.id}` : product.name}
        </h3>
        <div className={styles.divider}></div>
        <ul type="none">
          <OptionList
            info={product.id}
            label={labelOption.labelId}
            className={styles.optionsListOne}
          />
          <OptionList
            info={
              data === "booking"
                ? product.product?.name
                : product.address.address
            }
            label={labelOption.labelAddressHotel}
            className={styles.optionsListTwo}
          />
          <OptionList
            info={data === "booking" ? product.user?.email : product.name}
            label={labelOption.labelNameEmail}
            className={styles.optionsListTwo}
          />
          <OptionList
            info={
              data === "booking"
                ? product.checkInDate
                : `${product.city?.name}, ${product.city?.country}`
            }
            label={labelOption.labelCityCheckIn}
            className={styles.optionsListOne}
          />
          <OptionList
            info={
              data === "booking" ? product.checkOutDate : product.category?.name
            }
            label={labelOption.labelCategoryCheckOut}
            className={styles.optionsListTwo}
          />
          <OptionList
            info={
              data === "booking"
                ? product.checkInTime
                : `${product.averageRating}(${product.ratings?.length})`
            }
            label={labelOption.labelRatingTime}
            className={styles.optionsListOne}
          />
        </ul>
        <div className={styles.containerButton}>
          <button
            className={styles.updateButton}
            onClick={() => handleClickEdit(product.id)}
          >
            {" "}
            <FontAwesomeIcon icon={faEdit} />
            Editar
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            {" "}
            <FontAwesomeIcon icon={faTimes} />
            Eliminar
          </button>
        </div>
      </div>
      {active && (
        <>
          <div className={styles.overlay} id="overlay"></div>
          <ConfirmDelete
            product={product}
            data={data}
            handleCancelClick={handleCancelClick}
          />
        </>
      )}
    </>
  );
}
