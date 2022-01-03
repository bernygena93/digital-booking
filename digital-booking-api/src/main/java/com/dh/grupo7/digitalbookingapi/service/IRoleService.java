package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.entity.RoleEntity;
import com.dh.grupo7.digitalbookingapi.enums.RoleName;

import java.util.Optional;

public interface IRoleService {
    void save(RoleEntity roleEntity);

    Optional<RoleEntity> findBYRoleName(RoleName roleName);
}
