<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TablesController extends Controller
{

    public function custom()
    {
        return Inertia::render('admin/tables/custom/index');
    }

    public function datatablesAjax()
    {
        return Inertia::render('admin/tables/datatables/ajax/index');
    }

    public function datatablesBasic()
    {
        return Inertia::render('admin/tables/datatables/basic/index');
    }

    public function datatablesCheckboxSelect()
    {
        return Inertia::render('admin/tables/datatables/checkbox-select/index');
    }

    public function datatablesChildRows()
    {
        return Inertia::render('admin/tables/datatables/child-rows/index');
    }

    public function datatablesColumnSearching()
    {
        return Inertia::render('admin/tables/datatables/column-searching/index');
    }

    public function datatablesColumns()
    {
        return Inertia::render('admin/tables/datatables/columns/index');
    }

    public function datatablesExportData()
    {
        return Inertia::render('admin/tables/datatables/export-data/index');
    }

    public function datatablesFixedColumns()
    {
        return Inertia::render('admin/tables/datatables/fixed-columns/index');
    }

    public function datatablesFixedHeader()
    {
        return Inertia::render('admin/tables/datatables/fixed-header/index');
    }

    public function datatablesJavascript()
    {
        return Inertia::render('admin/tables/datatables/javascript/index');
    }

    public function datatablesRendering()
    {
        return Inertia::render('admin/tables/datatables/rendering/index');
    }

    public function datatablesRowsAdd()
    {
        return Inertia::render('admin/tables/datatables/rows-add/index');
    }

    public function datatablesScroll()
    {
        return Inertia::render('admin/tables/datatables/scroll/index');
    }

    public function datatablesSelect()
    {
        return Inertia::render('admin/tables/datatables/select/index');
    }

    public function static()
    {
        return Inertia::render('admin/tables/static/index');
    }
}