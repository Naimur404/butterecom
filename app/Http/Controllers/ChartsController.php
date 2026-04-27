<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartsController extends Controller
{

    public function apexArea()
    {
        return Inertia::render('admin/charts/apex/area/index');
    }

    public function apexBar()
    {
        return Inertia::render('admin/charts/apex/bar/index');
    }

    public function apexBoxplot()
    {
        return Inertia::render('admin/charts/apex/boxplot/index');
    }

    public function apexBubble()
    {
        return Inertia::render('admin/charts/apex/bubble/index');
    }

    public function apexCandlestick()
    {
        return Inertia::render('admin/charts/apex/candlestick/index');
    }

    public function apexColumn()
    {
        return Inertia::render('admin/charts/apex/column/index');
    }

    public function apexFunnel()
    {
        return Inertia::render('admin/charts/apex/funnel/index');
    }

    public function apexHeatmap()
    {
        return Inertia::render('admin/charts/apex/heatmap/index');
    }

    public function apexLine()
    {
        return Inertia::render('admin/charts/apex/line/index');
    }

    public function apexMixed()
    {
        return Inertia::render('admin/charts/apex/mixed/index');
    }

    public function apexPie()
    {
        return Inertia::render('admin/charts/apex/pie/index');
    }

    public function apexPolarArea()
    {
        return Inertia::render('admin/charts/apex/polar-area/index');
    }

    public function apexRadar()
    {
        return Inertia::render('admin/charts/apex/radar/index');
    }

    public function apexRadialbar()
    {
        return Inertia::render('admin/charts/apex/radialbar/index');
    }

    public function apexRange()
    {
        return Inertia::render('admin/charts/apex/range/index');
    }

    public function apexScatter()
    {
        return Inertia::render('admin/charts/apex/scatter/index');
    }

    public function apexSlope()
    {
        return Inertia::render('admin/charts/apex/slope/index');
    }

    public function apexSparklines()
    {
        return Inertia::render('admin/charts/apex/sparklines/index');
    }

    public function apexTimeline()
    {
        return Inertia::render('admin/charts/apex/timeline/index');
    }

    public function apexTreemap()
    {
        return Inertia::render('admin/charts/apex/treemap/index');
    }

    public function chartjsArea()
    {
        return Inertia::render('admin/charts/chartjs/area/index');
    }

    public function chartjsBar()
    {
        return Inertia::render('admin/charts/chartjs/bar/index');
    }

    public function chartjsLine()
    {
        return Inertia::render('admin/charts/chartjs/line/index');
    }

    public function chartjsOther()
    {
        return Inertia::render('admin/charts/chartjs/other/index');
    }
}