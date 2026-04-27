<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * List all products.
     *
     * GET /products
     */
    public function index(Request $request)
    {
        $query = Product::with('variants')->latest();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('vendor', 'like', "%{$search}%")
                  ->orWhereHas('variants', fn($vq) => $vq->where('sku', 'like', "%{$search}%"));
            });
        }

        if ($request->filled('vendor')) {
            $query->where('vendor', $request->input('vendor'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $products = $query->paginate(25)->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'vendor', 'status']),
        ]);
    }

    /**
     * Show a single product.
     *
     * GET /products/{product}
     */
    public function show(Product $product)
    {
        $product->load(['variants', 'activityLogs.user']);

        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }
}
