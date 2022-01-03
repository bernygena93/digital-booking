/** @format */

import ProductHeader from "../components/Product/ProductHeader";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { getProductById } from "../service/productService";
import React, { useRef, useState, useEffect, useContext } from "react";
import style from "./styles/booking.module.css";
import {
  Calendar,
  DateObject,
  getAllDatesInRange,
} from "react-multi-date-picker";
import ProductPolicy from "../components/Product/ProductPolicy";
import Image from "../components/Image";
import moment from "moment";
import "moment/locale/es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmBooking from "../components/Booking/ConfirmBooking";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BookingContext from "../context/BookingContext";
import { useWindowResize } from "../hooks/useWindowResize";
import RatingStars from "../components/RatingStars";

export default function Booking() {
  const [checkInFormat, setCheckInFormat] = useState([]);
  const { monthAmount } = useWindowResize(window.innerWidth);
  const context = useContext(BookingContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const [datesBooked, setDatesBooked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
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
  const dateCalendarRef = useRef();
  const calendarContainerRef = useRef();
  const [date, setdate] = useState([]);
  const [calendarError, setCalendarError] = useState(false);
  const [active, setActive] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    lastName: "",
    email: "",
    city: "",
    checkInTime: "",
    checkIn: "",
    checkOut: "",
    accommodationName: "",
    accommodationLocation: "",
  });
  const { id } = useParams();

  const asignDates = (productBookings) => {
    let arrayDates = [];
    productBookings.forEach((booking) => {
      let dates = rangeDate(
        moment(booking.checkInDate).format("YYYY/MM/DD"),
        moment(booking.checkOutDate).format("YYYY/MM/DD")
      );
      dates.forEach((date) => arrayDates.push(date));
      setDatesBooked(arrayDates);
    });
  };

  useEffect(() => {
    const login = localStorage.getItem("Login");
    if (!login) {
      context.currentLocation(pathname);
      history.push("/login");
    }
  }, [pathname, context, history]);

  useEffect(() => {
    async function fetchApi() {
      const fetchedProduct = await getProductById(id);
      await setProduct(fetchedProduct.data);
      setLoading(true);
      await asignDates(fetchedProduct.data.bookings);
      await setBookingData({
        ...bookingData,
        accommodationName: fetchedProduct.data.name,
        accommodationLocation: fetchedProduct.data.address
          ? fetchedProduct.data.address.address
          : `${fetchedProduct.data.city.name}, ${fetchedProduct.data.city.country}`,
      });
    }
    fetchApi();
  }, [date, id]);

  const rangeDate = (dateIn, dateOut) => {
    const dateInitials = new DateObject(dateIn);
    const dateFinals = new DateObject(dateOut);
    const datesInRange = getAllDatesInRange([dateInitials, dateFinals]);
    return datesInRange;
  };

  const optionList = () => {
    const optionList = [];
    for (let time = 1; time < 25; time++) {
      time < 10 || (time > 12 && time < 22)
        ? optionList.push(
            <option key={time} value={`0${time > 12 ? time - 12 : time}:00`}>
              {`0${time > 12 ? time - 12 : time}:00`}{" "}
              {time / 12 < 1 ? "AM" : "PM"}
            </option>
          )
        : optionList.push(
            <option key={time} value={`${time > 12 ? time - 12 : time}:00`}>
              {`${time > 12 ? time - 12 : time}:00`}{" "}
              {time / 12 < 1 || time === 24 ? "AM" : "PM"}
            </option>
          );
    }
    return optionList;
  };

  useEffect(() => {
    if (date[0] && date[1]) {
      let cin = `${date[0].day}-${date[0].month.number}-${date[0].year}`;
      let cout = `${date[1].day}-${date[1].month.number}-${date[1].year}`;

      setCheckInFormat([cin, cout]);

    }
  }, [date]);

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [`${e.target.name}`]: e.target.value,
    });
  };

  const handleClick = (e) => {
    if (!date[0] || !date[1]) {
      setCalendarError(true);
      calendarContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      setActive(true);
      setOverlayActive(true);
    }
  };

  const handleCancelClick = (e) => {
    setOverlayActive(false);
    setActive(false);
  };

  /* VALIDATION */
  const schema = yup.object().shape({
    name: yup.string().required("El nombre es requerido"),
    lastName: yup.string().required("El apellido es requerido"),
    email: yup
      .string()
      .email("Debe ser un email válido")
      .required("El email es requerido"),
    city: yup.string().required("La ciudad es requerida"),
    checkInTime: yup
      .string()
      .required()
      .matches(/[0-9]/, "Seleccioná un horario de llegada"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <>
      {" "}
      {!loading ? (
        <h2>Cargando...</h2>
      ) : (
        <>
          <div>
            <ProductHeader product={product}></ProductHeader>
          </div>
          <form
            className={style.formBooking}
            onSubmit={handleSubmit(handleClick)}
          >
            <div className={style.container}>
              <div className={style.divFormCalendarHour}>
                <div className={style.containerForm}>
                  <h2 className={style.h2Form}> Completá tus datos </h2>
                  <div className={style.coreData}>
                    <div className={style.divNameLastName}>
                      <label htmlFor="name" className={style.labelName}>
                        {" "}
                        Nombre
                        <input
                          className={style.inputBooking}
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Ingresa tu nombre"
                          {...register("name")}
                          onChange={handleChange}
                        />
                        {errors.name && (
                          <p className={style.errorMessage}>
                            {errors.name.message}
                          </p>
                        )}
                      </label>
                      <label htmlFor="lastName" className={style.labelLastName}>
                        {" "}
                        Apellido
                        <input
                          className={style.inputBooking}
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Ingresa tu apellido"
                          {...register("lastName")}
                          onChange={handleChange}
                        />
                        {errors.lastName && (
                          <p className={style.errorMessage}>
                            {errors.lastName.message}
                          </p>
                        )}
                      </label>
                    </div>

                    <div className={style.divEmailCity}>
                      <label htmlFor="email" className={style.labelEmail}>
                        {" "}
                        Correo Electrónico
                        <input
                          className={style.inputBooking}
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Ingresa tu email"
                          {...register("email")}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <p className={style.errorMessage}>
                            {errors.email.message}
                          </p>
                        )}
                      </label>

                      <label htmlFor="city" className={style.labelCity}>
                        {" "}
                        Ciudad
                        <input
                          className={style.inputBooking}
                          type="text"
                          id="city"
                          name="city"
                          placeholder="Ingresa tu ciudad"
                          {...register("city")}
                          onChange={handleChange}
                        />
                        {errors.city && (
                          <p className={style.errorMessage}>
                            {errors.city.message}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <div
                  className={style.containerCalendar}
                  ref={calendarContainerRef} 
                >
                  <h2 className={style.h2Booking}>
                    {" "}
                    Seleccioná tu fecha de reserva{" "}
                  </h2>
                  <div className={style.divCalendar}>
                    <Calendar
                      ref={dateCalendarRef}
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
                        try {
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
                        } catch (e) {}
                      }}
                    ></Calendar>
                    {calendarError && (
                      <p className={style.errorMessage}>
                        {" "}
                        Seleccioná las fechas de entrada y salida{" "}
                      </p>
                    )}
                  </div>
                </div>

                <div className={style.containerHour}>
                  <h2 className={style.h2Hour}> Tu horario de llegada </h2>
                  <div className={style.divSelect}>
                    <div className={style.iconAriival}>
                      <FontAwesomeIcon icon={["far", "check-circle"]} />

                      <p className={style.pArrival}>
                        {" "}
                        Tu habitación va a estar lista para el check-in entre
                        las 10:00 AM y las 11:00 PM
                      </p>
                    </div>
                    <label className={style.labelArrival}>
                      {" "}
                      Indicá tu horario estimado de llegada
                      <select
                        className={style.selectHour}
                        name="checkInTime"
                        {...register("checkInTime")}
                        onChange={handleChange}
                        required
                        defaultValue={"default"}
                      >
                    
                        <option disabled value="default">
                          {" "}
                          Seleccione hora de llegada{" "}
                        </option>
                        {optionList().map((option) => option)}
                      </select>
                      {errors.checkInTime && (
                        <p className={style.errorMessage}>
                          {errors.checkInTime.message}
                        </p>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              <div className={style.containerBooking}>
                <h2 className={style.h2Detail}> Detalle de reserva </h2>
                <div className={style.divBooking}>
                  <div className={style.divImgDetail}>
                    <div className={style.divh2Image}>
                      <Image
                        className={style.imgDetail}
                        img={product.images[0].image}
                      />
                    </div>

                    <div className={style.divDetailCheckButton}>
                      <div className={style.divDetails}>
                        <div className={style.categoryContainer}>
                          <h3 className={style.nameCategory}>
                            {product.category.name.toUpperCase()}
                          </h3>
                          <RatingStars rating={product.averageRating} />
                        </div>

                        <h2 className={style.productName}> {product.name} </h2>
                        <p className={style.cityCountry}>
                          {" "}
                          <FontAwesomeIcon
                            icon={["fas", "map-marker-alt"]}
                          />{" "}
                          {product.address.address}, {product.city.name},{" "}
                          {product.city.country}.{" "}
                        </p>
                      </div>

                      <hr />
                      <div className={style.divCheckIn}>
                        <p className={style.pCheckIn}> Check In</p>
                        <p className={style.dateBooking}>
                          {date[0]
                            ? `${date[0].day}/${date[0].month.number}/${date[0].year}`
                            : "__/__/____"}
                        </p>
                      </div>
                      <hr />
                      <div className={style.divCheckOut}>
                        <p className={style.pCheckOut}> Check Out</p>
                        <p className={style.dateBooking}>
                          {date[1]
                            ? `${date[1].day}/${date[1].month.number}/${date[1].year}`
                            : "__/__/____"}
                        </p>
                      </div>
                      <hr />
                      <button type="submit" className={style.buttonBooking}>
                        {" "}
                        Confirmar reserva{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className={style.containerPolicy}>
            <ProductPolicy product={product} />
          </div>
        </>
      )}
      {overlayActive ? (
        <div className={style.overlay} id="overlay"></div>
      ) : (
        <></>
      )}
      {active ? (
        <ConfirmBooking
          bookingData={bookingData}
          product={product}
          active={active}
          handleCancelClick={handleCancelClick}
          dates={checkInFormat}
        />
      ) : (
        <></>
      )}
    </>
  );
}
