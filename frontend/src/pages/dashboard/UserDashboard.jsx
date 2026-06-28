import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./UserDashboard.css";

function UserDashboard() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();

    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>

      <hr />

      <h2>Welcome, {user?.name}</h2>

      <div className="user-info">
        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Role:</strong> {user?.role}
        </p>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserDashboard;
