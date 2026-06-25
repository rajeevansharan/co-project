const { PrismaClient } = require("@prisma/client");

// Singleton pattern — reuse the same client across the app
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

module.exports = prisma;
