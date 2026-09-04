import React from 'react';

function ProductCard({ product, onAddToCart }) {
    return (
        <div className="modern-product-card">
            <div className="card-image-wrapper">
                <button className="wishlist-btn">♡</button>
                <img
                    src={
                        product.imageUrl ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={product.name}
                />
            </div>
            <div className="card-content">
                <h3 className="product-title">{product.name}</h3>
                {product.category && (
                    <span className="product-category-label">
                        {product.category.name}
                    </span>
                )}
                
                <p className="product-stock-status">
                    {product.stock > 0 ? (
                        <span className="in-stock">In Stock ({product.stock})</span>
                    ) : (
                        <span className="out-of-stock">Out of Stock</span>
                    )}
                </p>

                <div className="card-footer">
                    <span className="product-price">₹{product.price}</span>
                    <button
                        className="add-to-cart-btn"
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock <= 0}
                    >
                        + Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;