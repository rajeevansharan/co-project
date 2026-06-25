const prisma = require("../utils/prismaClient");
const { generateTempleRegNo } = require("../utils/generateId");

// ── POST /api/temples ─────────────────────────────────────────────────────────
async function registerTemple(req, res, next) {
    try {
        const {
            templeName, tamilName, address, district, dsDivision, gnDivision,
            phone, email, website,
            bankName, bankBranch, accountName, accountNo,
            presidentName, secretaryName,
            history, festivals, idols, socialActivities, specialPoojas,
        } = req.body;

        const templeRegNo = await generateTempleRegNo();

        const temple = await prisma.temple.create({
            data: {
                templeRegNo,
                templeName,
                tamilName: tamilName || null,
                address,
                district,
                dsDivision,
                gnDivision,
                phone: phone || null,
                email: email || null,
                website: website || null,
                bankName: bankName || null,
                bankBranch: bankBranch || null,
                accountName: accountName || null,
                accountNo: accountNo || null,
                history: history || null,
                festivals: festivals || null,
                idols: idols || null,
                socialActivities: socialActivities || null,
                specialPoojas: specialPoojas || null,
                status: "Pending",

                committee: {
                    create: { presidentName, secretaryName },
                },
            },
            include: { committee: true, documents: true },
        });

        res.status(201).json({
            success: true,
            message: "Temple registered successfully",
            data: temple,
        });
    } catch (err) {
        next(err);
    }
}

// ── GET /api/temples ──────────────────────────────────────────────────────────
async function getTemples(req, res, next) {
    try {
        const { status, district, page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const where = {};
        if (status) where.status = status;
        if (district) where.district = district;

        const [temples, total] = await Promise.all([
            prisma.temple.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { createdAt: "desc" },
                include: { committee: true },
            }),
            prisma.temple.count({ where }),
        ]);

        res.json({
            success: true,
            data: temples,
            pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) },
        });
    } catch (err) {
        next(err);
    }
}

// ── GET /api/temples/:regNo ───────────────────────────────────────────────────
async function getTempleByRegNo(req, res, next) {
    try {
        const { regNo } = req.params;

        const temple = await prisma.temple.findUnique({
            where: { templeRegNo: regNo.toUpperCase() },
            include: { committee: true, documents: true },
        });

        if (!temple) {
            return res.status(404).json({
                success: false,
                message: `No temple found with Register ID: ${regNo}`,
            });
        }

        res.json({ success: true, data: temple });
    } catch (err) {
        next(err);
    }
}

// ── PATCH /api/temples/:regNo/status ─────────────────────────────────────────
async function updateTempleStatus(req, res, next) {
    try {
        const { regNo } = req.params;
        const { status } = req.body;

        const allowed = ["Pending", "Approved", "Rejected"];
        if (!allowed.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Status must be one of: ${allowed.join(", ")}`,
            });
        }

        const temple = await prisma.temple.update({
            where: { templeRegNo: regNo.toUpperCase() },
            data: { status },
        });

        res.json({ success: true, message: `Temple status updated to ${status}`, data: temple });
    } catch (err) {
        next(err);
    }
}

// ── DELETE /api/temples/:regNo ────────────────────────────────────────────────
async function deleteTemple(req, res, next) {
    try {
        const { regNo } = req.params;

        await prisma.temple.delete({
            where: { templeRegNo: regNo.toUpperCase() },
        });

        res.json({ success: true, message: "Temple deleted successfully" });
    } catch (err) {
        next(err);
    }
}

// ── POST /api/temples/:id/documents ──────────────────────────────────────────
async function addTempleDocument(req, res, next) {
    try {
        const { id } = req.params;
        const { documentType } = req.body;

        // If a file was uploaded via multer, use its path; otherwise use a URL from body
        const fileUrl = req.file
            ? `/${req.file.path.replace(/\\/g, "/")}`
            : req.body.fileUrl || null;

        const doc = await prisma.templeDocument.create({
            data: { templeId: Number(id), documentType, fileUrl, status: "Pending" },
        });

        res.status(201).json({ success: true, data: doc });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registerTemple,
    getTemples,
    getTempleByRegNo,
    updateTempleStatus,
    deleteTemple,
    addTempleDocument,
};
