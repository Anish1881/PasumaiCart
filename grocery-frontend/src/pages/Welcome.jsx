function Welcome({ onContinue }) {

    return (
        <main className="welcome-page">
            <section className="welcome-panel">
                <div className="welcome-mark">GS</div>
                    <span className="section-kicker">Welcome to PasumaiCart</span>
                <h1>Fresh choices for every table.</h1>
                <p>Shop trusted everyday essentials, build your basket, and have groceries ready when you need them.</p>
                <button className="welcome-action" onClick={onContinue}>Continue to login</button>
                <div className="welcome-points">
                    <span>Fresh essentials</span>
                    <span>Easy checkout</span>
                    <span>Personal orders</span>
                </div>
            </section>
            <aside className="welcome-aside">
                <span>01</span>
                <p>Make your everyday shop a little simpler.</p>
            </aside>
        </main>
    );
}

export default Welcome;
