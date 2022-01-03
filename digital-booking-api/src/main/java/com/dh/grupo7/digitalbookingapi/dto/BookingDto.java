package com.dh.grupo7.digitalbookingapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class BookingDto {
    private Long id;
    private LocalTime checkInTime;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private ProductDto product;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UserDto user;
}
