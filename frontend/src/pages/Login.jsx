import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        api.post("/api/auth/login", { email, password })
            .then(response => {
                localStorage.setItem("token", response.data.token);
                setError(null);
                navigate("/dashboard");
            })
            .catch(error => {
                if (error.response?.status === 401) {
                    setError("Invalid email or password. Please try again.");
                } else {
                    setError("Failed to login. Please try again.");
                }
            });
    }
    return (
        <div className="auth-page">
            <div className="card auth-card">
                <h2>Login</h2>
                <p className="auth-subtitle">Welcome back! Track your supplements.</p>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input name="email" type="email" className="form-input" placeholder="Email" />
                    <input name="password" type="password" className="form-input" placeholder="Password" />
                    <button name="submit" type="submit" className="btn-primary btn-full">Login</button>
                </form>

                <p className="auth-switch">
                    No account yet? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
