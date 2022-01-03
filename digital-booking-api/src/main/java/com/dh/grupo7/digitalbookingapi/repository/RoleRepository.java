package com.dh.grupo7.digitalbookingapi.repository;

import com.dh.grupo7.digitalbookingapi.entity.RoleEntity;
import com.dh.grupo7.digitalbookingapi.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByRoleName(RoleName roleName);
}
