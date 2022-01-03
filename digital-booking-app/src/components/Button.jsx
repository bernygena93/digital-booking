/** @format */

import React from "react";

export default function Button({ className, label, onClick, onChange, type, onSubmit }) {
  return (
    <button
      type={type}
      id="button"
      className={className}
      onClick={onClick}
      onChange={onChange}
      onSubmit={onSubmit}
    >
      {label}
    </button>
  );
}
