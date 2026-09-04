package com.grocery.backend.service;

import com.grocery.backend.entity.Category;
import com.grocery.backend.repository.CategoryRepository;
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
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    @Test
    void supportsListCreateUpdateAndDelete() {
        Category existing = new Category(1L, "Old", "Old description");
        Category details = new Category(null, "New", "New description");
        when(categoryRepository.findAll()).thenReturn(List.of(existing));
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(categoryRepository.save(existing)).thenReturn(existing);

        assertEquals(List.of(existing), categoryService.getAllCategories());
        assertSame(existing, categoryService.createCategory(existing));
        assertSame(existing, categoryService.updateCategory(1L, details));
        assertEquals("New", existing.getName());
        assertEquals("New description", existing.getDescription());

        categoryService.deleteCategory(1L);
        verify(categoryRepository).deleteById(1L);
    }

    @Test
    void getCategoryByIdThrowsWhenMissing() {
        when(categoryRepository.findById(5L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> categoryService.getCategoryById(5L));

        assertEquals("Category not found", exception.getMessage());
    }
}
