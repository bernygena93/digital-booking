/** @format */

import style from "../styles/bookingComponents.module.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { createBooking } from "../../service/bookingService";
import { header } from "../../config/HeadersRequest";
import BookingContext from "../../context/BookingContext";
import { useContext, useEffect, useState } from "react";
import moment from "moment";

export default function ConfirmBooking({
  bookingData,
  handleCancelClick,
  product,
  dates,
}) {
  const context = useContext(BookingContext);
  const history = useHistory();
  const token = localStorage.getItem("Token");
  const [booking, setBooking] = useState({
    checkInTime: "",
    checkInDate: "",
    checkOutDate: "",
    product: {},
  });

  const { id } = useParams();

  useEffect(() => {
    const time = bookingData.checkInTime.split(" ");
    const checkInTime = time[0] + ":00";
    setBooking({
      checkInTime: checkInTime,
      checkInDate: moment(dates[0], "DD-MM-YY").format("YYYY-MM-DD"),
      checkOutDate: moment(dates[1], "DD-MM-YY").format("YYYY-MM-DD"),
      product: {
        id: product.id,
      },
      user: {
        id: context.userInfo?.id,
      },
    });
  }, []);

  const handleAcceptClick = () => {
    createBooking(booking, header(token))
      .then((response) => {
        history.push(`/booking/${id}/successfulBooking`);
      })
      .catch((e) => {
        history.push(`/booking/${id}/failedBooking`);
      });
  };

  return (
    <div className={style.sectionContainer}>
      <div className={style.confirmTable}>
        <table className={style.dataTable}>
          <tbody>
            <tr>
              <td>
                <h2 className={style.tableTitle}>Confirmación de reserva</h2>
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.bookingItemTitle} colSpan="3">
                Alojamiento
              </td>
              <td className={style.bookingItem} colSpan="1">
                {bookingData.accommodationName}
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.bookingItemTitle} colSpan="3">
                Dirección
              </td>
              <td className={style.bookingItem} colSpan="1">
                {bookingData.accommodationLocation}
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.bookingItemTitle} colSpan="3">
                Huésped
              </td>
              <td className={style.bookingItem} colSpan="1">
                {bookingData.name} {bookingData.lastName}
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.bookingItemTitle} colSpan="3">
                Hora de llegada
              </td>
              <td className={style.bookingItem} colSpan="1">
                {bookingData.checkInTime}
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <hr className={style.tableHr} />
              </td>
            </tr>
          </tbody>
        </table>
        <table className={style.datesTable}>
          <tbody>
            <tr className={style.tableRow}>
              <td className={style.checkIn}>
                <p className={style.checkInTitle}>Check-in</p>
                <p className={style.checkInDate}>{booking.checkInDate} </p>
              </td>
              <td className={style.arrowColumn}>
                <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                <FontAwesomeIcon icon={["fas", "chevron-right"]} />
              </td>
              <td className={style.checkOut}>
                <p className={style.checkOutTitle}>Check-out</p>
                <p className={style.checkOutDate}>{booking.checkOutDate}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={style.confirmationQ}>
          <div className={style.confirmationTitle} colSpan="2">
            <h3>¿Desea confirmar su reserva?</h3>
          </div>
          <div className={style.confirmButtons}>
            <div className={style.cancelButtonCol}>
              <button
                className={style.cancelButton}
                onClick={handleCancelClick}
              >
                Cancelar
              </button>
            </div>
            <div className={style.acceptButtonCol}>
              <button
                className={style.acceptButton}
                onClick={handleAcceptClick}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
