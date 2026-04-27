<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserRolePermissionApiController extends Controller
{
    public function roles(): JsonResponse
    {
        $roles = Role::query()
            ->with('permissions:id,name')
            ->withCount('users')
            ->orderBy('name')
            ->get()
            ->map(fn (Role $role) => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name')->values(),
                'permissions_count' => $role->permissions->count(),
                'users_count' => $role->users_count,
                'updated_at' => $role->updated_at,
            ])
            ->values();

        $permissions = Permission::query()
            ->orderBy('name')
            ->get(['id', 'name']);

        return response()->json([
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function storeRole(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
            'permission_ids' => ['sometimes', 'array'],
            'permission_ids.*' => ['integer', 'exists:permissions,id'],
        ]);

        $role = Role::create(['name' => $validated['name']]);
        $role->syncPermissions($validated['permission_ids'] ?? []);

        return response()->json([
            'message' => 'Role created successfully.',
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
            ],
        ], 201);
    }

    public function updateRole(Request $request, Role $role): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('roles', 'name')->ignore($role->id)],
            'permission_ids' => ['sometimes', 'array'],
            'permission_ids.*' => ['integer', 'exists:permissions,id'],
        ]);

        $role->update(['name' => $validated['name']]);

        if (array_key_exists('permission_ids', $validated)) {
            $role->syncPermissions($validated['permission_ids']);
        }

        return response()->json([
            'message' => 'Role updated successfully.',
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
            ],
        ]);
    }

    public function destroyRole(Role $role): JsonResponse
    {
        $role->delete();

        return response()->json([
            'message' => 'Role removed successfully.',
        ]);
    }

    public function permissions(): JsonResponse
    {
        $permissions = Permission::query()
            ->with('roles:id,name')
            ->with('roles.users:id')
            ->orderBy('name')
            ->get()
            ->map(function (Permission $permission) {
                $roles = $permission->roles->pluck('name')->values();
                $usersCount = $permission->roles
                    ->flatMap(fn (Role $role) => $role->users->pluck('id'))
                    ->unique()
                    ->count();

                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'roles' => $roles,
                    'roles_count' => $roles->count(),
                    'users_count' => $usersCount,
                    'updated_at' => $permission->updated_at,
                ];
            })
            ->values();

        return response()->json([
            'permissions' => $permissions,
        ]);
    }

    public function users(): JsonResponse
    {
        $users = User::query()
            ->with('roles:id,name')
            ->orderBy('name')
            ->get(['id', 'name', 'email'])
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name')->values(),
                'role_ids' => $user->roles->pluck('id')->values(),
                'updated_at' => $user->updated_at,
            ])
            ->values();

        $roles = Role::query()
            ->orderBy('name')
            ->get(['id', 'name']);

        return response()->json([
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function storeUser(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role_ids' => ['sometimes', 'array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->syncRoles($validated['role_ids'] ?? []);
        $user->load('roles:id,name');

        return response()->json([
            'message' => 'User created successfully.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name')->values(),
                'role_ids' => $user->roles->pluck('id')->values(),
            ],
        ], 201);
    }

    public function updateUser(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:8'],
            'role_ids' => ['sometimes', 'array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        if (array_key_exists('role_ids', $validated)) {
            $user->syncRoles($validated['role_ids']);
        }

        $user->load('roles:id,name');

        return response()->json([
            'message' => 'User updated successfully.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name')->values(),
                'role_ids' => $user->roles->pluck('id')->values(),
            ],
        ]);
    }

    public function assignRoles(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'role_ids' => ['required', 'array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ]);

        $user->syncRoles($validated['role_ids']);

        return response()->json([
            'message' => 'User roles updated successfully.',
        ]);
    }
}
