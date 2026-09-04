import React, { useState } from 'react';

function Header({ user, cartCount, onNavigate, onLogout, activeTab }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <button className="brand-button" onClick={() => onNavigate("home")}>
                        <div className="brand-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2.04932C5.9529 2.54593 2 6.81188 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.81188 18.0471 2.54593 13 2.04932V4.06189C16.9472 4.5492 20 8.01633 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 8.01633 7.05281 4.5492 11 4.06189V2.04932ZM12 12L12 8C9.79086 8 8 9.79086 8 12H12Z"></path></svg>
                        </div>
                        <span className="brand-text">PasumaiCart</span>
                    </button>
                </div>

                <nav className={`header-center ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { onNavigate("home"); setIsMobileMenuOpen(false); }}>Home</button>
                    <button className={`nav-link ${activeTab === 'products' ? 'active' : ''}`} onClick={() => { onNavigate("products"); setIsMobileMenuOpen(false); }}>Shop</button>
                    <button className={`nav-link ${activeTab === 'about' ? 'active' : ''}`} onClick={() => { onNavigate("about"); setIsMobileMenuOpen(false); }}>Delivery</button>
                    <button className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => { onNavigate("contact"); setIsMobileMenuOpen(false); }}>Contact</button>
                </nav>

                <div className="header-right">
                    {user?.role === "ADMIN" && (
                        <button className="nav-link admin-link" onClick={() => onNavigate("admin")}>Admin</button>
                    )}
                    {user ? (
                        <div className="user-menu">
                            <button className="nav-link" onClick={() => onNavigate("orders")}>My Orders</button>
                            <span className="user-name">Hi, {user.name}</span>
                            <button className="logout-btn" onClick={onLogout}>Logout</button>
                        </div>
                    ) : (
                        <button className="login-btn" onClick={() => onNavigate("login")}>Login</button>
                    )}
                    
                    <button className="cart-btn" onClick={() => onNavigate("cart")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        <span className="cart-text">Cart</span>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                    
                    <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {isMobileMenuOpen ? (
                                <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
                            ) : (
                                <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
                            )}
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
