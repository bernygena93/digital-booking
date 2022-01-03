/** @format */

import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "../styles/navbar.module.css";
import Image from "../Image.jsx";
import Button from "../Button.jsx";
import imgLogo from "../../img/logo.png";
import { useHistory, useLocation } from "react-router-dom";
import BookingContext from "../../context/BookingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar({ drawerToggle }) {
  const context = useContext(BookingContext);
  const history = useHistory();
  const location = useLocation();
  const userRole = localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User")).authority[0].authority
    : null;
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  function handlerLink(link) {
    history.push(link);
  }

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsDropdownActive(false);
    }
  };

  function handlerClickLogout() {
    context.currentLocation("/");
    context.logoutUser();
    handlerLink("/", "home");
    setIsDropdownActive(false);
  }

  function handleClick(link) {
    handlerLink(link);
    setIsDropdownActive(false);
  }

  function handleDropdown(e) {
    !isDropdownActive ? setIsDropdownActive(true) : setIsDropdownActive(false);
  }

  return (
    <BookingContext.Consumer>
      {(context) => (
        <>
          <div className={styles.headerSticky}>
            <div
              className={styles.logoSlogan}
              onClick={
                userRole === "ROLE_ADMIN"
                  ? () => handlerLink("/administration-panel/accommodation")
                  : () => handlerLink("/")
              }
            >
                <Image img={imgLogo} alt="logo" />
                <div
                  className={`${styles.headerSlogan} ${styles.headerSloganMobile}`}
                >
                  <h2>Sentite como en tu hogar</h2>
                </div>
            </div>

            <div className={styles.menuIcon} onClick={drawerToggle}>
              <i className="fas fa-bars"></i>
            </div>

            <div className={styles.menuNotMobile}>
              {!context.user ? (
                <>
                  {location.pathname !== "/register" && (
                    <Button
                      className={`${styles.headerButton} ${styles.createAccountButton}`}
                      label="Crear cuenta"
                      onClick={() => handlerLink("/register")}
                    />
                  )}
                  {location.pathname !== "/login" && (
                    <Button
                      className={`${styles.headerButton} ${styles.loginButton}`}
                      onClick={() => handlerLink("/login")}
                      label="Iniciar sesión"
                    />
                  )}
                </>
              ) : (
                <>
                  {userRole === "ROLE_ADMIN" ? (
                    <>
                      <>
                        <h5 className={styles.adminName}>Administración</h5>
                        <hr className={styles.adminHr} />
                      </>
                      <div
                        className={styles.divAvatarName}
                        onClick={handleDropdown}
                        ref={ref}
                      >
                        <div className={styles.divAvatar}>
                          {" "}
                          {context.avatar}{" "}
                        </div>
                        <div className={styles.userInfo}>
                          <h3 className={styles.userName}>Hola,</h3>
                          <h3 className={styles.userName}>
                            {context.userInfo?.name}{" "}
                            {context.userInfo?.lastName}
                          </h3>
                        </div>
                        <div className={styles.dropdown}>
                          <FontAwesomeIcon
                            icon={["fas", "chevron-down"]}
                            color="#fbc02d"
                          />
                        </div>
                      </div>

                      <div
                        className={
                          isDropdownActive
                            ? styles.dropdownAdminActive
                            : styles.dropdownContentInactive
                        }
                      >
                        <div
                          className={styles.dropdownLink}
                          onClick={() => handleClick("/")}
                        >
                          Inicio cliente
                        </div>
                        <hr></hr>
                        <div
                          className={styles.dropdownLink}
                          onClick={() =>
                            handleClick("/administration-panel/accommodation")
                          }
                        >
                          Panel administración
                        </div>
                        <hr></hr>
                        <div
                          className={styles.logoutText}
                          onClick={handlerClickLogout}
                        >
                          Cerrar sesión
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={styles.divAvatarName}
                        onClick={handleDropdown}
                        ref={ref}
                      >
                        <div className={styles.divAvatar}>
                          {" "}
                          {context.avatar}{" "}
                        </div>
                        <div className={styles.userInfo}>
                          <h3 className={styles.userName}>Hola,</h3>
                          <h3 className={styles.userName}>
                            {context.userInfo?.name}{" "}
                            {context.userInfo?.lastName}
                          </h3>
                        </div>
                        <div className={styles.dropdown}>
                          <FontAwesomeIcon
                            icon={["fas", "chevron-down"]}
                            color="#fbc02d"
                          />
                        </div>
                      </div>
                      <div
                        className={
                          isDropdownActive
                            ? styles.dropdownUserActive
                            : styles.dropdownContentInactive
                        }
                      >
                        <div
                          className={styles.dropdownLink}
                          onClick={() => handleClick("/bookings")}
                        >
                          Mis reservas
                        </div>
                        <hr></hr>
                        <div
                          role="button"
                          className={styles.logoutText}
                          onClick={handlerClickLogout}
                        >
                          Cerrar sesión
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </BookingContext.Consumer>
  );
}
