import React, { useState } from "react";
import "./css/login.css"; // Import the CSS file for styling
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // hook to navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and Password cannot be blank.");
      return;
    }
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // Proceed with login logic here
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        if (response.success === false) {
          const data = await response.json();
          setError("Login failed.");
          return;
        }
        // Handle successful login (e.g., redirect or store token)
        const data = await response.json();
        console.log(data);
        if (data.success && data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.loginData));
          //window.location.href = "/dashboard";
          navigate("/dashboard");
        } else {
          setError("Login failed.");
        }
      })
      .catch(() => {
        setError("Network error. Please try again later.");
      });
  };

  return (
    <div className="parent">
      <div className="sub-parent ">
        <h2 className="heading">Online Quiz Portal</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="user_email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="user_email"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user_password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="user_password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
