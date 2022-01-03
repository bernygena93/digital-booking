/** @format */

import { useEffect, useState } from "react";

export const useWindowResize = (initialValue) => {
  /*const [resize, setResize] = useState(initialValue);*/
  const [viewType, setViewType] = useState("");
  const [monthAmount, setMonthAmount] = useState(1);
/*   const [viewTablet, setViewTablet] = useState(""); */

  const handleWindowResize = () => {
    /*setResize(window.innerWidth);*/
    const resize = window.innerWidth;
    resize > 650 ? setMonthAmount(2) : setMonthAmount(1);
    if (resize < 768) setViewType("mobile");
    if (resize > 768) setViewType("tablet");
    if (resize >= 1366) setViewType("desktop");
  };

  useEffect(() => {
    handleWindowResize();
  }, []);

  useEffect(
    () => {
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    },
    [window.innerWidth] /*[resize]*/
  );

  return { viewType/* , viewTablet */, monthAmount };
};
