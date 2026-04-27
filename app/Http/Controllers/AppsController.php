<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AppsController extends Controller
{

    public function apiKeys()
    {
        return Inertia::render('admin/apps/api-keys/index');
    }

    public function calendar()
    {
        return Inertia::render('admin/apps/calendar/index');
    }

    public function chat()
    {
        return Inertia::render('admin/apps/chat/index');
    }

    public function crmActivities()
    {
        return Inertia::render('admin/apps/crm/activities/index');
    }

    public function crmCampaign()
    {
        return Inertia::render('admin/apps/crm/campaign/index');
    }

    public function crmContacts()
    {
        return Inertia::render('admin/apps/crm/contacts/index');
    }

    public function crmCustomers()
    {
        return Inertia::render('admin/apps/crm/customers/index');
    }

    public function crmDeals()
    {
        return Inertia::render('admin/apps/crm/deals/index');
    }

    public function crmEstimations()
    {
        return Inertia::render('admin/apps/crm/estimations/index');
    }

    public function crmLeads()
    {
        return Inertia::render('admin/apps/crm/leads/index');
    }

    public function crmOpportunities()
    {
        return Inertia::render('admin/apps/crm/opportunities/index');
    }

    public function crmPipeline()
    {
        return Inertia::render('admin/apps/crm/pipeline/index');
    }

    public function crmProposals()
    {
        return Inertia::render('admin/apps/crm/proposals/index');
    }

    public function ecommerceAttributes()
    {
        return Inertia::render('admin/apps/ecommerce/attributes/index');
    }

    public function ecommerceCart()
    {
        return Inertia::render('admin/apps/ecommerce/cart/index');
    }

    public function ecommerceCategories()
    {
        return Inertia::render('admin/apps/ecommerce/categories/index');
    }

    public function ecommerceCustomers()
    {
        return Inertia::render('admin/apps/ecommerce/customers/index');
    }

    public function ecommerceOrderAdd()
    {
        return Inertia::render('admin/apps/ecommerce/orders/order-add/index');
    }

    public function ecommerceOrderDetails()
    {
        return Inertia::render('admin/apps/ecommerce/orders/order-details/index');
    }

    public function ecommerceOrders()
    {
        return Inertia::render('admin/apps/ecommerce/orders/orders/index');
    }

    public function ecommerceProductAdd()
    {
        return Inertia::render('admin/apps/ecommerce/products/product-add/index');
    }

    public function ecommerceProductDetails()
    {
        return Inertia::render('admin/apps/ecommerce/products/product-details/index');
    }

    public function ecommerceProducts()
    {
        return Inertia::render('admin/apps/ecommerce/products/products/index');
    }

    public function ecommerceProductsGrid()
    {
        return Inertia::render('admin/apps/ecommerce/products/products-grid/index');
    }

    public function ecommerceRefunds()
    {
        return Inertia::render('admin/apps/ecommerce/refunds/index');
    }

    public function ecommerceReviews()
    {
        return Inertia::render('admin/apps/ecommerce/reviews/index');
    }

    public function ecommerceSellerDetails()
    {
        return Inertia::render('admin/apps/ecommerce/sellers/seller-details/index');
    }

    public function ecommerceSellers()
    {
        return Inertia::render('admin/apps/ecommerce/sellers/sellers/index');
    }

    public function emailCompose()
    {
        return Inertia::render('admin/apps/email/compose/index');
    }

    public function emailDetails()
    {
        return Inertia::render('admin/apps/email/details/index');
    }

    public function emailInbox()
    {
        return Inertia::render('admin/apps/email/inbox/index');
    }

    public function fileManager()
    {
        return Inertia::render('admin/apps/file-manager/index');
    }

    public function invoiceCreate()
    {
        return Inertia::render('admin/apps/invoice/create/index');
    }

    public function invoiceDetails()
    {
        return Inertia::render('admin/apps/invoice/details/index');
    }

    public function invoiceList()
    {
        return Inertia::render('admin/apps/invoice/list/index');
    }

    public function outlook()
    {
        return Inertia::render('admin/apps/outlook/index');
    }

    public function socialFeed()
    {
        return Inertia::render('admin/apps/social-feed/index');
    }

    public function ticketCreate()
    {
        return Inertia::render('admin/apps/ticket/create/index');
    }

    public function ticketDetails()
    {
        return Inertia::render('admin/apps/ticket/details/index');
    }

    public function ticketList()
    {
        return Inertia::render('admin/apps/ticket/list/index');
    }

    public function usersAccountSettings()
    {
        return Inertia::render('admin/apps/users/account-settings/index');
    }

    public function usersContacts()
    {
        return Inertia::render('admin/apps/users/contacts/index');
    }

    public function usersPermissions()
    {
        $permissions = Permission::query()
            ->with('roles:id,name')
            ->with('roles.users:id')
            ->orderBy('name')
            ->get()
            ->map(function (Permission $permission) {
                $roles      = $permission->roles->pluck('name')->values();
                $usersCount = $permission->roles
                    ->flatMap(fn (Role $role) => $role->users->pluck('id'))
                    ->unique()
                    ->count();

                return [
                    'id'         => $permission->id,
                    'name'       => $permission->name,
                    'roles'      => $roles,
                    'users_count' => $usersCount,
                    'updated_at' => $permission->updated_at,
                ];
            })
            ->values();

        return Inertia::render('admin/apps/users/permissions/index', compact('permissions'));
    }

    public function usersProfile()
    {
        return Inertia::render('admin/apps/users/profile/index');
    }

    public function usersManagement()
    {
        $roles = Role::query()->orderBy('name')->get(['id', 'name'])->values();

        $users = User::query()
            ->with('roles:id,name')
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'updated_at'])
            ->map(fn (User $user) => [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'roles'      => $user->roles->pluck('name')->values(),
                'role_ids'   => $user->roles->pluck('id')->values(),
                'updated_at' => $user->updated_at,
            ])
            ->values();

        return Inertia::render('admin/apps/users/user-management/index', compact('users', 'roles'));
    }

    public function usersRoleDetails(Request $request)
    {
        $roleId = (int) $request->query('role', 0);

        $allRolesWithDetails = Role::query()
            ->with('permissions:id,name')
            ->withCount('users')
            ->orderBy('name')
            ->get()
            ->map(fn (Role $role) => [
                'id'               => $role->id,
                'name'             => $role->name,
                'permissions'      => $role->permissions->pluck('name')->values(),
                'permissions_count' => $role->permissions->count(),
                'users_count'      => $role->users_count,
                'updated_at'       => $role->updated_at,
            ])
            ->values();

        $selectedRoleData = $roleId
            ? $allRolesWithDetails->firstWhere('id', $roleId)
            : $allRolesWithDetails->first();

        $selectedRoleId = $selectedRoleData['id'] ?? null;

        $users = $selectedRoleId
            ? User::query()
                ->with('roles:id,name')
                ->whereHas('roles', fn ($q) => $q->where('roles.id', $selectedRoleId))
                ->orderBy('name')
                ->get(['id', 'name', 'email', 'updated_at'])
                ->map(fn (User $user) => [
                    'id'         => $user->id,
                    'name'       => $user->name,
                    'email'      => $user->email,
                    'roles'      => $user->roles->pluck('name')->values(),
                    'role_ids'   => $user->roles->pluck('id')->values(),
                    'updated_at' => $user->updated_at,
                ])
                ->values()
            : collect()->values();

        $allRoles = Role::query()->orderBy('name')->get(['id', 'name'])->values();

        $permissionOptions = Permission::query()
            ->orderBy('name')
            ->pluck('name')
            ->values();

        return Inertia::render('admin/apps/users/role-details/index', [
            'selectedRole'      => $selectedRoleData,
            'allRoles'          => $allRoles,
            'permissionOptions' => $permissionOptions,
            'users'             => $users,
        ]);
    }

    public function usersRoles()
    {
        $roles = Role::query()
            ->with('permissions:id,name')
            ->withCount('users')
            ->orderBy('name')
            ->get()
            ->map(fn (Role $role) => [
                'id'               => $role->id,
                'name'             => $role->name,
                'permissions'      => $role->permissions->pluck('name')->values(),
                'permissions_count' => $role->permissions->count(),
                'users_count'      => $role->users_count,
                'updated_at'       => $role->updated_at,
            ])
            ->values();

        $permissions = Permission::query()
            ->orderBy('name')
            ->get(['id', 'name'])
            ->values();

        $users = User::query()
            ->with('roles:id,name')
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'updated_at'])
            ->map(fn (User $user) => [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'roles'      => $user->roles->pluck('name')->values(),
                'updated_at' => $user->updated_at,
            ])
            ->values();

        return Inertia::render('admin/apps/users/roles/index', compact('roles', 'permissions', 'users'));
    }
}