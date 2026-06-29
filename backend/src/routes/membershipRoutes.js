const express = require("express");
const router = express.Router();

const {
  createMembership,
  getMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
} = require("../controllers/membershipController");

router.post("/", createMembership);

router.get("/", getMemberships);

router.get("/:id", getMembershipById);

router.put("/:id", updateMembership);

router.delete("/:id", deleteMembership);

module.exports = router;
