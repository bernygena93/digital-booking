package com.dh.grupo7.digitalbookingapi.security.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignInDto {
    private String email;
    private String password;
}
