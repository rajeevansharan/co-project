const prisma = require("../utils/prismaClient");

// ── GET /api/dashboard/stats ──────────────────────────────────────────────────
async function getStats(req, res, next) {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const [
            totalTemples,
            totalArtists,
            pendingTemples,
            pendingArtists,
            recentTemples,
            recentArtists,
        ] = await Promise.all([
            prisma.temple.count(),
            prisma.artist.count(),
            prisma.temple.count({ where: { status: "Pending" } }),
            prisma.artist.count({ where: { status: "Pending" } }),
            prisma.temple.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
            prisma.artist.count({ where: { registeredDate: { gte: thirtyDaysAgo } } }),
        ]);

        res.json({
            success: true,
            data: {
                totalTemples,
                totalArtists,
                pendingApprovals: pendingTemples + pendingArtists,
                recentRegistrations: recentTemples + recentArtists,
            },
        });
    } catch (err) {
        next(err);
    }
}

// ── GET /api/dashboard/recent ─────────────────────────────────────────────────
async function getRecent(req, res, next) {
    try {
        const [recentTemples, recentArtists] = await Promise.all([
            prisma.temple.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: {
                    templeRegNo: true,
                    templeName: true,
                    district: true,
                    status: true,
                    createdAt: true,
                },
            }),
            prisma.artist.findMany({
                take: 5,
                orderBy: { registeredDate: "desc" },
                select: {
                    nic: true,
                    englishName: true,
                    category: true,
                    status: true,
                    registeredDate: true,
                },
            }),
        ]);

        res.json({
            success: true,
            data: { recentTemples, recentArtists },
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { getStats, getRecent };
