package com.grocery.backend.controller;

import com.grocery.backend.entity.Order;
import com.grocery.backend.entity.User;
import com.grocery.backend.service.OrderService;
import com.grocery.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createOrder(
            @PathVariable Long userId,
            @RequestBody Order order,
            Principal principal,
            Authentication authentication) {
            
        try {
            User targetUser = userService.getUserById(userId);
            
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
                    
            if (!isAdmin && !targetUser.getEmail().equals(principal.getName())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied");
            }

            Order savedOrder =
                    orderService.createOrder(
                            userId,
                            order
                    );

            return ResponseEntity.ok(savedOrder);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserOrders(
            @PathVariable Long userId,
            Principal principal,
            Authentication authentication) {

        try {
            User targetUser = userService.getUserById(userId);
            
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
                    
            if (!isAdmin && !targetUser.getEmail().equals(principal.getName())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied");
            }
            
            return ResponseEntity.ok(orderService.getOrdersByUser(userId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                orderService.updateOrderStatus(
                        id,
                        status
                )
        );
    }
}