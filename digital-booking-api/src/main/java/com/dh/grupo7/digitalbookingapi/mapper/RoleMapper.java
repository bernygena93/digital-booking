package com.dh.grupo7.digitalbookingapi.mapper;

import com.dh.grupo7.digitalbookingapi.dto.RoleDto;
import com.dh.grupo7.digitalbookingapi.entity.RoleEntity;
import com.dh.grupo7.digitalbookingapi.model.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {
    ObjectMapper mapper;

    @Autowired
    public RoleMapper(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    public Role entityToModel(RoleEntity roleEntity) {
        return mapper.convertValue(roleEntity, Role.class);
    }

    public RoleEntity modelToEntity(Role role) {
        return mapper.convertValue(role, RoleEntity.class);
    }

    public RoleDto modelToDto(Role role) {
        return mapper.convertValue(role, RoleDto.class);
    }

    public Role dtoToModel(RoleDto roleDto) {
        return mapper.convertValue(roleDto, Role.class);
    }
}
