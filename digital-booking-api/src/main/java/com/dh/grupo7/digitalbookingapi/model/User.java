package com.dh.grupo7.digitalbookingapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private Long id;
    private String userName;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private boolean enabled;
    private String verificationCode;
}
