package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.model.Booking;

import java.time.LocalDate;
import java.util.Set;

public interface IBookingService {
    Long create(Booking booking);

    Set<Booking> findByProductId(Long id);

    Set<Booking> findByDates(LocalDate startingDate, LocalDate endingDate);

    Set<Booking> findByCheckInDateAfter(LocalDate checkInDate);

    Set<Booking> findByUserId(Long user_id);

    Booking read(Long id);

    void delete(Long id);
}
