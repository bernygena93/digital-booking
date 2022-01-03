/** @format */

import { Carousel } from "react-carousel-minimal";
import React, { useState, useEffect } from "react";

export default function Gallery({ product, type, active }) {
  const [thumbnails, setThumbnails] = useState();
  const [galleryStyle, setGalleryStyle] = useState();
  const [navBtns, setNavBtns] = useState();
  const [mainPhotoHeight, setMainPhotoHeight] = useState();

  useEffect(() => {
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
  }, [type, active]);

  return (
    <>
      {}
      <Carousel
        data={product.images}
        time={3000}
        width="100%"
        height={mainPhotoHeight}
        slideNumber={true}
        slideNumberStyle={{
          fontSize: "1rem",
          fontWeight: "bold",
          position: "absolute",
          top: "unset",
          right: "0.5rem",
          bottom: "0.5rem",
        }}
        automatic={true}
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
        thumbnails={thumbnails}
        showNavBtn={navBtns}
        style={galleryStyle}
      />
    </>
  );
}
