package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.entity.RoleEntity;
import com.dh.grupo7.digitalbookingapi.enums.RoleName;
import com.dh.grupo7.digitalbookingapi.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class RoleService implements IRoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void save(RoleEntity roleEntity) {
        roleRepository.save(roleEntity);
    }

    @Override
    public Optional<RoleEntity> findBYRoleName(RoleName roleName) {
        return roleRepository.findByRoleName(roleName);
    }
}
