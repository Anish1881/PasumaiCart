package com.grocery.backend.security;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private final JwtService jwtService = new JwtService();

    @Test
    void generatedTokenContainsEmailAndRole() {
        String token = jwtService.generateToken("ada@example.com", "ADMIN");

        assertEquals("ada@example.com", jwtService.extractEmail(token));
        assertEquals("ADMIN", jwtService.extractRole(token));
    }

    @Test
    void tamperedTokenIsRejected() {
        String token = jwtService.generateToken("ada@example.com", "CUSTOMER");
        String tamperedToken = token.substring(0, token.length() - 1) + "x";

        assertThrows(RuntimeException.class, () -> jwtService.extractEmail(tamperedToken));
    }
}
