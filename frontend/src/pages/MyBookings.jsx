import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { getMyBookings, deleteBooking } from "../services/bookingService";

function MyBookings() {
  const { token } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const data = await getMyBookings(token);
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    await deleteBooking(id, token);
    fetchBookings();
  };

  return (
    <div>
      <h1>My Bookings</h1>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map((b) => (
        <div key={b._id}>
          <p>Date: {b.date}</p>
          <p>Time: {b.time}</p>

          <button onClick={() => handleDelete(b._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
