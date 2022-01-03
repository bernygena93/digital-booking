import React from "react";
import styles from "../styles/card.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DivLocation({ location }) {
  return (
    <div className={styles.divLocation}>
      <FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>
      <h4 id={location}>{location}</h4>
    </div>
  );
}