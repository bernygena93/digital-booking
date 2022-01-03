/** @format */

import React, { useRef, useState, useContext, useEffect } from "react";
import "../styles/product.css";
import Button from "../Button";
import styles from "../styles/productCalendar.module.css";
import { Calendar, DateObject, getAllDatesInRange, } from "react-multi-date-picker";
import BookingContext from "../../context/BookingContext";
import { useHistory, useLocation } from "react-router";
import moment from "moment";
import "moment/locale/es";

export default function ProductCalendar({ product, monthAmount }) {
  /*const { monthAmount } = useWindowResize(window.innerWidth);*/
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const [datesBooked, setDatesBooked] = useState();
  const datePickerRef = useRef();
  const [date, setdate] = useState([]);
  const context = useContext(BookingContext);
  const history = useHistory();
  const { pathname } = useLocation();

  const handleBooking = () => {
    context.currentLocation(pathname);
    context.user
      ? history.push(`/booking/${product.id}`)
      : history.push("/login");
  };

  useEffect(() => {
    let arrayDates = [];
    product.bookings.map((booking) => {
      let dates = rangeDate(
        moment(booking.checkInDate).format("YYYY/MM/DD"),
        moment(booking.checkOutDate).format("YYYY/MM/DD")
      );
      dates.map((date) => arrayDates.push(date));
      setDatesBooked(arrayDates);
    });
  }, []);

  const rangeDate = (dateIn, dateOut) => {
    const dateInitials = new DateObject(dateIn);
    const dateFinals = new DateObject(dateOut);
    const datesInRange = getAllDatesInRange([dateInitials, dateFinals]);
    return datesInRange;
  };

  return (
    <div className={styles.divCalendar}>
      <h2>Fechas disponibles</h2>
      <div className={styles.divCalendarAndButton}>
        <Calendar
          ref={datePickerRef}
          className="calendar"
          value={date}
          minDate={new DateObject()}
          onChange={setdate}
          range
          months={months}
          numberOfMonths={monthAmount}
          weekDays={weekDays}
          zIndex="1"
          mapDays={({ date }) => {
            try{
              let isBooked = datesBooked.find((dateBooked) => {
                if (
                  dateBooked.day === date.day &&
                  dateBooked.year === date.year &&
                  dateBooked.month.name === date.month.name
                ) {
                  return true;
                } else {
                  return false;
                }
              });
              if (isBooked)
                return {
                  disabled: true,
                  style: { color: "#ccc" },
                };
            }catch(e){
              console.log(e);
            }
          }}
        ></Calendar>
        <div className={styles.divButtonCalendar}>
          <h4>Agregá tus fechas de viaje para obtener precios exactos</h4>
          <Button
            className={styles.buttonCalendar}
            onClick={handleBooking}
            label="Iniciar reserva"
          ></Button>
        </div>
      </div>
    </div>
  );
}
