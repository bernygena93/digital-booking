/** @format */

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { useWindowResize } from "../hooks/useWindowResize";
import { useParams, useHistory } from "react-router-dom";

export default function SidePanel({ styles, labelBooking, labelProduct }) {
  const { data } = useParams();
  const history = useHistory();
  const [styleIconBooking, setStyleIconBooking] = useState(styles.iconPanel);
  const [styleIconAccommodation, setStyleIconAccommodation] = useState(
    styles.iconPanel
  );
  const { viewType } = useWindowResize();

  useEffect(() => {
    if (data === "accommodation") {
      setStyleIconBooking(styles.iconPanel);
      setStyleIconAccommodation(styles.iconPanelSelected);
    } else {
      setStyleIconBooking(styles.iconPanelSelected);
      setStyleIconAccommodation(styles.iconPanel);
    }
  }, [data]);

  const handleClick = (path) => {
    history.push(`/administration-panel/${path}`);
  };

  return (
    <div className={styles.sidePanel}>
      <div className={styles.optionsSidePanel}>
        {/*         <Link
          to="/administration-panel/accommodation"
          className={styles.linkSidePanel}
        > */}
        <button
          className={styles.optionButton}
          onClick={() => handleClick("accommodation")}
        >
          <FontAwesomeIcon icon={faHotel} className={styleIconAccommodation} />
          {"   "}
          <h4 className={styles.panelName}>{viewType === "desktop" && labelProduct}</h4>
        </button>
        {/*         </Link> */}
        {/*         <Link
          to="/administration-panel/booking"
          className={styles.linkSidePanel}
        > */}
        <button
          className={styles.optionButton}
          onClick={() => handleClick("booking")}
        >
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className={styleIconBooking}
          />
          {"   "}
          <h4 className={styles.panelName}>{viewType === "desktop" && labelBooking}</h4>
        </button>
        {/*         </Link> */}
      </div>
    </div>
  );
}
