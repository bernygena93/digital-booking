/** @format */

import { useState, useRef } from "react";
import styles from "../components/styles/select.module.css";

export const useOutsideSelect = () => {
  const [visible, setVisible] = useState(styles.dropdownUl);
  const [invisible, setInvisible] = useState(styles.dropdownUlView);
  const ref = useRef(null);

  return { visible, setVisible, ref, invisible, setInvisible };
};
