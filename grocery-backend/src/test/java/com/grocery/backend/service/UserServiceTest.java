package com.grocery.backend.service;

import com.grocery.backend.entity.User;
import com.grocery.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void registerUserDefaultsRoleAndEncodesPassword() {
        User user = new User(null, "Ada", "ada@example.com", "plain", null);
        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(passwordEncoder.encode("plain")).thenReturn("encoded");
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.registerUser(user);

        assertSame(user, result);
        assertEquals("CUSTOMER", user.getRole());
        assertEquals("encoded", user.getPassword());
        verify(userRepository).save(user);
    }

    @Test
    void registerUserRejectsDuplicateEmail() {
        User user = new User(null, "Ada", "ada@example.com", "plain", "CUSTOMER");
        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.registerUser(user));

        assertEquals("Email already registered", exception.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void loginReturnsUserOnlyForMatchingPassword() {
        User user = new User(1L, "Ada", "ada@example.com", "encoded", "CUSTOMER");
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("plain", "encoded")).thenReturn(true);

        assertEquals(Optional.of(user), userService.login(user.getEmail(), "plain"));

        when(passwordEncoder.matches("wrong", "encoded")).thenReturn(false);
        assertTrue(userService.login(user.getEmail(), "wrong").isEmpty());
    }

    @Test
    void loginReturnsEmptyWhenEmailIsUnknown() {
        when(userRepository.findByEmail("missing@example.com")).thenReturn(Optional.empty());

        assertTrue(userService.login("missing@example.com", "plain").isEmpty());
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    void getAndUpdateAndDeleteUserUseRepository() {
        User existing = new User(1L, "Old", "old@example.com", "encoded", "CUSTOMER");
        User details = new User(null, "New", "new@example.com", null, null);
        when(userRepository.findAll()).thenReturn(List.of(existing));
        when(userRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(userRepository.save(existing)).thenReturn(existing);

        assertEquals(List.of(existing), userService.getAllUsers());
        assertSame(existing, userService.getUserById(1L));
        assertSame(existing, userService.updateUser(1L, details));
        assertEquals("New", existing.getName());
        assertEquals("new@example.com", existing.getEmail());

        userService.deleteUser(1L);
        verify(userRepository).delete(existing);
    }

    @Test
    void getUserByIdThrowsWhenMissing() {
        when(userRepository.findById(9L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.getUserById(9L));

        assertEquals("User not found", exception.getMessage());
    }
}
