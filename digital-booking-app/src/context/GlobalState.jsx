/** @format */

import { useState } from "react";
import BookingContext from "./BookingContext";

function GlobalState(props) {
  const [currentRoute, setcurrentRoute] = useState("/");
  const [avatar, setAvatar] = useState(localStorage.getItem("Avatar"));
  const [user, setUser] = useState(localStorage.getItem("Login"));
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("User"))
  );
  const [filter, setFilter] = useState("");
  const [dateBooking, setDateBooking] = useState([]);

  const loginUser = (information) => {
    const name = information.name;
    const lastName = information.lastName;
    const initials = `${name[0].toUpperCase()}${lastName[0].toUpperCase()}`;

    setAvatar(initials);
    setUserInfo(information);
    setUser(true);

    localStorage.setItem("Token", information.token);
    localStorage.setItem("Avatar", initials);
    localStorage.setItem("Login", true);
    localStorage.setItem("User", JSON.stringify(information));
  };

  const logoutUser = () => {
    setUser(false);
    setUserInfo({});

    localStorage.removeItem("Login");
    localStorage.removeItem("User");
    localStorage.removeItem("Avatar");
    localStorage.removeItem("Token");
  };

  const filterType = (filter) => {
    setFilter(filter);
  };

  const currentLocation = (pathname) => {
    setcurrentRoute(pathname);
  };

  const datesPersistance = (checkIn, checkOut) => {
    const checkInArray = checkIn.split("-");
    const checkOutArray = checkOut.split("-");
    const checkInObject = {
      day: checkInArray[2],
      month: {
        number: checkInArray[1],
      },
      year: checkInArray[0],
    };
    const checkOutObject = {
      day: checkOutArray[2],
      month: {
        number: checkOutArray[1],
      },
      year: checkOutArray[0],
    };

    setDateBooking([...dateBooking, checkInObject, checkOutObject]);
  };

  return (
    <BookingContext.Provider
      value={{
        user: user,
        userInfo: userInfo,
        filter: filter,
        avatar: avatar,
        dateBooking: dateBooking,
        currentRoute: currentRoute,
        loginUser: loginUser,
        logoutUser: logoutUser,
        filterType: filterType,
        currentLocation: currentLocation,
        datesPersistance: datesPersistance,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

export default GlobalState;
