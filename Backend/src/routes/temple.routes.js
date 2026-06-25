const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
    registerTemple,
    getTemples,
    getTempleByRegNo,
    updateTempleStatus,
    deleteTemple,
    addTempleDocument,
} = require("../controllers/temple.controller");

const validate = require("../middleware/validate");
const upload = require("../middleware/upload");

// ── Validation Rules ──────────────────────────────────────────────────────────
const templeValidation = [
    body("templeName").notEmpty().withMessage("Temple name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("district").notEmpty().withMessage("District is required"),
    body("dsDivision").notEmpty().withMessage("DS Division is required"),
    body("gnDivision").notEmpty().withMessage("GN Division is required"),
    body("presidentName").notEmpty().withMessage("President name is required"),
    body("secretaryName").notEmpty().withMessage("Secretary name is required"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
];

// ── Routes ────────────────────────────────────────────────────────────────────

// Register a temple
router.post("/", templeValidation, validate, registerTemple);

// List all temples  ?status=Pending&district=Jaffna&page=1&limit=20
router.get("/", getTemples);

// Get single temple by Register No (e.g. TMP-2026-001)
router.get("/:regNo", getTempleByRegNo);

// Update status — Pending | Approved | Rejected
router.patch("/:regNo/status", updateTempleStatus);

// Delete a temple
router.delete("/:regNo", deleteTemple);

// Upload a document for a specific temple (by DB id)
router.post(
    "/:id/documents",
    upload.single("file"),
    addTempleDocument
);

module.exports = router;
