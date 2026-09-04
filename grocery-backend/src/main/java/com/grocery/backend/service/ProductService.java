package com.grocery.backend.service;

import com.grocery.backend.entity.Category;
import com.grocery.backend.entity.Product;
import com.grocery.backend.repository.CategoryRepository;
import com.grocery.backend.repository.ProductRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;


    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository) {

        this.productRepository = productRepository;

        this.categoryRepository = categoryRepository;
    }


    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }


    public Optional<Product> getProductById(Long id) {

        return productRepository.findById(id);
    }


    public Product createProduct(Product product) {

        if (product.getCategory() != null &&
                product.getCategory().getId() != null) {

            Category category =
                    categoryRepository.findById(
                            product.getCategory().getId()
                    ).orElseThrow(
                            () -> new RuntimeException(
                                    "Category not found"
                            )
                    );

            product.setCategory(category);
        }

        return productRepository.save(product);
    }


    public Product updateProduct(
            Long id,
            Product productDetails) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Product not found"
                                )
                        );


        product.setName(
                productDetails.getName()
        );

        product.setDescription(
                productDetails.getDescription()
        );

        product.setPrice(
                productDetails.getPrice()
        );

        product.setStock(
                productDetails.getStock()
        );

        product.setImageUrl(
                productDetails.getImageUrl()
        );


        if (productDetails.getCategory() != null &&
                productDetails.getCategory().getId() != null) {

            Category category =
                    categoryRepository.findById(
                            productDetails
                                    .getCategory()
                                    .getId()
                    ).orElseThrow(
                            () -> new RuntimeException(
                                    "Category not found"
                            )
                    );

            product.setCategory(category);
        }


        return productRepository.save(product);
    }


    public void deleteProduct(Long id) {

        productRepository.deleteById(id);
    }
}