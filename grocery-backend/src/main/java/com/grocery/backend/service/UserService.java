package com.grocery.backend.service;

import com.grocery.backend.entity.User;
import com.grocery.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // =========================
    // REGISTER USER
    // =========================

    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("CUSTOMER");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }


    // =========================
    // LOGIN
    // =========================

    public Optional<User> login(
            String email,
            String password) {

        Optional<User> user =
                userRepository.findByEmail(email);

        if (user.isPresent() &&
            passwordEncoder.matches(password, user.get().getPassword())) {

            return user;
        }

        return Optional.empty();
    }


    // =========================
    // GET ALL USERS
    // =========================

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }


    // =========================
    // GET USER BY ID
    // =========================

    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "User not found"
                    )
                );
    }


    // =========================
    // UPDATE USER
    // =========================

    public User updateUser(
            Long id,
            User userDetails) {

        User user = getUserById(id);

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());

        return userRepository.save(user);
    }


    // =========================
    // DELETE USER
    // =========================

    public void deleteUser(Long id) {

        User user = getUserById(id);

        userRepository.delete(user);
    }
}