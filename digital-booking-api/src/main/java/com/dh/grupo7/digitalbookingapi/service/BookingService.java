package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.entity.BookingEntity;
import com.dh.grupo7.digitalbookingapi.entity.ProductEntity;
import com.dh.grupo7.digitalbookingapi.mapper.BookingMapper;
import com.dh.grupo7.digitalbookingapi.model.Booking;
import com.dh.grupo7.digitalbookingapi.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookingService implements IBookingService {
    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;

    @Autowired
    public BookingService(BookingRepository bookingRepository, BookingMapper bookingMapper) {
        this.bookingRepository = bookingRepository;
        this.bookingMapper = bookingMapper;
    }

    @Override
    public Long create(Booking booking) {

        BookingEntity bookingEntity = bookingMapper.modelToEntity(booking);
        BookingEntity savedBooking = bookingRepository.save(bookingEntity);
        return savedBooking.getId();
    }

    @Override
    public Set<Booking> findByProductId(Long id) {
        List<BookingEntity> bookingObtained = bookingRepository.findByProductId(id);
        return bookingObtained.stream().map(bookingMapper::entityToModel).collect(Collectors.toSet());
    }

    @Override
    public Set<Booking> findByDates(LocalDate startingDate, LocalDate endingDate) {
        List<BookingEntity> bookingObtained = bookingRepository.findByDates(startingDate, endingDate);
        return bookingObtained.stream().map(bookingMapper::entityToModel).collect(Collectors.toSet());
    }

    @Override
    public Set<Booking> findByCheckInDateAfter(LocalDate checkInDate) {
        List<BookingEntity> bookingObtained = bookingRepository.findByCheckInDateAfter(checkInDate);
        return bookingObtained.stream().map(bookingMapper::entityToModel).collect(Collectors.toSet());
    }

    @Override
    public Set<Booking> findByUserId(Long user_id) {
        List<BookingEntity> bookingObtained = bookingRepository.findByUserId(user_id);
        return bookingObtained.stream().map(bookingMapper::entityToModel).collect(Collectors.toSet());
    }

    @Override
    public Booking read(Long id){
        Optional<BookingEntity> productObtained = bookingRepository.findById(id);
        return productObtained.map(bookingMapper::entityToModel)
                .orElse(null);
    }

    @Override
    public void delete(Long id){
        bookingRepository.deleteById(id);
    }
}
