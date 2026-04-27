<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\Log;

class ProductService
{
    /**
     * Sync products from order line_items.
     * Extracts product & variant info and upserts them.
     */
    public function syncFromLineItems(array $lineItems): void
    {
        foreach ($lineItems as $item) {
            try {
                // Upsert product
                $product = Product::updateOrCreate(
                    ['shopify_product_id' => $item['product_id']],
                    [
                        'title' => $item['title'],
                        'vendor' => $item['vendor'] ?? null,
                    ]
                );

                // Upsert variant
                if (!empty($item['variant_id'])) {
                    ProductVariant::updateOrCreate(
                        ['shopify_variant_id' => $item['variant_id']],
                        [
                            'product_id' => $product->id,
                            'title' => $item['variant_title'] ?? null,
                            'price' => $item['unit_price'] ?? 0,
                        ]
                    );
                }

            } catch (\Throwable $e) {
                Log::error('Product sync from line item failed', [
                    'product_id' => $item['product_id'] ?? null,
                    'error' => $e->getMessage(),
                ]);
            }
        }
    }
}
