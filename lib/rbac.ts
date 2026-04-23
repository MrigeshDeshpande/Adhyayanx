/**
 * Role-Based Access Control (RBAC) Utilities
 * 
 * Provides helper functions for checking user roles and permissions.
 */

/**
 * User roles as defined in Prisma schema
 */
export enum Role {
    SUPERADMIN = "SUPERADMIN",
    INSTITUTE_ADMIN = "INSTITUTE_ADMIN",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
    SUPPORT = "SUPPORT",
}

/**
 * Route permission configuration
 * Maps route patterns to allowed roles
 */
export const ROUTE_PERMISSIONS: Record<string, Role[]> = {
    "/admin": [Role.SUPERADMIN, Role.INSTITUTE_ADMIN],
    "/teacher": [Role.SUPERADMIN, Role.INSTITUTE_ADMIN, Role.TEACHER],
    "/student": [Role.STUDENT, Role.TEACHER, Role.INSTITUTE_ADMIN, Role.SUPERADMIN],
};

/**
 * Check if a user role has access to a specific route
 * 
 * @param userRole - The user's role
 * @param pathname - The route pathname to check
 * @returns true if the user has access, false otherwise
 */
export function hasRouteAccess(userRole: string, pathname: string): boolean {
    // Find matching route permission by checking if pathname starts with any configured route
    for (const [routePattern, allowedRoles] of Object.entries(ROUTE_PERMISSIONS)) {
        if (pathname.startsWith(routePattern)) {
            return allowedRoles.includes(userRole as Role);
        }
    }

    // If no specific permission is configured, allow access (default behavior)
    return true;
}

/**
 * Check if a role is an admin role
 * 
 * @param role - The role to check
 * @returns true if the role is SUPERADMIN or INSTITUTE_ADMIN
 */
export function isAdminRole(role: string): boolean {
    return role === Role.SUPERADMIN || role === Role.INSTITUTE_ADMIN;
}

/**
 * Get a user-friendly error message for unauthorized access
 * 
 * @param requiredRoles - Array of roles that have access
 * @returns Error message string
 */
export function getUnauthorizedMessage(requiredRoles: Role[]): string {
    const roleNames = requiredRoles.join(" or ");
    return `Access denied. This page requires ${roleNames} privileges.`;
}
