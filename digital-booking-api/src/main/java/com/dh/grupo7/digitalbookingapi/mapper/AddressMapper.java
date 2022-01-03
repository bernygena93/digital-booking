package com.dh.grupo7.digitalbookingapi.mapper;

import com.dh.grupo7.digitalbookingapi.dto.AddressDto;
import com.dh.grupo7.digitalbookingapi.entity.AddressEntity;
import com.dh.grupo7.digitalbookingapi.model.Address;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {
    ObjectMapper mapper;

    @Autowired
    public AddressMapper(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    public Address entityToModel(AddressEntity addressEntity) {
        return mapper.convertValue(addressEntity, Address.class);
    }

    public AddressEntity modelToEntity(Address address) {
        return mapper.convertValue(address, AddressEntity.class);
    }

    public AddressDto modelToDto(Address address) {
        return mapper.convertValue(address, AddressDto.class);
    }

    public Address dtoToModel(AddressDto addressDto) {
        return mapper.convertValue(addressDto, Address.class);
    }
}
