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

            if (!userRole) {
                return res.status(401).json({ message: "Unauthorized: No role assigned" });
            }

            const permissions = roles[userRole];

            if (!permissions) {
                return res.status(403).json({ message: "Forbidden: Invalid role" });
            }

            if (permissions.includes(requiredPermission)) {
                return next(); // User has permission, proceed
            } else {
                return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            }
        } catch (error) {
            console.error("RBAC Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};
