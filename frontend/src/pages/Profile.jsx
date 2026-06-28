import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile } from "../services/userService";

import "./Profile.css";

function Profile() {
  const { token } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setProfile(data.user);
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
    return <p className="profile-message">Loading profile...</p>;
  }

  if (error) {
    return <p className="profile-message">{error}</p>;
  }

  return (
    <section className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>

        <hr />

        <div className="profile-info">
          <div className="profile-item">
            <span>Name</span>
            <p>{profile.name}</p>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <p>{profile.email}</p>
          </div>

          <div className="profile-item">
            <span>Role</span>
            <p>{profile.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
