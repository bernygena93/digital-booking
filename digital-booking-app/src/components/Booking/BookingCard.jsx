/** @format */
import RatingStars from "../RatingStars";
import style from "../styles/bookingComponents.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Button from "../Button";
import { getProductById } from "../../service/productService";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function BookingCard({booking}) {
    const history = useHistory();
    const [productImage, setProductImage] = useState(); 
    const [productId, setProductId] = useState();
    const [productRating, setProductRating] = useState();
    const nameParam = encodeURIComponent(booking.product.name.replace(/ /g, "-"));

    useEffect(() => {
        async function fetchProduct() {
            try {
            const product = await getProductById(booking.product.id);
            setProductImage(product.data.images[0].image);
            setProductId(product.data.id)
            setProductRating(product.data.averageRating)
            } catch (e) {
                console.log(e, "Product not found");
            }
        }
        fetchProduct()
    }, [])


    const handleClick = () => {
        history.push(`/product/${productId}/${nameParam}`)
    }



    return (
        <div className={style.cardContainer}>
            <div className={style.productInfo}>
                <div className={style.bookingImageContainer}>
                    <img src={productImage}/>
                </div>
                    <div className={style.generalInfo}>
                        <div className={style.infoTitle}>
                            <h3 className={style.sectionTitle}>Información general</h3>
                            <div className={style.nameAndRatingContainer}>
                                <h2 className={style.productName}>{booking.product.name}</h2>
                                <RatingStars rating={productRating}/>
                            </div>
                        </div>
                        <div className={style.location}>
                            <FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>
                            <h4>{booking.product.city.name}, {booking.product.city.country}</h4>
                        </div>
                </div>
                
                
            </div>
            <hr className={style.hrBooking, style.firstHr}/>
            
            <div className={style.bookingDetails}>
                <div className={style.datesContainer}>
                    <h3 className={style.sectionTitle}>Fechas reservadas</h3>
                    <div className={style.bookingDates}>
                        <div className={style.checkInDetail}>
                            <h4>Check In</h4>
                            <h2>{moment(booking.checkInDate, "YYYY-MM-DD").format("DD")}</h2>
                            <h4>{moment(booking.checkInDate, "YYYY-MM-DD").format("MMMM YYYY")}</h4>
                        </div>
                        <div className={style.arrows}>
                            <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                            <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                            <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                        </div>
                        <div className={style.checkOutDetail}>
                            <h4>Check Out</h4>
                            <h2>{moment(booking.checkOutDate, "YYYY-MM-DD").format("DD")}</h2>
                            <h4>{moment(booking.checkOutDate, "YYYY-MM-DD").format("MMMM YYYY")}</h4>
                        </div>
                    </div>
                </div>
                <hr className={style.hrBooking, style.secondHr}/>
                <div className={style.bookingStatusContainer}>
                        <h3 className={style.sectionTitle}>Status</h3>
                        <h4>Reserva aceptada</h4>
                        <Button className={style.seeProductBtnDesktop} label="Ver alojamiento" onClick={handleClick}></Button>
                </div>
            </div>
            <Button className={style.seeProductBtnMobile} label="Ver alojamiento" onClick={handleClick}></Button>
        </div>
    )
}