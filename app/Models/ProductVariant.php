<?php

namespace App\Models;

use App\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    use LogsActivity;

    protected $fillable = [
        'product_id',
        'title',
        'sku',
        'price',
        'compare_at_price',
        'cost_price',
        'stock_quantity',
        'option1',
        'option2',
        'option3',
        'weight',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'compare_at_price' => 'decimal:2',
            'cost_price' => 'decimal:2',
            'stock_quantity' => 'integer',
            'weight' => 'decimal:3',
            'is_active' => 'boolean',
        ];
    }

    /**
     * The product this variant belongs to.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Activity logs (polymorphic).
     */
    public function activityLogs()
    {
        return $this->morphMany(ActivityLog::class, 'loggable');
    }

    /**
     * Check if variant is in stock.
     */
    public function isInStock(): bool
    {
        return $this->stock_quantity > 0;
    }

    /**
     * Get formatted option string (e.g. "Red / Large").
     */
    public function getOptionsStringAttribute(): string
    {
        return collect([$this->option1, $this->option2, $this->option3])
            ->filter()
            ->implode(' / ');
    }
}
