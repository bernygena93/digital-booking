import React from "react";
import styles from "../styles/card.module.css";
import RatingStars from "../RatingStars";
import DivLocation from "./DivLocation";
import { useEffect, useState } from "react";



export default function CardBody({product}) {
    const [categoryName, setCategoryName] = useState()

    useEffect(() => {
        if(product.category.name === "Hoteles") {
            setCategoryName("HOTEL")
        } else if (product.category.name === "Hostels") {
            setCategoryName("HOSTEL")
        } else if (product.category.name === "Departamentos"){
            setCategoryName("DEPARTAMENTO")
        } else {
            setCategoryName("BED & BREAKFAST")
        }
    }, [])

    return (
        <div className={styles.cardBody}>

            <div className={styles.headerCard}>

                <div className={styles.headerCategory}>

                    <h3 id={categoryName}>{categoryName}</h3>
                    <RatingStars rating={product.averageRating}/>

                </div>

                <div className={styles.headerTitle}>
                    <h2 className={styles.title}>{product.name}</h2>
                </div>

            </div>


            <DivLocation id={product.city.name} location={`${product.city.name}, ${product.city.country} `} />

            <div className={styles.cardFooter}>
                <small>"{product.description.slice(0, 100)}..."</small>
            </div>

        </div>
    );
}
