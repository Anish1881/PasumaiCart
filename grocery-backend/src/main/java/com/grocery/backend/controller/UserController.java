package com.grocery.backend.controller;

import com.grocery.backend.entity.User;
import com.grocery.backend.service.UserService;
import com.grocery.backend.security.JwtService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(
            UserService userService,
            JwtService jwtService) {

        this.userService = userService;
        this.jwtService = jwtService;
    }


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        try {

            User savedUser =
                    userService.registerUser(user);

            // Never return password
            savedUser.setPassword(null);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedUser);

        } catch (RuntimeException e) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User loginRequest) {

        Optional<User> user =
                userService.login(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                );

        if (user.isPresent()) {

            User loggedInUser = user.get();

            // Generate JWT
            String token =
                    jwtService.generateToken(
                            loggedInUser.getEmail(),
                            loggedInUser.getRole()
                    );

            // Never return password
            loggedInUser.setPassword(null);

            Map<String, Object> response =
                    new HashMap<>();

            response.put("token", token);
            response.put("user", loggedInUser);

            return ResponseEntity.ok(response);
        }

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Invalid email or password"
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }


    // =========================
    // GET ALL USERS
    // ADMIN FEATURE
    // =========================

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        List<User> users =
                userService.getAllUsers();

        // Remove passwords
        for (User user : users) {
            user.setPassword(null);
        }

        return ResponseEntity.ok(users);
    }


    // =========================
    // GET USER BY ID
    // ADMIN FEATURE
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(
            @PathVariable Long id) {

        try {

            User user =
                    userService.getUserById(id);

            user.setPassword(null);

            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(response);
        }
    }


    // =========================
    // UPDATE USER
    // ADMIN FEATURE
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User userDetails) {

        try {

            User updatedUser =
                    userService.updateUser(
                            id,
                            userDetails
                    );

            updatedUser.setPassword(null);

            return ResponseEntity.ok(
                    updatedUser
            );

        } catch (RuntimeException e) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }
    }


    // =========================
    // DELETE USER
    // ADMIN FEATURE
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id) {

        try {

            userService.deleteUser(id);

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (RuntimeException e) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }
    }
}