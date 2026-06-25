const prisma = require("../utils/prismaClient");

// ── POST /api/artists ─────────────────────────────────────────────────────────
async function registerArtist(req, res, next) {
    try {
        const {
            nic, tamilName, englishName, otherNames, dob, gender,
            permanentAddress, currentAddress,
            phone, education, category, literaryCategory, expertise,
            servicePeriod, biography,
            // Arrays / related records
            achievements = [],  // [{ title, year, description, type }]
            awards = [],  // [{ awardName, year }]
        } = req.body;

        const artist = await prisma.artist.create({
            data: {
                nic,
                tamilName,
                englishName,
                otherNames: otherNames || null,
                dob,
                gender,
                permanentAddress,
                currentAddress: currentAddress || null,
                phone,
                education,
                category,
                literaryCategory: literaryCategory || null,
                expertise: expertise || null,
                servicePeriod: servicePeriod || null,
                biography,
                status: "Pending",

                achievements: {
                    create: achievements.map((a) => ({
                        title: a.title,
                        year: a.year ? Number(a.year) : null,
                        description: a.description || null,
                        type: a.type || "Artistic Work",
                    })),
                },

                awards: {
                    create: awards.map((w) => ({
                        awardName: w.awardName,
                        year: Number(w.year),
                    })),
                },
            },
            include: { achievements: true, awards: true },
        });

        res.status(201).json({
            success: true,
            message: "Artist registered successfully",
            data: artist,
        });
    } catch (err) {
        next(err);
    }
}

// ── GET /api/artists ──────────────────────────────────────────────────────────
async function getArtists(req, res, next) {
    try {
        const { status, category, page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const where = {};
        if (status) where.status = status;
        if (category) where.category = category;

        const [artists, total] = await Promise.all([
            prisma.artist.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { registeredDate: "desc" },
                include: { achievements: true, awards: true },
            }),
            prisma.artist.count({ where }),
        ]);

        res.json({
            success: true,
            data: artists,
            pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) },
        });
    } catch (err) {
        next(err);
    }
}

// ── GET /api/artists/:nic ─────────────────────────────────────────────────────
async function getArtistByNic(req, res, next) {
    try {
        const { nic } = req.params;

        const artist = await prisma.artist.findUnique({
            where: { nic },
            include: { achievements: true, awards: true },
        });

        if (!artist) {
            return res.status(404).json({
                success: false,
                message: `No artist found with NIC: ${nic}`,
            });
        }

        res.json({ success: true, data: artist });
    } catch (err) {
        next(err);
    }
}

// ── PATCH /api/artists/:nic/status ────────────────────────────────────────────
async function updateArtistStatus(req, res, next) {
    try {
        const { nic } = req.params;
        const { status } = req.body;

        const allowed = ["Pending", "Approved", "Rejected"];
        if (!allowed.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Status must be one of: ${allowed.join(", ")}`,
            });
        }

        const artist = await prisma.artist.update({
            where: { nic },
            data: { status },
        });

        res.json({ success: true, message: `Artist status updated to ${status}`, data: artist });
    } catch (err) {
        next(err);
    }
}

// ── DELETE /api/artists/:nic ──────────────────────────────────────────────────
async function deleteArtist(req, res, next) {
    try {
        const { nic } = req.params;

        await prisma.artist.delete({ where: { nic } });

        res.json({ success: true, message: "Artist deleted successfully" });
    } catch (err) {
        next(err);
    }
}

// ── POST /api/artists/:id/achievements ───────────────────────────────────────
async function addAchievement(req, res, next) {
    try {
        const { id } = req.params;
        const { title, year, description, type } = req.body;

        const achievement = await prisma.artistAchievement.create({
            data: {
                artistId: Number(id),
                title,
                year: year ? Number(year) : null,
                description: description || null,
                type: type || "Artistic Work",
            },
        });

        res.status(201).json({ success: true, data: achievement });
    } catch (err) {
        next(err);
    }
}

// ── POST /api/artists/:id/awards ──────────────────────────────────────────────
async function addAward(req, res, next) {
    try {
        const { id } = req.params;
        const { awardName, year } = req.body;

        const award = await prisma.artistAward.create({
            data: { artistId: Number(id), awardName, year: Number(year) },
        });

        res.status(201).json({ success: true, data: award });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registerArtist,
    getArtists,
    getArtistByNic,
    updateArtistStatus,
    deleteArtist,
    addAchievement,
    addAward,
};
