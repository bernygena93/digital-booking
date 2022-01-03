package com.dh.grupo7.digitalbookingapi.service;

import com.dh.grupo7.digitalbookingapi.dto.UserDto;
import com.dh.grupo7.digitalbookingapi.entity.UserEntity;
import com.dh.grupo7.digitalbookingapi.repository.UserRepository;
import com.sun.mail.util.MailSSLSocketFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.Properties;

@Service
@Transactional
public class UserService implements IUserService {
    private final UserRepository userRepository;
    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void save(UserEntity userEntity) {
        userRepository.save(userEntity);
    }

    @Override
    public Optional<UserEntity> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }


    public void sendVerificationEmail(UserEntity userEntity) throws MessagingException, UnsupportedEncodingException {
        String subject = "Gracias por registrarte en DigitalBooking";
        String senderName = "Digital Booking";
        String url = "http://www.digitalbooking.co/verifycode/" + userEntity.getVerificationCode() ;
        String content = "<table align= center style='font-family: Helvetica, Arial, sans-serif; width: 100%;'><tbody><tr ><td align= center style='vertical-align: middle; height: 8rem; background-color: #fbc02d; color: #ffffff;font-weight: 600; '><h1 style='padding-top: 1rem'>Bienvenido a DigitalBooking</h1></td></tr><tr><td align= center style='padding-top: 1.5rem; font-size: 1rem; font-weight: 500'>¡Hola, " + userEntity.getName() + " " + userEntity.getLastName() + "!</td></tr><tr><td align= center style='width: 50%; text-align: center; font-weight: 600;  margin:0 auto; padding-bottom: 0.5rem; padding-top: 2rem; font-size: 1.3rem; color: #263238'>¡Muchas gracias por utilizar nuestros servicios!</td></tr><tr><td align= center >Para poder disfrutar de nuestros beneficios te solicitamos que hagas click en el siguiente enlace para verificar la cuenta.</td></tr><tr><td align= center style='padding: 2rem; cursor: pointer'><a href=" + url + " style='text-decoration: none; '><button style='background-color: #263238; cursor: pointer; margin:0 auto; padding: 1rem 3rem; border-radius: 0.5rem; border: none; color: #ffffff; font-size: 1.3rem; font-weight: bold'>Verificá tu email</button></a></td></tr><td align= center>Te agradece<br>El equipo de DigitalBooking</td></tbody></table>";

        MimeMessage mailMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mailMessage);

        helper.setFrom("digitalBooking@gmail.com", senderName);
        helper.setTo(userEntity.getEmail());
        helper.setSubject(subject);
        helper.setText(content, true);

        javaMailSender.send(mailMessage);
    }

    @Override
    public Optional<UserEntity> findByVerificationCode(String code) {
        UserEntity userEntity = userRepository.findByVerificationCode(code).orElse(null);
        if(userEntity != null){
            userEntity.setEnabled(true);
            userRepository.save(userEntity);
        }else{

        }
        return Optional.empty();
    }

}
