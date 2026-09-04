import { useState } from "react";

function Contact() {

    const [sent, setSent] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSent(true);
    };

    return (
        <main className="info-page contact-page">
            <section className="info-hero">
                <span className="section-kicker">We are here to help</span>
                <h2>Contact our team.</h2>
                <p>Have a question about an order or a product? Send us a note and we will get back to you.</p>
            </section>

            <section className="contact-layout">
                <div className="contact-details">
                    <h3>Let&apos;s talk groceries.</h3>
                    <p>For order support, include your order number so we can help faster.</p>
                    <div><strong>Email</strong><span>hello@groceryshop.com</span></div>
                    <div><strong>Hours</strong><span>Monday to Saturday, 9:00 AM to 6:00 PM</span></div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>Name<input required name="name" placeholder="Your name" /></label>
                    <label>Email<input required type="email" name="email" placeholder="you@example.com" /></label>
                    <label>Message<textarea required name="message" rows="5" placeholder="How can we help?" /></label>
                    <button type="submit">Send message</button>
                    {sent && <p className="form-success">Thanks, your message has been received.</p>}
                </form>
            </section>
        </main>
    );
}

export default Contact;
