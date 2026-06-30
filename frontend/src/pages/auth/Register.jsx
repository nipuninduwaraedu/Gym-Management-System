import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

import "./Login.css";

function Register() {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser(formData);

      console.log("REGISTER RESPONSE:", data);

      login(data.user, data.token);

      setSuccess(data.message);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-logo">💪</div>
          <h2>Create Account</h2>
          <p>Join FitLife Gym today!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label>Select Your Role</label>
            <div className="role-selector">
              <label
                className={`role-option ${
                  formData.role === "user" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                <span className="role-label">
                  <span className="role-icon">🏋️</span>
                  <span className="role-name">User</span>
                </span>
              </label>

              <label
                className={`role-option ${
                  formData.role === "admin" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />
                <span className="role-label">
                  <span className="role-icon">👑</span>
                  <span className="role-name">Admin</span>
                </span>
              </label>
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
