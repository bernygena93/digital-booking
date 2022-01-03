import React from "react";

export default function Image({ img, alt, className }) {
  return <img className={className} src={img} alt={alt} />;
}
