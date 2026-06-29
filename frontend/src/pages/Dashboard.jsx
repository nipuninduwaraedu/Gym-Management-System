import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  getUserDashboard,
  getAdminDashboard,
} from "../services/dashboardService";

import "./Dashboard.css";

function Dashboard() {
  const { token, user } = useContext(AuthContext);

  const [data, setData] = useState([]);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      if (isAdmin) {
        const res = await getAdminDashboard(token);
        setData(res);
      } else {
        const res = await getUserDashboard(token);
        setData(res);
      }
    };

    fetchData();
  }, []);

  if (!isAdmin) {
    return (
      <div className="dashboard">
        <h1>User Dashboard</h1>

        <div className="card">
          <h3>Total Bookings</h3>
          <p>{data.length}</p>
        </div>

        {data.length > 0 && (
          <div className="card">
            <h3>Latest Booking</h3>
            <p>{data[data.length - 1]?.date}</p>
            <p>{data[data.length - 1]?.time}</p>
          </div>
        )}
      </div>
    );
  }

  const total = data.length;
  const pending = data.filter((b) => b.status === "pending").length;
  const confirmed = data.filter((b) => b.status === "confirmed").length;

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <div className="stats">
        <div className="card">
          <h3>Total Bookings</h3>
          <p>{total}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>

        <div className="card">
          <h3>Confirmed</h3>
          <p>{confirmed}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
