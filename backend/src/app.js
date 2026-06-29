const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
