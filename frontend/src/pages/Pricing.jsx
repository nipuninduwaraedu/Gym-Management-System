import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  getMemberships,
  createMembership,
  updateMembership,
  deleteMembership,
} from "../services/membershipService";

import "../styles/Pricing.css";

function Pricing() {
  const { user, token } = useContext(AuthContext);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
  });

  const isAdmin = user?.role === "admin";

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const data = await getMemberships();
      setMemberships(data);
    } catch (err) {
      setError(err.message || "Failed to load memberships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingMembership) {
        await updateMembership(editingMembership._id, formData, token);
      } else {
        await createMembership(
          {
            ...formData,
            price: Number(formData.price),
            duration: Number(formData.duration),
          },
          token,
        );
      }
      setShowForm(false);
      setEditingMembership(null);
      setFormData({
        name: "",
        price: "",
        duration: "",
        description: "",
      });
      fetchMemberships();
    } catch (err) {
      setError(err.message || "Failed to save membership");
    }
  };

  const handleEdit = (membership) => {
    setEditingMembership(membership);
    setFormData({
      name: membership.name,
      price: membership.price,
      duration: membership.duration,
      description: membership.description,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this membership?")) {
      try {
        await deleteMembership(id, token);
        fetchMemberships();
      } catch (err) {
        setError(err.message || "Failed to delete membership");
      }
    }
  };

  if (loading) {
    return (
      <div className="pricing-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading memberships...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !memberships.length) {
    return (
      <div className="pricing-page">
        <div className="container">
          <div className="error-state">
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pricing-page">
      <div className="container">
        <div className="pricing-header">
          <h1>Membership Plans</h1>
          <p>Choose the perfect plan for your fitness journey</p>

          {isAdmin && (
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "Add New Membership"}
            </button>
          )}
        </div>

        {isAdmin && showForm && (
          <div className="membership-form card">
            <h3>
              {editingMembership ? "Edit Membership" : "Create New Membership"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Plan Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g., Basic"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (LKR)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    required
                    min="0"
                    placeholder="e.g., 2000"
                  />
                </div>
                <div className="form-group">
                  <label>Duration (Months)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleFormChange}
                    required
                    min="1"
                    placeholder="e.g., 1"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g., Perfect for beginners..."
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingMembership(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMembership ? "Update Plan" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="pricing-grid">
          {memberships.map((membership, index) => (
            <div
              key={membership._id}
              className={`pricing-card card ${index === 1 ? "featured" : ""}`}
            >
              {index === 1 && <div className="popular-badge">Most Popular</div>}
              <h3>{membership.name}</h3>
              <div className="price">
                <span className="currency">LKR</span>
                <span className="amount">{membership.price}</span>
                <span className="period">
                  /{membership.duration} month
                  {membership.duration > 1 ? "s" : ""}
                </span>
              </div>
              <p className="description">{membership.description}</p>

              {isAdmin && (
                <div className="admin-actions">
                  <button
                    className="btn btn-outline small"
                    onClick={() => handleEdit(membership)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger small"
                    onClick={() => handleDelete(membership._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {memberships.length === 0 && (
            <div className="empty-state">
              <p className="empty-text">No membership plans yet</p>
              {isAdmin && (
                <p className="empty-hint">
                  Create your first plan to get started!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
