<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FunnelStep extends Model
{
    protected $fillable = [
        'funnel_id',
        'type',
        'product_id',
        'title',
        'content',
        'sort_order',
        'is_active',
        'settings',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'is_active' => 'boolean',
            'settings' => 'array',
        ];
    }

    /**
     * Valid step types.
     */
    public const TYPES = [
        'landing',
        'checkout',
        'upsell',
        'downsell',
        'thank_you',
    ];

    /**
     * The funnel this step belongs to.
     */
    public function funnel(): BelongsTo
    {
        return $this->belongsTo(Funnel::class);
    }

    /**
     * The product associated with this step (if any).
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Visits to this step.
     */
    public function visits(): HasMany
    {
        return $this->hasMany(FunnelVisit::class);
    }

    /**
     * Get the next step in the funnel.
     */
    public function getNextStepAttribute(): ?FunnelStep
    {
        return FunnelStep::where('funnel_id', $this->funnel_id)
            ->where('sort_order', '>', $this->sort_order)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->first();
    }

    /**
     * Get the previous step in the funnel.
     */
    public function getPreviousStepAttribute(): ?FunnelStep
    {
        return FunnelStep::where('funnel_id', $this->funnel_id)
            ->where('sort_order', '<', $this->sort_order)
            ->where('is_active', true)
            ->orderByDesc('sort_order')
            ->first();
    }
}
