package com.dh.grupo7.digitalbookingapi.security.service;
import com.dh.grupo7.digitalbookingapi.entity.UserEntity;
import com.dh.grupo7.digitalbookingapi.model.User;
import com.dh.grupo7.digitalbookingapi.security.model.PrimaryUser;
import com.dh.grupo7.digitalbookingapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    @Autowired
    public UserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email).get();
        return PrimaryUser.build(user);
    }
}
