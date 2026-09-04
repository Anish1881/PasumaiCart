package com.grocery.backend.service;

import com.grocery.backend.entity.Category;
import com.grocery.backend.entity.Product;
import com.grocery.backend.repository.CategoryRepository;
import com.grocery.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void delegatesListingAndLookup() {
        Product product = new Product();
        when(productRepository.findAll()).thenReturn(List.of(product));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        assertEquals(List.of(product), productService.getAllProducts());
        assertEquals(Optional.of(product), productService.getProductById(1L));
    }

    @Test
    void createProductResolvesCategoryById() {
        Category requested = new Category();
        requested.setId(3L);
        Category persisted = new Category(3L, "Fruit", "Fresh");
        Product product = new Product();
        product.setCategory(requested);
        when(categoryRepository.findById(3L)).thenReturn(Optional.of(persisted));
        when(productRepository.save(product)).thenReturn(product);

        assertSame(product, productService.createProduct(product));
        assertSame(persisted, product.getCategory());
        verify(productRepository).save(product);
    }

    @Test
    void createProductWithoutCategoryStillSaves() {
        Product product = new Product();
        when(productRepository.save(product)).thenReturn(product);

        assertSame(product, productService.createProduct(product));
        verifyNoInteractions(categoryRepository);
    }

    @Test
    void createProductRejectsUnknownCategory() {
        Category category = new Category();
        category.setId(99L);
        Product product = new Product();
        product.setCategory(category);
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> productService.createProduct(product));

        assertEquals("Category not found", exception.getMessage());
        verify(productRepository, never()).save(any());
    }

    @Test
    void updateProductCopiesFieldsAndResolvesCategory() {
        Product existing = product("Old", 1.0, 2);
        Product details = product("New", 4.5, 8);
        Category category = new Category(4L, "Pantry", "Items");
        Category requested = new Category();
        requested.setId(4L);
        details.setCategory(requested);
        when(productRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(categoryRepository.findById(4L)).thenReturn(Optional.of(category));
        when(productRepository.save(existing)).thenReturn(existing);

        assertSame(existing, productService.updateProduct(1L, details));
        assertEquals("New", existing.getName());
        assertEquals(4.5, existing.getPrice());
        assertEquals(8, existing.getStock());
        assertSame(category, existing.getCategory());
    }

    @Test
    void updateProductRejectsMissingProduct() {
        when(productRepository.findById(7L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> productService.updateProduct(7L, new Product()));

        assertEquals("Product not found", exception.getMessage());
    }

    private Product product(String name, double price, int stock) {
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setStock(stock);
        return product;
    }
}
