package com.dh.grupo7.digitalbookingapi.mapper;

import com.dh.grupo7.digitalbookingapi.dto.RatingDto;
import com.dh.grupo7.digitalbookingapi.entity.RatingEntity;
import com.dh.grupo7.digitalbookingapi.model.Rating;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class RatingMapper {
    ObjectMapper mapper;

    @Autowired
    public RatingMapper(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    public Rating entityToModel(RatingEntity RatingEntity) {
        return mapper.convertValue(RatingEntity, Rating.class);
    }

    public RatingEntity modelToEntity(Rating Rating) {
        return mapper.convertValue(Rating, RatingEntity.class);
    }

    public RatingDto modelToDto(Rating Rating) {
        return mapper.convertValue(Rating, RatingDto.class);
    }

    public Rating dtoToModel(RatingDto RatingDto) {
        return mapper.convertValue(RatingDto, Rating.class);
    }
}
