package com.grocery.backend.service;

import com.grocery.backend.entity.Order;
import com.grocery.backend.entity.OrderItem;
import com.grocery.backend.entity.Product;
import com.grocery.backend.entity.User;
import com.grocery.backend.repository.OrderRepository;
import com.grocery.backend.repository.ProductRepository;
import com.grocery.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    void createOrderUsesCurrentPricesAndDecrementsStock() {
        User user = new User(1L, "Ada", "ada@example.com", "encoded", "CUSTOMER");
        Product product = new Product();
        product.setId(2L);
        product.setName("Apples");
        product.setPrice(2.5);
        product.setStock(10);
        OrderItem requestItem = new OrderItem();
        Product productReference = new Product();
        productReference.setId(2L);
        requestItem.setProduct(productReference);
        requestItem.setQuantity(3);
        Order request = new Order();
        request.setShippingAddress("123 Main");
        request.setMobileNumber("9876543210");
        request.setItems(List.of(requestItem));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(2L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Order result = orderService.createOrder(1L, request);

        assertSame(user, result.getUser());
        assertEquals("PLACED", result.getStatus());
        assertEquals("123 Main", result.getShippingAddress());
        assertEquals("9876543210", result.getMobileNumber());
        assertEquals(7.5, result.getTotalAmount());
        assertEquals(1, result.getItems().size());
        assertEquals(7, product.getStock());
        assertEquals(2.5, result.getItems().get(0).getPrice());
        assertSame(result, result.getItems().get(0).getOrder());
        verify(productRepository).save(product);
    }

    @Test
    void createOrderRejectsUnknownUserProductAndInsufficientStock() {
        Order request = new Order();
        request.setItems(List.of());
        when(userRepository.findById(9L)).thenReturn(Optional.empty());
        RuntimeException missingUser = assertThrows(RuntimeException.class,
                () -> orderService.createOrder(9L, request));
        assertEquals("User not found", missingUser.getMessage());

        User user = new User();
        Product reference = new Product();
        reference.setId(4L);
        OrderItem item = new OrderItem();
        item.setProduct(reference);
        item.setQuantity(1);
        request.setItems(List.of(item));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(4L)).thenReturn(Optional.empty());
        RuntimeException missingProduct = assertThrows(RuntimeException.class,
                () -> orderService.createOrder(1L, request));
        assertEquals("Product not found", missingProduct.getMessage());

        Product outOfStock = new Product();
        outOfStock.setId(4L);
        outOfStock.setName("Milk");
        outOfStock.setStock(0);
        when(productRepository.findById(4L)).thenReturn(Optional.of(outOfStock));
        RuntimeException insufficient = assertThrows(RuntimeException.class,
                () -> orderService.createOrder(1L, request));
        assertEquals("Insufficient stock for Milk", insufficient.getMessage());
    }

    @Test
    void delegatesOrderQueriesAndStatusUpdate() {
        Order order = new Order();
        when(orderRepository.findByUserId(1L)).thenReturn(List.of(order));
        when(orderRepository.findAll()).thenReturn(List.of(order));
        when(orderRepository.findById(2L)).thenReturn(Optional.of(order));
        when(orderRepository.save(order)).thenReturn(order);

        assertEquals(List.of(order), orderService.getOrdersByUser(1L));
        assertEquals(List.of(order), orderService.getAllOrders());
        assertSame(order, orderService.updateOrderStatus(2L, "SHIPPED"));
        assertEquals("SHIPPED", order.getStatus());
    }

    @Test
    void updateOrderStatusThrowsWhenMissing() {
        when(orderRepository.findById(8L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> orderService.updateOrderStatus(8L, "CANCELLED"));

        assertEquals("Order not found", exception.getMessage());
    }
}
