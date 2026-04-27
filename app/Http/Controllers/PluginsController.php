<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PluginsController extends Controller
{

    public function animation()
    {
        return Inertia::render('admin/plugins/animation/index');
    }

    public function clipboard()
    {
        return Inertia::render('admin/plugins/clipboard/index');
    }

    public function passMeter()
    {
        return Inertia::render('admin/plugins/pass-meter/index');
    }

    public function pdfViewer()
    {
        return Inertia::render('admin/plugins/pdf-viewer/index');
    }

    public function sortable()
    {
        return Inertia::render('admin/plugins/sortable/index');
    }

    public function sweetAlerts()
    {
        return Inertia::render('admin/plugins/sweet-alerts/index');
    }

    public function tour()
    {
        return Inertia::render('admin/plugins/tour/index');
    }

    public function treeView()
    {
        return Inertia::render('admin/plugins/tree-view/index');
    }

    public function videoPlayer()
    {
        return Inertia::render('admin/plugins/video-player/index');
    }
}