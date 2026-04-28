<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FunnelVisit extends Model
{
    protected $fillable = [
        'funnel_id',
        'funnel_step_id',
        'visitor_ip',
        'session_id',
        'converted',
        'order_id',
    ];

    protected function casts(): array
    {
        return [
            'converted' => 'boolean',
        ];
    }

    /**
     * The funnel this visit belongs to.
     */
    public function funnel(): BelongsTo
    {
        return $this->belongsTo(Funnel::class);
    }

    /**
     * The step that was visited.
     */
    public function step(): BelongsTo
    {
        return $this->belongsTo(FunnelStep::class, 'funnel_step_id');
    }

    /**
     * The order placed (if converted).
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
