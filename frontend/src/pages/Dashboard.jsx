import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
  getUserDashboard,
  getAdminDashboard,
} from "../services/dashboardService";

import "./Dashboard.css";

function Dashboard() {
  const { token, user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAdmin) {
          const res = await getAdminDashboard(token);
          setData(res);
        } else {
          const res = await getUserDashboard(token);
          setData(res);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin, token]);

  // User Dashboard View
  if (!isAdmin) {
    const latestBooking = data.length > 0 ? data[data.length - 1] : null;

    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="dashboard-header">
            <div>
              <h1>Welcome back, {user?.name}!</h1>
              <p>Here's what's happening with your gym sessions</p>
            </div>
            <Link to="/booking" className="btn btn-primary">
              Book New Session
            </Link>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading dashboard...</p>
            </div>
          ) : (
            <>
              <div className="stats-grid">
                <div className="stat-card card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-content">
                    <div className="stat-number">{data.length}</div>
                    <div className="stat-label">Total Bookings</div>
                  </div>
                </div>

                {latestBooking && (
                  <div className="stat-card card">
                    <div className="stat-icon">⏰</div>
                    <div className="stat-content">
                      <div className="stat-number">
                        {new Date(latestBooking.date).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </div>
                      <div className="stat-label">
                        {latestBooking.time}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="dashboard-section">
                <div className="section-header">
                  <h2>Quick Actions</h2>
                </div>
                <div className="quick-actions">
                  <Link to="/my-bookings" className="action-card card">
                    <div className="action-icon">📋</div>
                    <div className="action-text">
                      <h3>View My Bookings</h3>
                      <p>See all your scheduled gym sessions</p>
                    </div>
                  </Link>
                  <Link to="/booking" className="action-card card">
                    <div className="action-icon">➕</div>
                    <div className="action-text">
                      <h3>Book New Session</h3>
                      <p>Schedule your next gym visit</p>
                    </div>
                  </Link>
                  <Link to="/profile" className="action-card card">
                    <div className="action-icon">👤</div>
                    <div className="action-text">
                      <h3>My Profile</h3>
                      <p>View and manage your account</p>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  const total = data.length;
  const pending = data.filter((b) => b.status === "pending").length;
  const confirmed = data.filter((b) => b.status === "confirmed").length;

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage gym bookings and memberships</p>
          </div>
          <Link to="/admin/bookings" className="btn btn-primary">
            Manage Bookings
          </Link>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <div className="stat-number">{total}</div>
                  <div className="stat-label">Total Bookings</div>
                </div>
              </div>

              <div className="stat-card card">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <div className="stat-number">{pending}</div>
                  <div className="stat-label">Pending</div>
                </div>
              </div>

              <div className="stat-card card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <div className="stat-number">{confirmed}</div>
                  <div className="stat-label">Confirmed</div>
                </div>
              </div>
            </div>

            <div className="dashboard-section">
              <div className="section-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="quick-actions">
                <Link to="/admin/bookings" className="action-card card">
                  <div className="action-icon">📋</div>
                  <div className="action-text">
                    <h3>All Bookings</h3>
                    <p>View and manage all gym sessions</p>
                  </div>
                </Link>
                <Link to="/pricing" className="action-card card">
                  <div className="action-icon">💳</div>
                  <div className="action-text">
                    <h3>Membership Plans</h3>
                    <p>Manage membership options</p>
                  </div>
                </Link>
                <Link to="/profile" className="action-card card">
                  <div className="action-icon">👤</div>
                  <div className="action-text">
                    <h3>My Profile</h3>
                    <p>View admin account details</p>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
