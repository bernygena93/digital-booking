/** @format */

import React, { useRef, useState, useEffect, useContext } from "react";
import Button from "../Button";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/yellow.css";
import styles from "../styles/search.module.css";
import Select from "./Select";
import { useHistory } from "react-router-dom";
import BookingContext from "../../context/BookingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOutsideSelect } from "../../hooks/useOutsideSelect";
import { useWindowResize } from "../../hooks/useWindowResize";

export default function Search({ cities }) {
  const history = useHistory();
  const context = useContext(BookingContext);
  const { visible, setVisible, ref, invisible } = useOutsideSelect();
  const { monthAmount } = useWindowResize(window.innerWidth);
  const [selectedCity, setSelectedCity] = useState(false);
  const [cityFilter, setCityFilter] = useState();
  const datePickerRef = useRef();
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
  const [buttonCalendar, setbuttonCalendar] = useState(
    styles.buttonCalendarMobile
  );
  const [date, setdate] = useState([]);
  const title = "Buscá ofertas en hoteles, casas y mucho más";
  const paragraph =
    "Con Digital Booking encontrá fácilmente tu alojamiento ideal al mejor precio.";

  useEffect(() => {
    setbuttonCalendar(styles.buttonCalendar);
  }, [monthAmount]);

  const formatDate = (date) => {
    return date.format("YYYY-MM-DD");
  };

  const handleFilter = (city) => {
    setCityFilter(city);
  };

  const handleClick = () => {
    const checkIn = date[0] ? formatDate(date[0]) : "";
    const checkOut = date[1] ? formatDate(date[1]) : "";
    context.datesPersistance(checkIn, checkOut);
    if (cityFilter) {
      const type = "city";
      context.filterType(`${cityFilter.name},${cityFilter.country}`);
      history.push(
        `/products/${type}/${cityFilter.name}/${cityFilter.id}?checkIn=${checkIn}&checkOut=${checkOut}`
      );
    } else {
      const type = "date";
      history.push(
        `/products/${type}/in/out?checkIn=${checkIn}&checkOut=${checkOut}`
      );
    }
  };
  return (
    <div className={styles.containerSearch} ref={ref}>
      <div className={styles.headerSearch}>
        <h1 className={styles.mainTitle}>{title}</h1>
        <p className={styles.pageDescription}>{paragraph}</p>
      </div>
      <div className={styles.options}>
        <Select
          list={cities}
          onFilter={handleFilter}
          visible={visible}
          setVisible={setVisible}
          placeholder="¿A donde Vamos?"
          iconLocationTrue
          selected={selectedCity}
          setSelected={setSelectedCity}
          invisible={invisible}
          relative={false}
        />
        <DatePicker
          ref={datePickerRef}
          minDate={new DateObject()}
          className="datepicker"
          inputClass={styles.button}
          value={date}
          render={(value, openCalendar) => {
            return (
              <button
                onClick={openCalendar}
                value={value}
                className={styles.inputCalendar}
              >
                <FontAwesomeIcon
                  icon={["far", "calendar-alt"]}
                  color="#fbc02d"
                />
                {!value[0] && "Check in "}
                {value[0]}-{!value[1] && " Check out"}
                {value[1]}
              </button>
            );
          }}
          calendarPosition="bottom"
          fixMainPosition
          onChange={setdate}
          range
          numberOfMonths={monthAmount}
          weekDays={weekDays}
        >
          <Button
            className={buttonCalendar}
            label="Aplicar"
            onClick={() => datePickerRef.current.closeCalendar()}
          />
          {monthAmount > 1 && <div className={styles.divider}></div>}
        </DatePicker>
        <Button
          label="Buscar"
          className={styles.buttonSearch}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
