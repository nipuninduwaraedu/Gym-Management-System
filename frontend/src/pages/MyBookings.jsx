import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { getMyBookings, deleteBooking } from "../services/bookingService";

import "./MyBookings.css";

function MyBookings() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getMyBookings(token);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      setDeleting(id);
      await deleteBooking(id, token);
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
      <div className="my-bookings-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">
      <div className="container">
        <div className="bookings-header">
          <div>
            <h1>My Bookings</h1>
            <p>View and manage your gym sessions</p>
          </div>
          <Link to="/booking" className="btn btn-primary">
            Book New Session
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h2>No Bookings Yet</h2>
            <p>You haven't scheduled any gym sessions yet</p>
            <Link to="/booking" className="btn btn-primary">
              Book Your First Session
            </Link>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card card">
                <div className="booking-info">
                  <div className="booking-date">
                    <div className="date-day">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </div>
                    <div className="date-number">
                      {new Date(booking.date).getDate()}
                    </div>
                    <div className="date-month">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </div>
                  </div>
                  <div className="booking-details">
                    <h3 className="booking-time">⏰ {booking.time}</h3>
                    <p className="booking-status">
                      <span className={getStatusBadgeClass(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => handleDelete(booking._id)}
                  disabled={deleting === booking._id}
                >
                  {deleting === booking._id ? "Deleting..." : "Cancel"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
