import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createBooking } from "../services/bookingService";

import "../styles/BookingForm.css";

function BookingForm({ onBookingCreated }) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const data = await createBooking({ date, time }, token);
      setMessage(data.message);
      setIsSuccess(true);
      setDate("");
      setTime("");
      
      // Wait a moment then navigate to my bookings
      setTimeout(() => {
        navigate("/my-bookings");
      }, 1500);
      
      onBookingCreated();
    } catch (err) {
      setMessage(err.message || "Failed to book session");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <div className="booking-form card">
        <div className="form-icon">📅</div>
        <h2>Book a Gym Session</h2>
        <p className="form-subtitle">Select your preferred date and time</p>

        {message && (
          <div className={`form-message ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="booking-date">Date</label>
            <input
              id="booking-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="booking-time">Time</label>
            <input
              id="booking-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Session Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
