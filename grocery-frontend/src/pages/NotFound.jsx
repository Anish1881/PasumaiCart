function NotFound({ onNavigate }) {

    return (
        <main className="not-found-page">
            <span className="not-found-code">404</span>
            <span className="section-kicker">Page not found</span>
            <h2>This aisle is empty.</h2>
            <p>The page you are looking for does not exist or may have moved.</p>
            <div className="not-found-actions">
                <button onClick={() => onNavigate("home")}>Back to home</button>
                <button className="nav-button" onClick={() => onNavigate("products")}>Browse products</button>
            </div>
        </main>
    );
}

export default NotFound;
