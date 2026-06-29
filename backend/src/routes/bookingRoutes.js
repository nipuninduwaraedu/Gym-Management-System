const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBooking,
  getMyBookings,
  deleteBooking,
} = require("../controllers/bookingController");

router.post("/", protect, createBooking);

router.get("/my", protect, getMyBookings);

router.delete("/:id", protect, deleteBooking);

module.exports = router;
