import React from 'react';

function Footer({ onNavigate }) {
    return (
        <footer className="modern-footer">
            <div className="footer-container">
                <div className="footer-left">
                    <button className="footer-brand" onClick={() => onNavigate("home")}>
                        <div className="footer-brand-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2.04932C5.9529 2.54593 2 6.81188 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.81188 18.0471 2.54593 13 2.04932V4.06189C16.9472 4.5492 20 8.01633 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 8.01633 7.05281 4.5492 11 4.06189V2.04932ZM12 12L12 8C9.79086 8 8 9.79086 8 12H12Z"></path></svg>
                        </div>
                        <span>PasumaiCart</span>
                    </button>
                    <p className="footer-tagline">Fresh groceries delivered to your doorstep.</p>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h3>Shop</h3>
                        <button onClick={() => onNavigate("products")}>Fruits</button>
                        <button onClick={() => onNavigate("products")}>Vegetables</button>
                        <button onClick={() => onNavigate("products")}>Dairy</button>
                        <button onClick={() => onNavigate("products")}>All Products</button>
                    </div>

                    <div className="footer-column">
                        <h3>Company</h3>
                        <button onClick={() => onNavigate("about")}>About</button>
                        <button onClick={() => onNavigate("contact")}>Contact</button>
                        <button onClick={() => onNavigate("about")}>Delivery</button>
                    </div>

                    <div className="footer-column">
                        <h3>Support</h3>
                        <button onClick={() => onNavigate("orders")}>My Orders</button>
                        <button onClick={() => onNavigate("contact")}>Help</button>
                        <button onClick={() => onNavigate("contact")}>Contact Us</button>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>© 2026 PasumaiCart. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
