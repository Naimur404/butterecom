<?php

namespace App\Models;

use App\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use LogsActivity;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'description',
        'short_description',
        'sku',
        'price',
        'compare_at_price',
        'cost_price',
        'stock_quantity',
        'track_inventory',
        'weight',
        'weight_unit',
        'is_featured',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'compare_at_price' => 'decimal:2',
            'cost_price' => 'decimal:2',
            'stock_quantity' => 'integer',
            'track_inventory' => 'boolean',
            'weight' => 'decimal:3',
            'is_featured' => 'boolean',
        ];
    }

    /**
     * Boot: auto-generate slug from title.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->title) . '-' . Str::random(5);
            }
        });
    }

    // ─── Relationships ──────────────────────────────────────────

    /**
     * The user who created this product.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The category this product belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Product variants (sizes, colors, etc.).
     */
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    /**
     * Product images.
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    /**
     * Activity logs (polymorphic).
     */
    public function activityLogs()
    {
        return $this->morphMany(ActivityLog::class, 'loggable')->latest();
    }

    // ─── Helpers ────────────────────────────────────────────────

    /**
     * Get the primary image URL.
     */
    public function getPrimaryImageAttribute(): ?string
    {
        $primary = $this->images->firstWhere('is_primary', true);
        return $primary ? $primary->image_path : $this->images->first()?->image_path;
    }

    /**
     * Check if product is in stock.
     */
    public function isInStock(): bool
    {
        if (!$this->track_inventory) {
            return true;
        }
        return $this->stock_quantity > 0;
    }

    /**
     * Calculate profit margin.
     */
    public function getMarginAttribute(): ?float
    {
        if (!$this->cost_price || $this->cost_price == 0) {
            return null;
        }
        return round((($this->price - $this->cost_price) / $this->price) * 100, 2);
    }
}
