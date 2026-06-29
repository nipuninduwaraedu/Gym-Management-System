const express = require("express");
const router = express.Router();

const {
  createMembership,
  getMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
} = require("../controllers/membershipController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", getMemberships);
router.get("/:id", getMembershipById);

router.post("/", protect, adminOnly, createMembership);
router.put("/:id", protect, adminOnly, updateMembership);
router.delete("/:id", protect, adminOnly, deleteMembership);

module.exports = router;
