/** @format */

import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import Carousel from "react-carousel-minimal/dist/components/Carousel";
import Gallery from "../../components/Product/Gallery";
import listProducts from "../../json/listProducts.json";

describe("Gallery component test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(<Gallery product={listProducts[0]} />);
  });
  it("Carousel component test", () => {
    <Carousel />;
  });
  it("Carousel component test", () => {
    renderHook(() =>
      React.useEffect(() => {
        if (type === "desktop") {
          setThumbnails(true);
          setNavBtns(true);
          setMainPhotoHeight("25rem");
          if (active) {
            setGalleryStyle({
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
              visibility: "visible",
              zIndex: "5",
              display: "block",
            });
          } else if (!active) {
            setGalleryStyle({
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
              visibility: "hidden",
              zIndex: "1",
              display: "block",
            });
          }
        } else {
          setThumbnails(false);
          setGalleryStyle({
            textAlign: "center",
            maxWidth: "850px",
            maxHeight: "500px",
            margin: "0 auto",
            visibility: "visible",
          });
          setNavBtns(false);
          setMainPhotoHeight("30rem");
        }
      }, ["mobile"])
    );
  });
});
