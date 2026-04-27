<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // ─── Define Permissions ──────────────────────────────────────
        $permissions = [
            // Dashboard
            'view dashboard',

            // Ecommerce
            'view ecommerce',
            'manage ecommerce',

            // CRM
            'view crm',
            'manage crm',

            // Email
            'view email',

            // Users & Roles
            'view users',
            'manage users',
            'manage roles',
            'manage permissions',

            // File Manager
            'view file-manager',

            // Chat
            'view chat',

            // Calendar
            'view calendar',

            // Social Feed
            'view social-feed',

            // Invoice
            'view invoices',
            'manage invoices',

            // Tickets / Support
            'view tickets',
            'manage tickets',

            // API Keys
            'view api-keys',
            'manage api-keys',

            // Pages
            'view pages',

            // Plugins
            'view plugins',

            // Layouts
            'view layouts',

            // UI Components
            'view components',

            // Charts
            'view charts',

            // Tables
            'view tables',

            // Maps
            'view maps',

            // Icons
            'view icons',

            // Widgets
            'view widgets',

            // Forms
            'view forms',

            // Settings
            'manage settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ─── Define Roles ────────────────────────────────────────────

        // Super Admin — gets ALL permissions automatically (via Gate::before in AuthServiceProvider)
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']);
        // Super Admin gets every permission
        $superAdmin->syncPermissions(Permission::all());

        // Admin — gets most permissions
        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $admin->syncPermissions([
            'view dashboard',
            'view ecommerce', 'manage ecommerce',
            'view crm', 'manage crm',
            'view email',
            'view users', 'manage users',
            'view file-manager',
            'view chat',
            'view calendar',
            'view social-feed',
            'view invoices', 'manage invoices',
            'view tickets', 'manage tickets',
            'view api-keys',
            'view pages',
            'view plugins',
            'view layouts',
            'view components',
            'view charts',
            'view tables',
            'view maps',
            'view icons',
            'view widgets',
            'view forms',
            'manage settings',
        ]);

        // Editor — can view most things but limited management
        $editor = Role::firstOrCreate(['name' => 'Editor']);
        $editor->syncPermissions([
            'view dashboard',
            'view ecommerce',
            'view crm',
            'view email',
            'view users',
            'view file-manager',
            'view chat',
            'view calendar',
            'view social-feed',
            'view invoices',
            'view tickets',
            'view pages',
            'view components',
            'view charts',
            'view tables',
            'view forms',
        ]);

        // User — basic access only
        $user = Role::firstOrCreate(['name' => 'User']);
        $user->syncPermissions([
            'view dashboard',
            'view chat',
            'view calendar',
            'view social-feed',
            'view pages',
        ]);
    }
}
