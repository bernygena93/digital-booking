/** @format */

import style from "./styles/successfulBooking.module.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MessageTemplate({
  title,
  text,
  icon,
  color,
  label,
  path,
  buttonVisible
}) {
  const history = useHistory();
  const handleClick = () => {
    history.push(path);
  };

  return (
    <div className={style.sectionContainer}>
      <div className={style.messageContainer}>
        <span>
          <FontAwesomeIcon icon={icon} color={color} size="4x" />
        </span>
        <h2>{title}</h2>
        <p>{text}</p>
        {buttonVisible && <button className={style.homeButton} onClick={handleClick}>
          {label}
        </button>}
      </div>
    </div>
  );
}
