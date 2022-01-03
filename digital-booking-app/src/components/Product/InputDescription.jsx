/** @format */

import styles from "../styles/inputDescription.module.css";

export default function InputDescription({
  generalLabel,
  labelInput,
  className,
  placeholder,
  onChange,
  name,
  value,
}) {
  return (
    <div className={`${styles.divInputDescription} ${className}`}>
      <h4 className={styles.textareaDescription}>{generalLabel}</h4>
      <label
        htmlFor={generalLabel + " description"}
        className={`${styles.labelInputDescription}`}
      >
        {labelInput}
        <textarea
          type="text"
          className={styles.inputDescription}
          name={name}
          id={generalLabel + " description"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
