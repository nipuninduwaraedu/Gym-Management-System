import { Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";

import "./Booking.css";

function Booking() {
  const handleBookingCreated = () => {
    // Optional: You could add a state update to refresh or show a success message
  };

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <div>
            <h1>Book a Gym Session</h1>
            <p>Schedule your next workout with ease</p>
          </div>
          <Link to="/my-bookings" className="btn btn-outline">
            View My Bookings
          </Link>
        </div>

        <BookingForm onBookingCreated={handleBookingCreated} />
      </div>
    </div>
  );
}

export default Booking;
