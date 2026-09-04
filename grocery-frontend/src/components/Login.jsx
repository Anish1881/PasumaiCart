import { useState } from "react";
import { loginUser } from "../services/userService";

function Login({ onRegisterClick, onLoginSuccess }) {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const response = await loginUser(formData);

            // Backend returns { token, user }
            const { token, user } = response.data;

            // Store token and user separately
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            onLoginSuccess(user);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (

        <section className="auth-section">

            <div className="auth-card">

                <h2>Welcome Back</h2>

                <p>Login to your grocery account.</p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

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
                        Login
                    </button>

                </form>

                <p className="auth-switch">
                    Don't have an account?
                    {" "}
                    <button
                        type="button"
                        onClick={onRegisterClick}
                        className="link-button"
                    >
                        Register
                    </button>
                </p>

            </div>

        </section>
    );
}

export default Login;