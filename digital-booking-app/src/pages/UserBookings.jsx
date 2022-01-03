/** @format */
import  BookingCard from "../components/Booking/BookingCard";
import style from "./styles/userBookings.module.css"
import { getBookingsByUser } from "../service/bookingService";
import React, { useState, useEffect, useContext} from "react";
import BookingContext from "../context/BookingContext";
import Spinner from "../components/Spinner";

export default function UserBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false)
    const [hasBookings, setHasBookings] = useState(false)
    const context = useContext(BookingContext);

    useEffect(() => {
        setLoading(true)
        async function fetchBookings() {
            try {
            const bookings = await getBookingsByUser(context.userInfo?.id);
            setBookings(bookings.data);
            setLoading(false)
            } catch (e) {
                console.log(e, "Bookings not found");
                setHasBookings(false)
                setLoading(false)
            }
        }
        fetchBookings()
    }, [])

    useEffect(() => {
        bookings[0] ? setHasBookings(true) : setHasBookings(false);
    }, [bookings])

    return (
        <div className={style.bookingsContainer}>
            <h2 className={style.myBookingsTitle}>Mis reservas</h2>
            {loading ? (
                <div className={style.containerSpinner}>
                    {" "}
                    <Spinner /> <h4>Cargando...</h4>{" "}
                </div>
            ) : (
                <>
            {hasBookings ? 
                <>
                    <h3 className={style.activeBookingsTitle}>Próximas</h3>
                    {bookings.map((booking) => {
                        return <BookingCard key={booking.id} booking={booking}/>
                    })}
                </> :
                <div className={style.noBookingContainer}>
                    <h3 className={style.noBooking}>Parece que todavía no tienes ninguna reserva</h3>
                </div>
                }
            </>
            )}
            
        </div>
    )
}
