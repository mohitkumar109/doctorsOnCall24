// Example roles
const roles = {
    admin: ["create", "read", "update", "delete"],
    manager: ["create", "read", "update"],
    user: ["onlyMe", "read"],
};

// Middleware to check user role
export const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role; // Ensure this is correctly populated, e.g., from JWT or session
            if (!userRole) throw new ApiError(401, "Unauthorized: No role assigned");
            const permissions = roles[userRole];
            if (!permissions) throw new ApiError(403, "Forbidden: Invalid role");
            if (permissions.includes(requiredPermission)) {
                return next(); // User has permission, proceed
            } else {
                throw new ApiError(403, "Forbidden: Insufficient permissions");
            }
        } catch (error) {
            //console.error("RBAC Error:", error);
            throw new ApiError(500, "Internal Server Error");
        }
    };
};
