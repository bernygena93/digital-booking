/** @format */

import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function NotFound() {
  const history = useHistory();
  useEffect(() => {
    history.push("/");
  }, []);
  return <></>;
}
