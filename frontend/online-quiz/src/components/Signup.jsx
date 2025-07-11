import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        mobile: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validate = () => {
        if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setError("Invalid email address.");
            return false;
        }
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return false;
        }
        if (!form.mobile.match(/^\d{10}$/)) {
            setError("Mobile must be 10 digits.");
            return false;
        }
        setError("");
        return true;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        if (!validate()) return;
        try {
            // Replace the URL with your backend endpoint
            await axios.post("localhost:3000/api/signup", form);
            setSuccess("Signup successful!");
            setForm({ email: "", password: "", mobile: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed.");
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="card shadow-lg p-4" style={{ maxWidth: 400, width: '100%', background: 'rgba(255,255,255,0.95)' }}>
                <h2 className="mb-4 text-center" style={{ fontWeight: 700, color: '#2c3e50' }}>Online Test Portal</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" required value={form.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" required value={form.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input type="tel" className="form-control" id="mobile" name="mobile" required value={form.mobile} onChange={handleChange} />
                    </div>
                    {error && <div className="alert alert-danger py-1">{error}</div>}
                    {success && <div className="alert alert-success py-1">{success}</div>}
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
                <div className="mt-3 text-center">
                    <span>Already have an account? </span>
                    <Link to="/">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;