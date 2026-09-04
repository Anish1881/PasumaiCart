package com.grocery.backend.service;

import com.grocery.backend.entity.Order;
import com.grocery.backend.entity.OrderItem;
import com.grocery.backend.entity.Product;
import com.grocery.backend.entity.User;
import com.grocery.backend.repository.OrderRepository;
import com.grocery.backend.repository.ProductRepository;
import com.grocery.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {

        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Order createOrder(
            Long userId,
            Order orderRequest) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Order order = new Order();

        order.setUser(user);
        order.setShippingAddress(
                orderRequest.getShippingAddress()
        );
        order.setMobileNumber(orderRequest.getMobileNumber());
        order.setStatus("PLACED");
        order.setOrderDate(LocalDateTime.now());

        double total = 0.0;

        for (OrderItem requestItem : orderRequest.getItems()) {

            Product product = productRepository
                    .findById(requestItem.getProduct().getId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Product not found"
                            ));

            if (product.getStock() < requestItem.getQuantity()) {

                throw new RuntimeException(
                        "Insufficient stock for "
                                + product.getName()
                );
            }

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(requestItem.getQuantity());

            // Use current database price
            orderItem.setPrice(product.getPrice());

            total +=
                    product.getPrice()
                            * requestItem.getQuantity();

            product.setStock(
                    product.getStock()
                            - requestItem.getQuantity()
            );

            productRepository.save(product);

            order.getItems().add(orderItem);
        }

        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(Long userId) {

        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    public Order updateOrderStatus(
            Long id,
            String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found"
                        ));

        order.setStatus(status);

        return orderRepository.save(order);
    }
}