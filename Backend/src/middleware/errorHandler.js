/**
 * Global error handler middleware.
 * Catches all errors forwarded via next(err).
 */
function errorHandler(err, req, res, next) {
    console.error("❌ Error:", err);

    // Prisma known errors
    if (err.code === "P2002") {
        const field = err.meta?.target?.[0] || "field";
        return res.status(409).json({
            success: false,
            message: `A record with this ${field} already exists.`,
        });
    }

    if (err.code === "P2025") {
        return res.status(404).json({
            success: false,
            message: "Record not found.",
        });
    }

    // Default server error
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
}

module.exports = errorHandler;
