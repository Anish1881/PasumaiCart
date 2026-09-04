package com.grocery.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    // Make sure the secret is long enough (at least 256 bits)
    private static final String SECRET_KEY_STRING = "ThisIsAVerySecureSecretKeyForGroceryAppJWTToken1234567890!";
    
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());

    // Generate token with email as subject and role as a claim
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours expiration
                .signWith(key)
                .compact();
    }

    // Extract Email (Subject)
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extract Role (Claim)
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // Generic method to extract claims using JJWT 0.12.x syntax
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}