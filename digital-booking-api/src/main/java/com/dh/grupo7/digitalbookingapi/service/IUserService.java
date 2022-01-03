package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.dto.UserDto;
import com.dh.grupo7.digitalbookingapi.entity.UserEntity;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.Optional;

public interface IUserService {
    void save(UserEntity userEntity);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);

    void delete(Long id);

    void sendVerificationEmail(UserEntity userEntity) throws MessagingException, UnsupportedEncodingException;

    Optional<UserEntity> findByVerificationCode(String code);
}
