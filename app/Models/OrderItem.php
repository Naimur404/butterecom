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
        'product_id',
        'variant_id',
        'title',
        'variant_title',
        'quantity',
        'unit_price',
        'total_price',
        'currency',
        'fulfillment_status',
        'requires_shipping',
    ];

    protected function casts(): array
    {
        return [
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
     * The product for this line item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * The variant for this line item.
     */
    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }

    /**
     * Activity logs for this item (polymorphic).
     */
    public function activityLogs()
    {
        return $this->morphMany(ActivityLog::class, 'loggable');
    }
}
