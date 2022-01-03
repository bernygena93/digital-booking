package com.dh.grupo7.digitalbookingapi.mapper;

import com.dh.grupo7.digitalbookingapi.dto.BookingDto;
import com.dh.grupo7.digitalbookingapi.entity.BookingEntity;
import com.dh.grupo7.digitalbookingapi.model.Booking;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {
    ObjectMapper mapper;
    UserMapper userMapper;

    @Autowired
    public BookingMapper(ObjectMapper mapper, UserMapper userMapper) {
        this.mapper = mapper;
        this.userMapper = userMapper;
    }

    public Booking entityToModel(BookingEntity bookingEntity) {
        Booking booking = mapper.convertValue(bookingEntity, Booking.class);
        booking.setUser(userMapper.entityToModel(bookingEntity.getUser()));
        return booking;
    }

    public BookingEntity modelToEntity(Booking booking) {
        return mapper.convertValue(booking, BookingEntity.class);
    }

    public BookingDto modelToDto(Booking booking) {
        return mapper.convertValue(booking, BookingDto.class);
    }

    public Booking dtoToModel(BookingDto bookingDto) {
        return mapper.convertValue(bookingDto, Booking.class);
    }
}
