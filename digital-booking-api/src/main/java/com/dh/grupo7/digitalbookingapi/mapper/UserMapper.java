package com.dh.grupo7.digitalbookingapi.mapper;

import com.dh.grupo7.digitalbookingapi.dto.UserDto;
import com.dh.grupo7.digitalbookingapi.entity.UserEntity;
import com.dh.grupo7.digitalbookingapi.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    ObjectMapper mapper;

    @Autowired
    public UserMapper(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    public User entityToModel(UserEntity userEntity) {
        return mapper.convertValue(userEntity, User.class);
    }

    public UserEntity modelToEntity(User user) {
        return mapper.convertValue(user, UserEntity.class);
    }

    public UserDto modelToDto(User user) {
        return mapper.convertValue(user, UserDto.class);
    }

    public User dtoToModel(UserDto userDto) {
        return mapper.convertValue(userDto, User.class);
    }
}
