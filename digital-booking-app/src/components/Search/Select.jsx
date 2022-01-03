/** @format */
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/select.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Select({
  id,
  list,
  onFilter,
  visible,
  placeholder,
  iconLocationTrue,
  selected,
  setSelected,
  invisible,
  className,
  iconArrowDownTrue,
  valueDefault,
  relative
}) {
  const [option, setOption] = useState("");
  const [listFilter, setListFilter] = useState(list);
  const ref = useRef(null);
  
  const handleClickOutside = (e) => {
    if(ref.current && !ref.current.contains(e.target)) {
      setSelected(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  useEffect(() => {
    setListFilter(list);
    if (valueDefault) {
      setOption(
        `${valueDefault.name}${
          valueDefault.country ? `, ${valueDefault.country} ` : ""
        }`
      );
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setListFilter(list);
    } else setListFilter([]);
    setOption(value);
    list.forEach((element) => {
      if (
        element.name.search(value) !== -1 ||
        element.country?.search(value) !== -1
      ) {
        setListFilter((prevState) => [...prevState, element]);
      }
    });
  };
  const handleSelect = () => {
    setSelected(!selected);
  };

  const handleSelectOption = (value) => {
    setSelected(false);
    setOption(`${value.name}${value.country ? `, ${value.country} ` : ""}`);
    onFilter(value);
  };


  return (
    <>
      <div className={`${styles.dropdown} ${className}`} onClick={handleSelect}>
        {iconLocationTrue && (
          <FontAwesomeIcon icon={["fas", "map-marker-alt"]} color="#fbc02d" />
        )}

        <input
          className={styles.inputSelect}
          type="text"
          onChange={handleChange}
          placeholder={placeholder}
          value={option}
          ref={ref}
        />
        {iconArrowDownTrue && (
          <FontAwesomeIcon icon={["fas", "chevron-down"]} color="#fbc02d" />
        )}
      </div>
    {!relative? (
      <ul type="none" className={selected ? invisible : visible} id={id && id}>
        {listFilter.map((element, index) => (
          <>
            <li
              key={element.name + index}
              className={styles.options}
              value={element.name}
              onClick={() => handleSelectOption(element)}
            >
              {iconLocationTrue && (
                <FontAwesomeIcon
                  icon={["fas", "map-marker-alt"]}
                  color="#fbc02d"
                  key={"marker" + index} 
                />
              )}{" "}
              {element.name}
              {element.country && `, ${element.country}`}
            </li>
            <div className={styles.divider} key={"divider" + index}></div>
          </>
        ))}
      </ul>
    ) : (
      <div className={styles.selectWrapper}>
        <ul type="none" className={selected ? invisible : visible} id={id && id}>
{          listFilter.map((element, index) => (
            <>
              <li
                key={element.name + index}
                className={styles.options}
                value={element.name}
                onClick={() => handleSelectOption(element)}
              >
                {iconLocationTrue && (
                  <FontAwesomeIcon
                    icon={["fas", "map-marker-alt"]}
                    color="#fbc02d"
                    key={"marker" + index} 
                  />
                )}{" "}
                {element.name}
                {element.country && `, ${element.country}`}
              </li>
              <div className={styles.divider} key={"divider" + index} ></div>
            </>
          ))}
        </ul>
      </div>
    )}
    </>
  );
}
