import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createBooking } from "../services/bookingService";
import "./BookingForm.css";

import "./BookingForm.css";

function BookingForm({ onBookingCreated }) {
  const { token } = useContext(AuthContext);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createBooking({ date, time }, token);

      setMessage(data.message);

      setDate("");
      setTime("");

      onBookingCreated();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="booking-form">
      <h2>Book a Session</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button type="submit">Book Now</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default BookingForm;
