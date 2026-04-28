<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Funnel extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'status',
        'description',
    ];

    /**
     * Boot: auto-generate slug from name.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($funnel) {
            if (empty($funnel->slug)) {
                $funnel->slug = Str::slug($funnel->name) . '-' . Str::random(5);
            }
        });
    }

    /**
     * The user who created this funnel.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Steps in this funnel.
     */
    public function steps(): HasMany
    {
        return $this->hasMany(FunnelStep::class)->orderBy('sort_order');
    }

    /**
     * Visits/analytics for this funnel.
     */
    public function visits(): HasMany
    {
        return $this->hasMany(FunnelVisit::class);
    }

    /**
     * Orders generated from this funnel.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Check if funnel is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    /**
     * Get the landing step (first step).
     */
    public function getLandingStepAttribute(): ?FunnelStep
    {
        return $this->steps->firstWhere('type', 'landing');
    }

    /**
     * Get checkout step.
     */
    public function getCheckoutStepAttribute(): ?FunnelStep
    {
        return $this->steps->firstWhere('type', 'checkout');
    }

    /**
     * Get conversion rate.
     */
    public function getConversionRateAttribute(): float
    {
        $totalVisits = $this->visits()->count();
        if ($totalVisits === 0) return 0;

        $conversions = $this->visits()->where('converted', true)->count();
        return round(($conversions / $totalVisits) * 100, 2);
    }
}
