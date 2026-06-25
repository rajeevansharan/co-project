const express = require("express");
const router = express.Router();

const { getStats, getRecent } = require("../controllers/dashboard.controller");

// GET /api/dashboard/stats  — total counts + pending + recent 30 days
router.get("/stats", getStats);

// GET /api/dashboard/recent — latest 5 temples + latest 5 artists
router.get("/recent", getRecent);

module.exports = router;
