import { usePage } from '@inertiajs/react';

interface AuthProps {
    user?: any;
    roles?: string[];
    permissions?: string[];
}

interface PageProps {
    [key: string]: any;
    auth?: AuthProps;
}

export const usePermission = () => {
    const page = usePage<PageProps>();
    const user = page.props.auth?.user;
    const roles = page.props.auth?.roles || [];
    const permissions = page.props.auth?.permissions || [];

    const hasRole = (role: string | string[]): boolean => {
        if (!user) return false;
        if (roles.includes('Super Admin')) return true;

        if (Array.isArray(role)) {
            return role.some(r => roles.includes(r));
        }
        return roles.includes(role);
    };

    const hasPermission = (permission: string | string[]): boolean => {
        if (!user) return false;
        if (roles.includes('Super Admin')) return true;

        if (Array.isArray(permission)) {
            return permission.some(p => permissions.includes(p));
        }
        return permissions.includes(permission);
    };

    const hasAnyPermission = (permissionsList: string[]): boolean => {
        if (!user) return false;
        if (roles.includes('Super Admin')) return true;

        return permissionsList.some(p => permissions.includes(p));
    };

    return {
        user,
        roles,
        permissions,
        hasRole,
        hasPermission,
        hasAnyPermission,
    };
};
