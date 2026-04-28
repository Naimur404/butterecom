<?php

namespace App\Models;

use App\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'customer_id',
        'funnel_id',
        'order_number',
        'name',
        'payment_status',
        'fulfillment_status',
        'delivery_status',
        'payment_method',
        // Shipping address
        'shipping_name',
        'shipping_phone',
        'shipping_address1',
        'shipping_address2',
        'shipping_city',
        'shipping_country',
        'shipping_country_code',
        // Pricing
        'currency',
        'subtotal',
        'shipping_charge',
        'discount',
        'tax',
        'total',
        'total_outstanding',
        // Shipping line
        'shipping_line_title',
        'shipping_line_price',
        // Coupon & notes
        'coupon_code',
        'coupon_discount',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'order_number' => 'integer',
            'subtotal' => 'decimal:2',
            'shipping_charge' => 'decimal:2',
            'discount' => 'decimal:2',
            'tax' => 'decimal:2',
            'total' => 'decimal:2',
            'total_outstanding' => 'decimal:2',
            'shipping_line_price' => 'decimal:2',
            'coupon_discount' => 'decimal:2',
        ];
    }

    /**
     * Valid payment statuses.
     */
    public const PAYMENT_STATUSES = [
        'pending',
        'paid',
        'partially_paid',
        'refunded',
        'failed',
    ];

    /**
     * Valid fulfillment statuses.
     */
    public const FULFILLMENT_STATUSES = [
        null,
        'fulfilled',
        'partial',
    ];

    /**
     * Valid delivery statuses (internal tracking).
     */
    public const DELIVERY_STATUSES = [
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'in_transit',
        'delivered',
        'returned',
        'cancelled',
    ];

    /**
     * Valid payment methods.
     */
    public const PAYMENT_METHODS = [
        'cod',
        'bkash',
        'nagad',
        'sslcommerz',
        'bank_transfer',
    ];

    // ─── Relationships ──────────────────────────────────────────

    /**
     * The customer who placed this order.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * The funnel that originated this order (if any).
     */
    public function funnel(): BelongsTo
    {
        return $this->belongsTo(Funnel::class);
    }

    /**
     * Line items in this order.
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Notes attached to this order.
     */
    public function orderNotes(): HasMany
    {
        return $this->hasMany(OrderNote::class)->latest();
    }

    /**
     * Status change history for this order.
     */
    public function statusHistories(): HasMany
    {
        return $this->hasMany(OrderStatusHistory::class)->latest();
    }

    /**
     * Activity logs for this order (polymorphic).
     */
    public function activityLogs()
    {
        return $this->morphMany(ActivityLog::class, 'loggable')->latest();
    }

    // ─── Helper Methods ──────────────────────────────────────────

    /**
     * Get the formatted shipping address as a single string.
     */
    public function getFormattedAddressAttribute(): string
    {
        return collect([
            $this->shipping_address1,
            $this->shipping_address2,
            $this->shipping_city,
            $this->shipping_country,
        ])->filter()->implode(', ');
    }

    /**
     * Check if the order is fully paid.
     */
    public function isPaid(): bool
    {
        return $this->payment_status === 'paid';
    }

    /**
     * Check if the order is delivered.
     */
    public function isDelivered(): bool
    {
        return $this->delivery_status === 'delivered';
    }

    /**
     * Generate the next order number.
     */
    public static function generateOrderNumber(): int
    {
        $last = static::max('order_number') ?? 1000;
        return $last + 1;
    }
}
