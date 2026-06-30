import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  getAllBookings,
  updateBookingStatus,
  deleteBookingAdmin,
} from "../services/adminBookingService";

import "./AdminBookings.css";

function AdminBookings() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookings(token);
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdating(id);
      await updateBookingStatus(id, status, token);
      fetchBookings();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      setDeleting(id);
      await deleteBookingAdmin(id, token);
      fetchBookings();
    } catch (error) {
      console.error("Failed to delete booking:", error);
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "badge badge-confirmed";
      case "pending":
        return "badge badge-pending";
      case "cancelled":
        return "badge badge-cancelled";
      default:
        return "badge badge-pending";
    }
  };

  if (loading) {
    return (
      <div className="admin-bookings-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-bookings-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Admin Booking Dashboard</h1>
            <p>Manage all gym session bookings</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h2>No Bookings Yet</h2>
            <p>There are no gym session bookings to manage</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="table-row">
                    <td>
                      <div className="user-cell">
                        <span className="user-initial">
                          {booking.user?.name?.charAt(0).toUpperCase() || "?"}
                        </span>
                        <div className="user-info">
                          <span className="user-name">
                            {booking.user?.name || "Unknown"}
                          </span>
                          <span className="user-email">
                            {booking.user?.email || ""}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td>{booking.time}</td>
                    <td>
                      <select
                        className="status-select"
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                        disabled={updating === booking._id}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => handleDelete(booking._id)}
                        disabled={deleting === booking._id}
                      >
                        {deleting === booking._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="mobile-bookings">
              {bookings.map((booking) => (
                <div key={booking._id} className="mobile-booking-card card">
                  <div className="mobile-user">
                    <span className="user-initial">
                      {booking.user?.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                    <div className="user-info">
                      <span className="user-name">
                        {booking.user?.name || "Unknown"}
                      </span>
                      <span className="user-email">
                        {booking.user?.email || ""}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mobile-details">
                    <div className="detail-row">
                      <span className="detail-label">Date</span>
                      <span className="detail-value">
                        {new Date(booking.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Time</span>
                      <span className="detail-value">{booking.time}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Status</span>
                      <select
                        className="status-select"
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                        disabled={updating === booking._id}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="btn btn-danger btn-small w-full"
                    onClick={() => handleDelete(booking._id)}
                    disabled={deleting === booking._id}
                  >
                    {deleting === booking._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBookings;
