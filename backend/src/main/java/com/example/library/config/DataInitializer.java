package com.example.library.config;

import com.example.library.model.Role;
import com.example.library.model.User;
import com.example.library.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin1@library.com";
            if (userRepository.existsByEmail(adminEmail)) {
                return;
            }
            User admin = new User();
            admin.setName("Admin One");
            admin.setEmail(adminEmail);
            admin.setPasswordHash(passwordEncoder.encode("Admin1Password!"));
            admin.setMobile("0000000000");
            admin.setAbout("Primary library administrator");
            admin.setRoles(Set.of(Role.ADMIN));
            userRepository.save(admin);
        };
    }
}

