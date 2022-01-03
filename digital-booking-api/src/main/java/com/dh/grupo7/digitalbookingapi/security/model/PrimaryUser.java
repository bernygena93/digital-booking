package com.dh.grupo7.digitalbookingapi.security.model;

import com.dh.grupo7.digitalbookingapi.entity.RoleEntity;
import com.dh.grupo7.digitalbookingapi.entity.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class PrimaryUser implements UserDetails {
    private String userName;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private GrantedAuthority authority;

    public PrimaryUser(String userName, String name, String lastName, String email, String password, GrantedAuthority authority) {
        this.userName = userName;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.authority = authority;
    }

    public static PrimaryUser build(UserEntity userEntity){
        RoleEntity roleEntity = userEntity.getRoleEntity();
        GrantedAuthority authority =
                new SimpleGrantedAuthority(roleEntity.getRoleName().name());
        return new PrimaryUser(userEntity.getUserName(), userEntity.getName(), userEntity.getLastName(), userEntity.getEmail(), userEntity.getPassword(), authority);
    }

    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return  userName;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
