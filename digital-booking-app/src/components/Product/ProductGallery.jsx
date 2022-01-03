/** @format */

import React, { useState, useEffect } from "react";
import style from "../styles/productDetail.module.css";
import Button from "../Button";
import Gallery from "./Gallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductGallery({ product, viewType }) {
  const [active, setActive] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);

  useEffect(() => {
    if (viewType === "mobile" || viewType === "tablet") {
      setOverlayActive(false);
      setActive(true);
    } else {
      setActive(false);
    }
  }, [viewType]);


  const handleSeeMoreClick = (e) => {
    setActive(true);
    setOverlayActive(true);
  };

  const handleCloseClick = (e) => {
    setOverlayActive(false);
    setActive(false);
  };

  return (
    <div className={style.productGallery}>
      <div className={style.shareIcons}>
        <FontAwesomeIcon
          icon={["fas", "share-alt"]}
          className={style.shareIcon}
          color="#263238"
          size="lg"
        />
        <FontAwesomeIcon icon={["far", "heart"]} className={style.heartIcon} color="#263238" size="lg"/>
      </div>

      {active ? (
        <div className={style.imageCarousel} id="imageCarousel">
          <Gallery product={product} type={viewType} active={active} />
        </div>
      ) : (
        <></>
      )}

      <div className={style.imgsDesktop}>
        <div className={style.mainImg}>
          <img src={product.images[0].image} alt={product.name} />
        </div>
        <div className={style.secondaryImgs}>
          {product.images.slice(0, 5).map((image, index) => {
            return (
              <div className={style.imgContainer} key={"img-" + index}>
                <img
                  src={image.image}
                  alt={product.name}
                  className={style.imgGalleryDesktop}
                />{" "}
              </div>
            );
          })}
        </div>
        <Button
          label="Ver más"
          className={style.seeMoreButton}
          onClick={handleSeeMoreClick}
        />
      </div>
      {overlayActive ? (
        <div
          className={style.overlay}
          id="overlay"
          onClick={handleCloseClick}
        ></div>
      ) : (
        <></>
      )}
    </div>
  );
}
