package com.dh.grupo7.digitalbookingapi.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class Booking {
    private Long id;
    private LocalTime checkInTime;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Product product;
    private User user;
}
