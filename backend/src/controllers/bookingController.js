const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { date, time } = req.body;

    const booking = await Booking.create({
      user: req.user.id, // from JWT
      date,
      time,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.log("BOOKING ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });

    res.status(200).json(bookings);
  } catch (error) {
    console.log("GET BOOKINGS ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      message: "Booking deleted",
    });
  } catch (error) {
    console.log("DELETE BOOKING ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  deleteBooking,
};
