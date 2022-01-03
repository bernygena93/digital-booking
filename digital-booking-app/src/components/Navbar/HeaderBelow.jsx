/** @format */

import styles from "../styles/headerBelow.module.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function HeaderBelow({ label }) {
  const history = useHistory();
  const handleClick = () => {
    history.push("/administration-panel/accommodation");
  };
  return (
    <div className={styles.headerBelow}>
      <div>
        <h2>{label}</h2>
      </div>
      <div onClick={handleClick} className={styles.arrowBack}>
        <FontAwesomeIcon icon={['fas', 'chevron-left']}/>
      </div>
    </div>
  );
}


