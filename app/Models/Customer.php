<?php

namespace App\Models;

use App\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'city',
        'country',
        'notes',
    ];

    /**
     * Get the customer's full name.
     */
    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }

    /**
     * Orders belonging to this customer.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Activity logs for this customer (polymorphic).
     */
    public function activityLogs()
    {
        return $this->morphMany(ActivityLog::class, 'loggable');
    }

    /**
     * Get total spent by this customer.
     */
    public function getTotalSpentAttribute(): float
    {
        return (float) $this->orders()->where('payment_status', 'paid')->sum('total');
    }

    /**
     * Get order count.
     */
    public function getOrderCountAttribute(): int
    {
        return $this->orders()->count();
    }
}
