package com.dh.grupo7.digitalbookingapi.repository;

import com.dh.grupo7.digitalbookingapi.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String Email);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);

    Optional<UserEntity> findByVerificationCode(String code);
}
