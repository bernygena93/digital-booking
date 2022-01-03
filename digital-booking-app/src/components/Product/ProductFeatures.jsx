/** @format */

import style from "../styles/productDetail.module.css";
import Title from "./Title";
import Icon from "../Icon";

export default function ProductFeatures({ product }) {
  return (
    <div className={style.productFeatures}>
      <Title title={"¿Qué ofrece este lugar?"} />
      <div className={style.productFeaturesList}>
        {product.features.map((feature, index) => {
          return (
            <div
              className={style.featureContainer}
              key={"featureContainer-" + index}
            >
              <Icon
                className={style.featureIcon}
                icon={feature.icon}
              />
              <p>{feature.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
