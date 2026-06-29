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

  const fetchBookings = async () => {
    const data = await getAllBookings(token);
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateBookingStatus(id, status, token);
    fetchBookings();
  };

  const handleDelete = async (id) => {
    await deleteBookingAdmin(id, token);
    fetchBookings();
  };

  return (
    <div className="admin-page">

      <h1>Admin Booking Dashboard</h1>

      <table className="admin-table">

        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>

              <td>{b.user?.name}</td>
              <td>{b.user?.email}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>

              <td>
                <select
                  value={b.status}
                  onChange={(e) =>
                    handleStatusChange(b._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>

              <td>
                <button onClick={() => handleDelete(b._id)}>
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default AdminBookings;