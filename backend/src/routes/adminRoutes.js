const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const { adminDashboard } = require("../controllers/adminController");

router.get("/dashboard", protect, authorize("admin"), adminDashboard);

module.exports = router;
