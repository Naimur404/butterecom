import { type MenuItemType } from '@/types'

export const menuItems: MenuItemType[] = [
  {
    'icon': 'layout-dashboard',
    'slug': 'main',
    'label': 'Main',
    'isTitle': true,
    'children': [
      {
        'url': '/dashboard/ecommerce',
        'icon': 'layout-dashboard',
        'slug': 'pages:dashboard-ecommerce',
        'label': 'Dashboard',
        'permissions': ['view dashboard'],
      },
      {
        'icon': 'user-cog',
        'slug': 'admin-setting',
        'label': 'Admin Setting',
        'permissions': ['manage users', 'manage roles', 'manage permissions'],
        'children': [
          {
            'url': '/apps/users/user-management',
            'icon': 'users',
            'slug': 'pages:apps-users-user-management',
            'label': 'Users',
            'permissions': ['manage users'],
          },
          {
            'url': '/apps/users/roles',
            'icon': 'shield-user',
            'slug': 'pages:apps-users-roles',
            'label': 'Roles',
            'permissions': ['manage roles'],
          },
          {
            'url': '/apps/users/permissions',
            'icon': 'shield-check',
            'slug': 'pages:apps-users-permissions',
            'label': 'Permission',
            'permissions': ['manage permissions'],
          },
        ],
      },
    ],
  },
]
