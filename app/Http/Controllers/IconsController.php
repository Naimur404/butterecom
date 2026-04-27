<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class IconsController extends Controller
{

    public function flags()
    {
        return Inertia::render('admin/icons/flags/index');
    }

    public function lucide()
    {
        return Inertia::render('admin/icons/lucide/index');
    }

    public function tabler()
    {
        return Inertia::render('admin/icons/tabler/index');
    }
}