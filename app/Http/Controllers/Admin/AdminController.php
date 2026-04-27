<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    // ─── Roles ───────────────────────────────────────────────────────────────

    public function storeRole(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'             => ['required', 'string', 'max:255', 'unique:roles,name'],
            'permission_ids'   => ['sometimes', 'array'],
            'permission_ids.*' => ['integer', 'exists:permissions,id'],
        ]);

        $role = Role::create(['name' => $validated['name']]);
        $role->syncPermissions($validated['permission_ids'] ?? []);

        return redirect()->back()->with('flash.success', 'Role created successfully.');
    }

    public function updateRole(Request $request, Role $role): RedirectResponse
    {
        $validated = $request->validate([
            'name'             => ['required', 'string', 'max:255', Rule::unique('roles', 'name')->ignore($role->id)],
            'permission_ids'   => ['sometimes', 'array'],
            'permission_ids.*' => ['integer', 'exists:permissions,id'],
        ]);

        $role->update(['name' => $validated['name']]);

        if (array_key_exists('permission_ids', $validated)) {
            $role->syncPermissions($validated['permission_ids']);
        }

        return redirect()->back()->with('flash.success', 'Role updated successfully.');
    }

    public function destroyRole(Role $role): RedirectResponse
    {
        $role->delete();

        return redirect()->back()->with('flash.success', 'Role removed successfully.');
    }

    // ─── Users ───────────────────────────────────────────────────────────────

    public function storeUser(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'max:255', 'unique:users,email'],
            'password'   => ['required', 'string', 'min:8'],
            'role_ids'   => ['sometimes', 'array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->syncRoles($validated['role_ids'] ?? []);

        return redirect()->back()->with('flash.success', 'User created successfully.');
    }

    public function updateUser(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password'   => ['nullable', 'string', 'min:8'],
            'role_ids'   => ['sometimes', 'array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ]);

        $user->name  = $validated['name'];
        $user->email = $validated['email'];

        if (! empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        if (array_key_exists('role_ids', $validated)) {
            $user->syncRoles($validated['role_ids']);
        }

        return redirect()->back()->with('flash.success', 'User updated successfully.');
    }

    public function destroyUser(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()->back()->with('flash.success', 'User deleted successfully.');
    }

    public function bulkDestroyUsers(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids'   => ['required', 'array'],
            'ids.*' => ['integer', 'exists:users,id'],
        ]);

        $count = count($validated['ids']);
        User::whereIn('id', $validated['ids'])->delete();

        return redirect()->back()->with('flash.success', "{$count} user".($count > 1 ? 's' : '').' deleted successfully.');
    }

    public function assignRoles(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role_ids'   => ['required', 'array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ]);

        $user->syncRoles($validated['role_ids']);

        return redirect()->back()->with('flash.success', 'User roles updated successfully.');
    }

    // ─── Permissions ─────────────────────────────────────────────────────────

    public function destroyPermission(Permission $permission): RedirectResponse
    {
        $permission->delete();

        return redirect()->back()->with('flash.success', 'Permission removed successfully.');
    }

    public function bulkDestroyPermissions(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids'   => ['required', 'array'],
            'ids.*' => ['integer', 'exists:permissions,id'],
        ]);

        $count = count($validated['ids']);
        Permission::whereIn('id', $validated['ids'])->delete();

        return redirect()->back()->with('flash.success', "{$count} permission".($count > 1 ? 's' : '').' removed successfully.');
    }

    // ─── Profile ─────────────────────────────────────────────────────────────

    public function updateProfile(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $user       = $request->user();
        $user->name = $validated['name'];
        $user->save();

        return redirect()->back()->with('flash.success', 'Profile updated successfully.');
    }
}
