const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createBooking,
  getMyBookings,
  deleteBooking,
} = require("../controllers/bookingController");

const {
  getAllBookings,
  updateBookingStatus,
  deleteAnyBooking,
} = require("../controllers/adminBookingController");

router.post("/", protect, createBooking);

router.get("/my", protect, getMyBookings);

router.delete("/:id", protect, deleteBooking);

router.get("/admin/all", protect, adminOnly, getAllBookings);

router.put("/admin/:id", protect, adminOnly, updateBookingStatus);

router.delete("/admin/:id", protect, adminOnly, deleteAnyBooking);

module.exports = router;
