<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UiController extends Controller
{

    public function accordions()
    {
        return Inertia::render('admin/ui/accordions/index');
    }

    public function alerts()
    {
        return Inertia::render('admin/ui/alerts/index');
    }

    public function badges()
    {
        return Inertia::render('admin/ui/badges/index');
    }

    public function breadcrumb()
    {
        return Inertia::render('admin/ui/breadcrumb/index');
    }

    public function buttons()
    {
        return Inertia::render('admin/ui/buttons/index');
    }

    public function cards()
    {
        return Inertia::render('admin/ui/cards/index');
    }

    public function carousel()
    {
        return Inertia::render('admin/ui/carousel/index');
    }

    public function collapse()
    {
        return Inertia::render('admin/ui/collapse/index');
    }

    public function colors()
    {
        return Inertia::render('admin/ui/colors/index');
    }

    public function dropdowns()
    {
        return Inertia::render('admin/ui/dropdowns/index');
    }

    public function grid()
    {
        return Inertia::render('admin/ui/grid/index');
    }

    public function images()
    {
        return Inertia::render('admin/ui/images/index');
    }

    public function links()
    {
        return Inertia::render('admin/ui/links/index');
    }

    public function listGroup()
    {
        return Inertia::render('admin/ui/list-group/index');
    }

    public function modals()
    {
        return Inertia::render('admin/ui/modals/index');
    }

    public function notifications()
    {
        return Inertia::render('admin/ui/notifications/index');
    }

    public function offcanvas()
    {
        return Inertia::render('admin/ui/offcanvas/index');
    }

    public function pagination()
    {
        return Inertia::render('admin/ui/pagination/index');
    }

    public function placeholders()
    {
        return Inertia::render('admin/ui/placeholders/index');
    }

    public function popovers()
    {
        return Inertia::render('admin/ui/popovers/index');
    }

    public function progress()
    {
        return Inertia::render('admin/ui/progress/index');
    }

    public function spinners()
    {
        return Inertia::render('admin/ui/spinners/index');
    }

    public function tabs()
    {
        return Inertia::render('admin/ui/tabs/index');
    }

    public function tooltips()
    {
        return Inertia::render('admin/ui/tooltips/index');
    }

    public function typography()
    {
        return Inertia::render('admin/ui/typography/index');
    }

    public function utilities()
    {
        return Inertia::render('admin/ui/utilities/index');
    }

    public function videos()
    {
        return Inertia::render('admin/ui/videos/index');
    }
}