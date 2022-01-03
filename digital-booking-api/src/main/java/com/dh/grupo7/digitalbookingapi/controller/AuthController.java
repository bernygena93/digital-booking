package com.dh.grupo7.digitalbookingapi.controller;

import com.dh.grupo7.digitalbookingapi.dto.UserDto;
import com.dh.grupo7.digitalbookingapi.entity.RoleEntity;
import com.dh.grupo7.digitalbookingapi.entity.UserEntity;
import com.dh.grupo7.digitalbookingapi.enums.RoleName;
import com.dh.grupo7.digitalbookingapi.security.dto.JwtDto;
import com.dh.grupo7.digitalbookingapi.security.dto.UserSignInDto;
import com.dh.grupo7.digitalbookingapi.security.jwt.JwtProvider;
import com.dh.grupo7.digitalbookingapi.service.IRoleService;
import com.dh.grupo7.digitalbookingapi.service.IUserService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/auth")
public class AuthController {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    IUserService iUserService;
    @Autowired
    IRoleService iRoleService;
    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    JavaMailSender javaMailSender;

    @PostMapping(path = "/signup")
    public ResponseEntity<?> signUp(@RequestBody UserDto userSignUp) throws MessagingException, UnsupportedEncodingException {
        if (iUserService.existsByEmail(userSignUp.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("el email ya esta registrado");
        }

        UserEntity userEntity = new UserEntity(userSignUp.getName(),
                userSignUp.getLastName(),
                userSignUp.getEmail(),
                passwordEncoder.encode(userSignUp.getPassword()));

        RoleEntity roleEntity;
        roleEntity = iRoleService.findBYRoleName(RoleName.ROLE_USER).get();
        userEntity.setRoleEntity(roleEntity);
        userEntity.setUserName(userEntity.getEmail());
        userEntity.setEnabled(false);
        String verificationCode = RandomString.make(32);
        userEntity.setVerificationCode(verificationCode);
        iUserService.sendVerificationEmail(userEntity);
        iUserService.save(userEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado con éxito");
    }

    @PostMapping(path = "/signin")
    public ResponseEntity<?> signIn(@RequestBody UserSignInDto userSignIn) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userSignIn.getEmail(),
                        userSignIn.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserEntity userEntity = iUserService.findByEmail(userSignIn.getEmail()).orElse(null);
        if (userEntity != null && userEntity.getEnabled()) {
            JwtDto jwtDTO = new JwtDto(userEntity.getId(),jwt, userEntity.getName(), userEntity.getLastName(), userEntity.getEmail(), userDetails.getAuthorities());
            return ResponseEntity.status(HttpStatus.OK).body(jwtDTO);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario ingresado no existe");
    }

    @GetMapping(path = "/verifycode/{code}")
    public ResponseEntity<?> verificationCode(@PathVariable String code) {
        if (code != null) {
            iUserService.findByVerificationCode(code);
            return ResponseEntity.status(HttpStatus.OK).body("verificacion exitosa");
        } else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se pudo verificar el email");
    }
}
