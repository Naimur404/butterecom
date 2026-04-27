<?php

namespace App\Models;

use App\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'order_id',
        'shopify_line_item_id',
        'shopify_product_id',
        'shopify_variant_id',
        'title',
        'variant_title',
        'quantity',
        'unit_price',
        'total_price',
        'currency',
        'vendor',
        'fulfillment_status',
        'requires_shipping',
    ];

    protected function casts(): array
    {
        return [
            'shopify_line_item_id' => 'integer',
            'shopify_product_id' => 'integer',
            'shopify_variant_id' => 'integer',
            'quantity' => 'integer',
            'unit_price' => 'decimal:2',
            'total_price' => 'decimal:2',
            'requires_shipping' => 'boolean',
        ];
    }

    /**
     * The order this item belongs to.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Activity logs for this item (polymorphic).
     */
    public function activityLogs()
    {
        return $this->morphMany(ActivityLog::class, 'loggable');
    }
}
