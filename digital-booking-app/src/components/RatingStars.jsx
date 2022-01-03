import React from "react";
import style from "./styles/ratingStars.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function RatingStars({rating}) {

    const printStars = (rating) => {
        let fullStars = rating / 2;

        let stars =[]
        for(let i = 0; i < 5; i++) {
            if(i < Math.floor(fullStars)) {
                stars.push(<FontAwesomeIcon key={"star" + i} icon={['fas', 'star']} color="#fbc02d"/>)
            } else if ( i < fullStars) {
                stars.push(<FontAwesomeIcon key={"star" + i} icon={['fas', 'star-half-alt']} color="#fbc02d"/>)
            } else {
                stars.push(<FontAwesomeIcon key={"star" + i} icon={['far', 'star']} color="#fbc02d"/>)
            }
       }
       return stars
    }


    return (
        <div className={style.ratingStars}>
            {printStars(rating)}
        </div>
    );
}