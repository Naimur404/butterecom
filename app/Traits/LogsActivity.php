<?php

namespace App\Traits;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

/**
 * Trait LogsActivity
 *
 * Automatically logs create, update, and delete operations on the model.
 * Attach this trait to any Eloquent model that needs audit logging.
 *
 * Usage:
 *   use App\Traits\LogsActivity;
 *   class Order extends Model { use LogsActivity; }
 */
trait LogsActivity
{
    /**
     * Boot the trait and register model event listeners.
     */
    public static function bootLogsActivity(): void
    {
        // Log model creation
        static::created(function ($model) {
            $model->logActivity('created', null, $model->getAttributes());
        });

        // Log model updates (only changed fields)
        static::updated(function ($model) {
            $dirty = $model->getDirty();
            if (empty($dirty)) {
                return;
            }

            $oldValues = [];
            $newValues = [];
            foreach ($dirty as $key => $newValue) {
                // Skip timestamps from logging
                if (in_array($key, ['created_at', 'updated_at'])) {
                    continue;
                }
                $oldValues[$key] = $model->getOriginal($key);
                $newValues[$key] = $newValue;
            }

            if (!empty($newValues)) {
                $model->logActivity('updated', $oldValues, $newValues);
            }
        });

        // Log model deletion
        static::deleted(function ($model) {
            $model->logActivity('deleted', $model->getOriginal(), null);
        });
    }

    /**
     * Manually log a custom activity for this model.
     */
    public function logActivity(string $action, ?array $oldValues = null, ?array $newValues = null, ?int $userId = null): ActivityLog
    {
        return ActivityLog::create([
            'loggable_type' => get_class($this),
            'loggable_id' => $this->getKey(),
            'user_id' => $userId ?? Auth::id(),
            'action' => $action,
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }

    /**
     * Get all activity logs for this model instance.
     */
    public function activities()
    {
        return $this->morphMany(ActivityLog::class, 'loggable')->latest();
    }
}
