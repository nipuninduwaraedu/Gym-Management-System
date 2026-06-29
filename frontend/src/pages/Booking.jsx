import BookingForm from "../components/BookingForm";

import "./Booking.css";

function Booking() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1>Gym Booking System</h1>

      <BookingForm onBookingCreated={handleRefresh} />
    </div>
  );
}

export default Booking;
