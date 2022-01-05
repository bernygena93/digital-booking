package com.dh.grupo7.digitalbookingapi.controller;

import com.dh.grupo7.digitalbookingapi.dto.BookingDto;
import com.dh.grupo7.digitalbookingapi.mapper.BookingMapper;
import com.dh.grupo7.digitalbookingapi.model.Booking;
import com.dh.grupo7.digitalbookingapi.model.Product;
import com.dh.grupo7.digitalbookingapi.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/booking")
public class BookingController {
    private final BookingService bookingService;
    private final BookingMapper bookingMapper;

    @Autowired
    public BookingController(BookingService bookingService, BookingMapper bookingMapper) {
        this.bookingService = bookingService;
        this.bookingMapper = bookingMapper;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(path = "/")
    public ResponseEntity<?> createBooking(@RequestBody BookingDto bookingDto) {
        if (bookingDto.getId() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Can not create a Booking with a not null ID");
        }
        Booking booking = bookingMapper.dtoToModel(bookingDto);
        return ResponseEntity.ok(bookingService.create(booking));
    }

    @GetMapping(path = "/{product_id}")
    public ResponseEntity<?> findBookingByProductId(@PathVariable Long product_id) {
        Set<Booking> booking = bookingService.findByProductId(product_id);
        if (booking == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        }
        return ResponseEntity.ok(booking.stream().map(bookingMapper::modelToDto).collect(Collectors.toSet()));
    }

    @GetMapping(path = "/userbookings/{user_id}")
    public ResponseEntity<?> findBookingByUserId(@PathVariable Long user_id) {
        Set<Booking> booking = bookingService.findByUserId(user_id);
        if (booking == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        }
        return ResponseEntity.ok(booking.stream().map(bookingMapper::modelToDto).collect(Collectors.toSet()));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        Booking booking = bookingService.read(id);
        if (booking == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        bookingService.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
