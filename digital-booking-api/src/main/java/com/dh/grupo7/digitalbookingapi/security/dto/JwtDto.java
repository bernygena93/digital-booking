package com.dh.grupo7.digitalbookingapi.security.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
@Setter
public class JwtDto {
    private Long id;
    private String token;
    private String bearer = "Bearer";
    private String name;
    private String lastName;
    public String email;
    private Collection< ? extends GrantedAuthority> authority;


    public JwtDto(Long id, String token, String name, String lastName, String email, Collection<? extends GrantedAuthority> authority) {
        this.id = id;
        this.token = token;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.authority = authority;
    }
}
