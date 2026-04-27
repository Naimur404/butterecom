<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'loggable_type',
        'loggable_id',
        'user_id',
        'action',
        'old_values',
        'new_values',
        'ip_address',
        'user_agent',
    ];

    protected function casts(): array
    {
        return [
            'old_values' => 'array',
            'new_values' => 'array',
        ];
    }

    /**
     * The model that was logged (polymorphic).
     */
    public function loggable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * The user who performed the action.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // ─── Scopes ────────────────────────────────────────────────

    /**
     * Filter logs for a specific model type.
     */
    public function scopeForModel($query, string $modelClass)
    {
        return $query->where('loggable_type', $modelClass);
    }

    /**
     * Filter logs by action.
     */
    public function scopeAction($query, string $action)
    {
        return $query->where('action', $action);
    }
}
