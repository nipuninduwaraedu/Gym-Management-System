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
          token
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
    return <div className="pricing-message">Loading memberships...</div>;
  }

  if (error) {
    return <div className="pricing-message">{error}</div>;
  }

  return (
    <section className="pricing-page">
      <h1>Membership Plans</h1>

      {isAdmin && (
        <div className="admin-controls">
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add New Membership"}
          </button>
        </div>
      )}

      {isAdmin && showForm && (
        <div className="membership-form">
          <h3>{editingMembership ? "Edit Membership" : "Create New Membership"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Price (LKR)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                required
                min="0"
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
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit">
              {editingMembership ? "Update" : "Create"}
            </button>
          </form>
        </div>
      )}

      <div className="pricing-container">
        {memberships.map((membership) => (
          <div key={membership._id} className="pricing-card">
            <h2>{membership.name}</h2>
            <h3>LKR {membership.price}</h3>
            <p>{membership.duration} Month(s)</p>
            <p>{membership.description}</p>

            {isAdmin && (
              <div className="card-actions">
                <button onClick={() => handleEdit(membership)}>Edit</button>
                <button onClick={() => handleDelete(membership._id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}

        {memberships.length === 0 && (
          <p className="pricing-message">No membership plans found</p>
        )}
      </div>
    </section>
  );
}

export default Pricing;
