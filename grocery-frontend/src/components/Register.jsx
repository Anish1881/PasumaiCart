import { useState } from "react";
import { registerUser } from "../services/userService";

function Register({ onLoginClick }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            await registerUser({
                ...formData,
                role: "CUSTOMER"
            });

            setMessage("Registration successful! You can now login.");

            setFormData({
                name: "",
                email: "",
                password: ""
            });

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (

        <section className="auth-section">

            <div className="auth-card">

                <h2>Create Account</h2>

                <p>Join PasumaiCart today.</p>

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p className="auth-switch">
                    Already have an account?
                    {" "}
                    <button
                        type="button"
                        onClick={onLoginClick}
                        className="link-button"
                    >
                        Login
                    </button>
                </p>

            </div>

        </section>
    );
}

export default Register;