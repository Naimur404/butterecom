<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{

    public function elements()
    {
        return Inertia::render('admin/form/elements/index');
    }

    public function fileuploads()
    {
        return Inertia::render('admin/form/fileuploads/index');
    }

    public function layout()
    {
        return Inertia::render('admin/form/layout/index');
    }

    public function otherPlugin()
    {
        return Inertia::render('admin/form/other-plugin/index');
    }

    public function pickers()
    {
        return Inertia::render('admin/form/pickers/index');
    }

    public function rangeSlider()
    {
        return Inertia::render('admin/form/range-slider/index');
    }

    public function select()
    {
        return Inertia::render('admin/form/select/index');
    }

    public function textEditors()
    {
        return Inertia::render('admin/form/text-editors/index');
    }

    public function validation()
    {
        return Inertia::render('admin/form/validation/index');
    }

    public function wizard()
    {
        return Inertia::render('admin/form/wizard/index');
    }
}