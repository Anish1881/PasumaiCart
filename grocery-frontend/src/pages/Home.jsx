import React from 'react';

function Home({ onShopNow, categories = [], products = [], onAddToCart }) {
    
    // Fallback if categories are not loaded yet
    const displayCategories = categories.length > 0 
        ? categories 
        : [
            { id: 1, name: "Fruits" }, { id: 2, name: "Vegetables" }, 
            { id: 3, name: "Dairy" }, { id: 4, name: "Beverages" }, 
            { id: 5, name: "Snacks" }
        ];

    // Take top 4 or 8 products for popular section
    const popularProducts = products.length > 0 ? products.slice(0, 8) : [];

    return (
        <main className="home-page">
            
            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <span className="hero-label">FRESH & QUALITY</span>
                        <h1 className="hero-title">
                            Fresh Groceries <br/>
                            <span className="text-primary">Delivered to Your Door</span>
                        </h1>
                        <p className="hero-description">
                            Shop fresh vegetables, fruits, dairy, and daily essentials.
                            Fast delivery, affordable prices, and high-quality local produce.
                        </p>
                        
                        <div className="hero-search">
                            <div className="search-input-wrapper">
                                <span className="search-icon">🔍</span>
                                <input type="text" placeholder="Search for grocery items..." className="search-input" />
                            </div>
                            <button className="search-btn" onClick={onShopNow}>Search</button>
                        </div>
                        
                        <div className="hero-actions">
                            <button className="btn-primary" onClick={onShopNow}>Shop Now</button>
                            <button className="btn-secondary">Learn More</button>
                        </div>
                    </div>
                    
                    <div className="hero-image-container">
                        <img 
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" 
                            alt="Fresh Groceries" 
                            className="hero-image"
                        />
                        <div className="hero-badge">
                            <span className="badge-icon">🛍️</span>
                            <div className="badge-text">
                                <strong>Fast Delivery</strong>
                                <span>Under 30 mins</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURE SECTION */}
            <section className="features-section">
                <div className="features-container">
                    <div className="feature-card">
                        <div className="feature-icon">🚚</div>
                        <h3>Fast Delivery</h3>
                        <p>Get your groceries delivered in under 30 minutes</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Quality Assured</h3>
                        <p>Fresh, organic, and locally sourced products</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🕐</div>
                        <h3>24/7 Service</h3>
                        <p>Order anytime, day or night</p>
                    </div>
                </div>
            </section>

            {/* SHOP BY CATEGORY */}
            <section className="categories-section">
                <div className="section-header">
                    <h2>Shop by Category</h2>
                    <p>Everything you need for your everyday grocery shopping.</p>
                </div>
                
                <div className="categories-grid">
                    {displayCategories.map(category => (
                        <div key={category.id} className="category-card" onClick={onShopNow}>
                            <div className="category-icon-wrapper">
                                <span className="category-icon-placeholder">
                                    {category.name.charAt(0)}
                                </span>
                            </div>
                            <h4>{category.name}</h4>
                            <span className="category-count">10+ Items</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* POPULAR PRODUCTS */}
            {popularProducts.length > 0 && (
                <section className="popular-products-section">
                    <div className="section-header with-link">
                        <h2>Popular Products</h2>
                        <button className="view-all-link" onClick={onShopNow}>View All →</button>
                    </div>
                    
                    <div className="products-grid">
                        {popularProducts.map(product => (
                            <div key={product.id} className="modern-product-card">
                                <div className="card-image-wrapper">
                                    <button className="wishlist-btn">♡</button>
                                    <img src={product.imageUrl} alt={product.name} />
                                </div>
                                <div className="card-content">
                                    <h3 className="product-title">{product.name}</h3>
                                    <span className="product-category-label">{product.category?.name || "Grocery"}</span>
                                    <div className="card-footer">
                                        <span className="product-price">₹{product.price}</span>
                                        <button 
                                            className="add-to-cart-btn"
                                            onClick={() => onAddToCart(product, 1)}
                                        >
                                            + Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* PROMOTIONAL BANNER */}
            <section className="promo-banner">
                <div className="promo-content">
                    <h2>Freshness You Can Trust</h2>
                    <p>Get quality groceries delivered right to your doorstep.</p>
                    <button className="promo-btn" onClick={onShopNow}>Shop Now</button>
                </div>
            </section>

            {/* WHY PASUMAICART */}
            <section className="why-us-section">
                <div className="section-header">
                    <h2>Why Choose PasumaiCart?</h2>
                </div>
                
                <div className="why-us-grid">
                    <div className="why-card">
                        <span className="why-icon">🌱</span>
                        <h4>Fresh Products</h4>
                        <p>Carefully selected everyday essentials</p>
                    </div>
                    <div className="why-card">
                        <span className="why-icon">🚚</span>
                        <h4>Fast Delivery</h4>
                        <p>Quick and reliable doorstep delivery</p>
                    </div>
                    <div className="why-card">
                        <span className="why-icon">💰</span>
                        <h4>Affordable Prices</h4>
                        <p>Quality groceries at competitive prices</p>
                    </div>
                    <div className="why-card">
                        <span className="why-icon">🔒</span>
                        <h4>Secure Shopping</h4>
                        <p>Safe and reliable checkout</p>
                    </div>
                </div>
            </section>

        </main>
    );
}

export default Home;
