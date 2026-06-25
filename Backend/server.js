const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const templeRoutes = require("./src/routes/temple.routes");
const artistRoutes = require("./src/routes/artist.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security & Parsing Middleware ─────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static Uploads Folder ─────────────────────────────────────────────────────
app.use("/uploads", express.static("uploads"));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CO Project API is running",
    version: "1.0.0",
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/temples", templeRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  CO Project API running on http://localhost:${PORT}`);
});