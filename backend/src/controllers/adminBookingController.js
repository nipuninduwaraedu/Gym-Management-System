const Booking = require("../models/Booking");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.log("ADMIN GET BOOKINGS ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = status;

    await booking.save();

    res.status(200).json({
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteAnyBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      message: "Booking deleted by admin",
    });
  } catch (error) {
    console.log("ADMIN DELETE ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getAllBookings,
  updateBookingStatus,
  deleteAnyBooking,
};
