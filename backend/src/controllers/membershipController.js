const Membership = require("../models/Membership");

const createMembership = async (req, res) => {
  try {
    const { name, price, duration, description } = req.body;

    const membership = await Membership.create({
      name,
      price,
      duration,
      description,
    });

    res.status(201).json({
      message: "Membership created successfully",
      membership,
    });
  } catch (error) {
    console.error("CREATE MEMBERSHIP ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();

    res.status(200).json(memberships);
  } catch (error) {
    console.error("GET MEMBERSHIPS ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getMembershipById = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found",
      });
    }

    res.status(200).json(membership);
  } catch (error) {
    console.error("GET MEMBERSHIP ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found",
      });
    }

    res.status(200).json({
      message: "Membership updated successfully",
      membership,
    });
  } catch (error) {
    console.error("UPDATE MEMBERSHIP ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found",
      });
    }

    res.status(200).json({
      message: "Membership deleted successfully",
    });
  } catch (error) {
    console.error("DELETE MEMBERSHIP ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createMembership,
  getMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
};
