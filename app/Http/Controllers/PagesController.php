<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{

    public function empty()
    {
        return Inertia::render('admin/pages/empty/index');
    }

    public function faq()
    {
        return Inertia::render('admin/pages/faq/index');
    }

    public function pricing()
    {
        return Inertia::render('admin/pages/pricing/index');
    }

    public function privacyPolicy()
    {
        return Inertia::render('admin/pages/privacy-policy/index');
    }

    public function searchResults()
    {
        return Inertia::render('admin/pages/search-results/index');
    }

    public function termsConditions()
    {
        return Inertia::render('admin/pages/terms-conditions/index');
    }

    public function timeline()
    {
        return Inertia::render('admin/pages/timeline/index');
    }

    public function comingSoon()
    {
        return Inertia::render('others/pages/coming-soon/index');
    }
}