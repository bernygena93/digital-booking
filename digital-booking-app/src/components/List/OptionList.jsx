/** @format */

import React from "react";

export default function OptionList({ info, label, className }) {
  return (
    <li className={className}>
      <small>{label}</small>
      <h5>{info}</h5>
    </li>
  );
}
