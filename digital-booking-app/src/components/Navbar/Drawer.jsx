import React, { useContext } from "react";
import styles from "../styles/drawer.module.css";
import BookingContext from "../../context/BookingContext";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Drawer({ drawerToggle, drawerOpen }) {
  const { pathname } = useLocation();
  const history = useHistory();
  const context = useContext(BookingContext);
  const activeDrawer = drawerOpen ? styles.drawerOpen : "";
  const userRole = localStorage.getItem("User" ) ? JSON.parse(localStorage.getItem('User')).authority[0].authority : "" 


  function handlerClickLogout() {
    context.currentLocation("/");
    context.logoutUser();
    drawerToggle();
  }

  const handleClick = (link) => {
    history.push(link);
    drawerToggle();
  };

  return (
    <BookingContext.Consumer>
      {(context) => (
        <div className={`${styles.drawer} ${activeDrawer}`}>
          <div className={styles.drawerTop}>
            
            <div className={styles.closeIcon} onClick={drawerToggle}>
              <i className="fas fa-times"></i>
            </div>

            {context.user ? (
            
            <div className={styles.userContainer}>
                <div className={styles.avatarDrawerContainer}>
                  <div className={styles.avatarDrawer}>{context.avatar}</div>
                </div>
                <h3 className={styles.welcomeUser}>Hola,</h3>
                <h3 className={styles.welcomeUser}>
                  {context.userInfo?.name} {context.userInfo?.lastName}
                </h3>
                {userRole === "ROLE_ADMIN" && <h3 className={styles.h3Administration}> Administración </h3>}
            </div>
            
            ) : (
              <h2 className={styles.menuTitle}>MENÚ</h2>
            )}
          </div>
              
          {!context.user ? (
            <nav>
              <ul type="none">
                <li
                  className={styles.drawerLinks}
                  onClick={() => handleClick("/register")}
                >
                  Crear cuenta
                </li>
                <hr></hr>
                <li
                  onClick={() => handleClick("/login")}
                  className={styles.drawerLinks}
                >
                  Iniciar sesión
                </li>
              </ul>
            </nav>
          ) : (
            <>
              {userRole === "ROLE_USER" ?  (
              <div className={styles.drawerBookingLogOut}>
                <h3 className={styles.h3Booking} onClick={() => handleClick("/bookings")}> Mis reservas </h3>
                <hr></hr>
                <h3 className={styles.h3LogOut}>
                <Link
                className={styles.drawerLinks}
                to="/"
                onClick={handlerClickLogout}
                >
                Cerrar sesión
                </Link>
                
                      </h3>
                </div>
              ):(
                <div className={styles.DrawerAdministration}>
                  <h3 className={styles.h3Accommodation} onClick={() => handleClick("/administration-panel/accommodation")}> 
                  {pathname === "/administration-panel/accommodation" ? <FontAwesomeIcon icon={["fas", "hotel"]} color="#fbc02d" /> : <FontAwesomeIcon icon={["fas", "hotel"]} color="rgba(190, 190, 190, 1)"/>}
                  Alojamientos  
                  </h3>
                  <hr></hr>
                  <h3 className={styles.h3Booking} onClick={() => handleClick("/administration-panel/booking")}>
                  {pathname === "/administration-panel/booking" ? <FontAwesomeIcon icon={["far", "calendar-check"]} color="#fbc02d"/> : <FontAwesomeIcon icon={["far", "calendar-check"]} color="rgba(190, 190, 190, 1)"/> }
                  Reservas 
                  </h3>
                  <hr></hr>
                  <h3 className={styles.h3LoginCustomer} onClick={() => handleClick("/")}> 
                  Inicio cliente 
                  </h3>
                  <hr></hr>
                  <Link
                  className={styles.drawerLinks}
                  to="/"
                  onClick={handlerClickLogout}
                  >
                  <h3 className={styles.h3LogOut}>
                    Cerrar sesión
                    </h3>
                  </Link>
                  <hr></hr>
                </div> 
              )}
            </>
          )}
          <div className={styles.drawerBottom}>
            
            <hr></hr>
            <div className={styles.socialMediaIconsDrawer}>
              <a href="https://facebook.com">
                <FontAwesomeIcon
                  icon={["fab", "facebook"]}
                  color="#263238"
                  size="lg"
                />
              </a>
              <a href="https://linkedin.com/">
                <FontAwesomeIcon
                  icon={["fab", "linkedin"]}
                  color="#263238"
                  size="lg"
                />
              </a>
              <a href="https://twitter.com/">
                <FontAwesomeIcon
                  icon={["fab", "twitter"]}
                  color="#263238"
                  size="lg"
                />
              </a>
              <a href="https://instagram.com/">
                <FontAwesomeIcon
                  icon={["fab", "instagram"]}
                  color="#263238"
                  size="lg"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </BookingContext.Consumer>
  );
}