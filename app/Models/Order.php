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
        'shopify_order_id',
        'customer_id',
        'order_number',
        'name',
        'confirmation_number',
        'financial_status',
        'fulfillment_status',
        'delivery_status',
        'payment_method',
        'tags',
        // Shipping address
        'shipping_name',
        'shipping_phone',
        'shipping_address1',
        'shipping_address2',
        'shipping_city',
        'shipping_country',
        'shipping_country_code',
        'shipping_latitude',
        'shipping_longitude',
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
        // Meta
        'source_ip',
        'source_url',
        'source_app_id',
        'order_status_url',
        // Timestamps
        'shopify_created_at',
        'shopify_processed_at',
        'webhook_received_at',
    ];

    protected function casts(): array
    {
        return [
            'shopify_order_id' => 'integer',
            'order_number' => 'integer',
            'shipping_latitude' => 'decimal:7',
            'shipping_longitude' => 'decimal:7',
            'subtotal' => 'decimal:2',
            'shipping_charge' => 'decimal:2',
            'discount' => 'decimal:2',
            'tax' => 'decimal:2',
            'total' => 'decimal:2',
            'total_outstanding' => 'decimal:2',
            'shipping_line_price' => 'decimal:2',
            'shopify_created_at' => 'datetime',
            'shopify_processed_at' => 'datetime',
            'webhook_received_at' => 'datetime',
        ];
    }

    /**
     * Valid financial statuses.
     */
    public const FINANCIAL_STATUSES = [
        'pending',
        'authorized',
        'paid',
        'partially_paid',
        'partially_refunded',
        'refunded',
        'voided',
    ];

    /**
     * Valid fulfillment statuses.
     */
    public const FULFILLMENT_STATUSES = [
        null,
        'fulfilled',
        'partial',
        'restocked',
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

    // ─── Relationships ──────────────────────────────────────────

    /**
     * The customer who placed this order.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
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
    public function notes(): HasMany
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
        return $this->financial_status === 'paid';
    }

    /**
     * Check if the order is delivered.
     */
    public function isDelivered(): bool
    {
        return $this->delivery_status === 'delivered';
    }
}
