import React from 'react';

function About({ onNavigate }) {
    return (
        <main className="modern-about-page">
            <section className="about-hero">
                <div className="about-hero-container">
                    <div className="about-hero-content">
                        <span className="section-kicker">About PasumaiCart</span>
                        <h2>Good food, made easier.</h2>
                        <p>
                            We bring everyday groceries together so planning meals and filling your basket feels simple. 
                            PasumaiCart is built around the things that matter on a busy day: a clear selection, dependable quality, and an easy checkout experience.
                        </p>
                        <p>
                            Browse by category, keep your basket organized, and track your orders from one calm, convenient place.
                        </p>
                        <button className="btn-primary mt-4" onClick={() => onNavigate("products")}>Start Shopping</button>
                    </div>
                    <div className="about-hero-image">
                        <img 
                            src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800" 
                            alt="Fresh Grocery Store" 
                        />
                    </div>
                </div>
            </section>

            <section className="about-values-section">
                <div className="section-header">
                    <h2>What Drives Us</h2>
                </div>
                <div className="modern-values-grid">
                    <article className="value-card">
                        <div className="value-icon">🎯</div>
                        <h3>Our Mission</h3>
                        <p>To provide high-quality, fresh groceries to everyone, everywhere, with speed and reliability.</p>
                    </article>
                    <article className="value-card">
                        <div className="value-icon">🤝</div>
                        <h3>Our Promise</h3>
                        <p>We guarantee freshness and quality in every order. If you're not satisfied, we'll make it right.</p>
                    </article>
                    <article className="value-card">
                        <div className="value-icon">💡</div>
                        <h3>Why We Started</h3>
                        <p>We saw a need for a simpler, more dependable way to get weekly groceries without the hassle of crowded stores.</p>
                    </article>
                </div>
            </section>
        </main>
    );
}

export default About;
