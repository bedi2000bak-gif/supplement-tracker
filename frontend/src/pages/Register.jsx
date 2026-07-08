import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  function handleRegister(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    api.post("/api/auth/register", { email, password })
      .then(response => {
        setError(null);
        navigate("/login");
      })
      .catch(error => {
        console.error("Error registering user:", error);

        if (error.response?.status === 409) {
          setError("Email already exists. Please use a different email.");
        }
        else if(error.response?.status === 400) {
          setError(error.response.data.error);
    
        } else {
          setError("Failed to register. Please try again.");
        }
      });
  }

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2>Register</h2>
        <p className="auth-subtitle">Create your account to get started.</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleRegister}>
          <input name="email" type="email" className="form-input" placeholder="Email" />
          <input name="password" type="password" className="form-input" placeholder="Password" />
          <button name="submit" type="submit" className="btn-primary btn-full">Register</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;
