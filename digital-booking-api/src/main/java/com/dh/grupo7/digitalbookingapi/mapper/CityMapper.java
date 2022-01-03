package com.dh.grupo7.digitalbookingapi.mapper;

import com.dh.grupo7.digitalbookingapi.dto.CityDto;
import com.dh.grupo7.digitalbookingapi.entity.CityEntity;
import com.dh.grupo7.digitalbookingapi.model.City;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class CityMapper {
    ObjectMapper mapper;

    @Autowired
    public CityMapper(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    public City entityToModel(CityEntity cityEntity) {
        return mapper.convertValue(cityEntity, City.class);
    }

    public CityEntity modelToEntity(City city) {
        return mapper.convertValue(city, CityEntity.class);
    }

    public CityDto modelToDto(City city) {
        return mapper.convertValue(city, CityDto.class);
    }

    public City dtoToModel(CityDto cityDto) {
        return mapper.convertValue(cityDto, City.class);
    }
}
