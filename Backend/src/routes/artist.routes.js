const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
    registerArtist,
    getArtists,
    getArtistByNic,
    updateArtistStatus,
    deleteArtist,
    addAchievement,
    addAward,
} = require("../controllers/artist.controller");

const validate = require("../middleware/validate");

// ── Validation Rules ──────────────────────────────────────────────────────────
const artistValidation = [
    body("nic").notEmpty().withMessage("NIC is required"),
    body("tamilName").notEmpty().withMessage("Tamil name is required"),
    body("englishName").notEmpty().withMessage("English name is required"),
    body("dob").notEmpty().withMessage("Date of birth is required"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("permanentAddress").notEmpty().withMessage("Permanent address is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("education").notEmpty().withMessage("Education is required"),
    body("category").notEmpty().withMessage("Art category is required"),
    body("biography").notEmpty().withMessage("Biography is required"),
];

const achievementValidation = [
    body("title").notEmpty().withMessage("Achievement title is required"),
];

const awardValidation = [
    body("awardName").notEmpty().withMessage("Award name is required"),
    body("year")
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage("Year must be a valid year"),
];

// ── Routes ────────────────────────────────────────────────────────────────────

// Register an artist
router.post("/", artistValidation, validate, registerArtist);

// List all artists  ?status=Pending&category=Classical+Dance&page=1&limit=20
router.get("/", getArtists);

// Get a single artist by NIC
router.get("/:nic", getArtistByNic);

// Update status — Pending | Approved | Rejected
router.patch("/:nic/status", updateArtistStatus);

// Delete an artist
router.delete("/:nic", deleteArtist);

// Add a standalone achievement (publication / artistic work / recognition)
router.post("/:id/achievements", achievementValidation, validate, addAchievement);

// Add a standalone award
router.post("/:id/awards", awardValidation, validate, addAward);

module.exports = router;
