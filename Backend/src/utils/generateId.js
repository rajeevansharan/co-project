const prisma = require("./prismaClient");

/**
 * Generates a unique Temple Register No in the format: TMP-YYYY-NNN
 * e.g. TMP-2026-001
 */
async function generateTempleRegNo() {
    const year = new Date().getFullYear();
    const prefix = `TMP-${year}-`;

    // Count temples registered in the current year
    const count = await prisma.temple.count({
        where: {
            templeRegNo: {
                startsWith: prefix,
            },
        },
    });

    const seq = String(count + 1).padStart(3, "0");
    return `${prefix}${seq}`;
}

module.exports = { generateTempleRegNo };
