import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile } from "../services/userService";

import "./Profile.css";

function Profile() {
  const { token, user: authUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setProfile(data.data);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="error-state">
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div>
            <h1>My Profile</h1>
            <p>View your account information</p>
          </div>
        </div>

        <div className="profile-card card">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>

          <div className="profile-details">
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-role">
              <span className={`badge ${
                profile.role === "admin" 
                  ? "badge-confirmed" 
                  : "badge-pending"
              }`}>
                {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
              </span>
            </p>
          </div>

          <div className="profile-info">
            <div className="profile-item">
              <div className="item-label">
                <span className="label-icon">📧</span>
                <span>Email</span>
              </div>
              <p className="item-value">{profile.email}</p>
            </div>

            <div className="profile-item">
              <div className="item-label">
                <span className="label-icon">🆔</span>
                <span>Member ID</span>
              </div>
              <p className="item-value">{profile._id.slice(-8).toUpperCase()}</p>
            </div>

            <div className="profile-item">
              <div className="item-label">
                <span className="label-icon">📅</span>
                <span>Joined</span>
              </div>
              <p className="item-value">
                {new Date(profile.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/dashboard" className="btn btn-outline">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
