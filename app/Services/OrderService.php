<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderNote;
use App\Models\OrderStatusHistory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderService
{
    public function __construct(
        protected ProductService $productService
    ) {}

    /**
     * Process incoming webhook data and store the order.
     * Uses upsert logic to handle duplicate webhooks gracefully.
     */
    public function processWebhook(array $data): Order
    {
        return DB::transaction(function () use ($data) {
            // 1. Upsert customer
            $customer = $this->upsertCustomer($data['customer']);

            // 2. Upsert order
            $order = $this->upsertOrder($data, $customer);

            // 3. Sync line items
            $this->syncLineItems($order, $data['line_items']);

            // 4. Sync products from line items
            $this->productService->syncFromLineItems($data['line_items']);

            Log::info("Order #{$order->order_number} processed from webhook", [
                'order_id' => $order->id,
                'shopify_order_id' => $order->shopify_order_id,
            ]);

            return $order->load(['customer', 'items']);
        });
    }

    /**
     * Upsert a customer by Shopify customer ID.
     */
    protected function upsertCustomer(array $customerData): Customer
    {
        return Customer::updateOrCreate(
            ['shopify_customer_id' => $customerData['id']],
            [
                'first_name' => $customerData['first_name'],
                'last_name' => $customerData['last_name'] ?? null,
                'email' => $customerData['email'] ?? null,
                'phone' => $customerData['phone'] ?? null,
            ]
        );
    }

    /**
     * Upsert an order by Shopify order ID.
     */
    protected function upsertOrder(array $data, Customer $customer): Order
    {
        $orderData = $data['order'];
        $shipping = $data['shipping_address'] ?? [];
        $pricing = $data['pricing'] ?? [];
        $shippingLine = $data['shipping_line'] ?? [];
        $meta = $data['meta'] ?? [];

        return Order::updateOrCreate(
            ['shopify_order_id' => $orderData['id']],
            [
                'customer_id' => $customer->id,
                'order_number' => $orderData['order_number'],
                'name' => $orderData['name'],
                'confirmation_number' => $orderData['confirmation_number'] ?? null,
                'financial_status' => $orderData['financial_status'] ?? 'pending',
                'fulfillment_status' => $orderData['fulfillment_status'],
                'payment_method' => $orderData['payment_method'] ?? null,
                'tags' => $orderData['tags'] ?? null,

                // Shipping address
                'shipping_name' => $shipping['name'] ?? null,
                'shipping_phone' => $shipping['phone'] ?? null,
                'shipping_address1' => $shipping['address1'] ?? null,
                'shipping_address2' => $shipping['address2'] ?? null,
                'shipping_city' => $shipping['city'] ?? null,
                'shipping_country' => $shipping['country'] ?? null,
                'shipping_country_code' => $shipping['country_code'] ?? null,
                'shipping_latitude' => $shipping['latitude'] ?? null,
                'shipping_longitude' => $shipping['longitude'] ?? null,

                // Pricing
                'currency' => $pricing['currency'] ?? 'BDT',
                'subtotal' => $pricing['subtotal'] ?? 0,
                'shipping_charge' => $pricing['shipping_charge'] ?? 0,
                'discount' => $pricing['discount'] ?? 0,
                'tax' => $pricing['tax'] ?? 0,
                'total' => $pricing['total'] ?? 0,
                'total_outstanding' => $pricing['total_outstanding'] ?? 0,

                // Shipping line
                'shipping_line_title' => $shippingLine['title'] ?? null,
                'shipping_line_price' => $shippingLine['price'] ?? 0,

                // Meta
                'source_ip' => $meta['ip_address'] ?? null,
                'source_url' => $meta['full_url'] ?? null,
                'source_app_id' => $meta['source_app_id'] ?? null,
                'order_status_url' => $meta['order_status_url'] ?? null,

                // Timestamps
                'shopify_created_at' => isset($orderData['created_at'])
                    ? Carbon::parse($orderData['created_at'])
                    : null,
                'shopify_processed_at' => isset($orderData['processed_at'])
                    ? Carbon::parse($orderData['processed_at'])
                    : null,
                'webhook_received_at' => isset($data['webhook_received_at'])
                    ? Carbon::parse($data['webhook_received_at'])
                    : now(),
            ]
        );
    }

    /**
     * Sync line items for an order (upsert each, remove stale ones).
     */
    protected function syncLineItems(Order $order, array $lineItems): void
    {
        $incomingIds = [];

        foreach ($lineItems as $item) {
            $orderItem = OrderItem::updateOrCreate(
                ['shopify_line_item_id' => $item['id']],
                [
                    'order_id' => $order->id,
                    'shopify_product_id' => $item['product_id'] ?? null,
                    'shopify_variant_id' => $item['variant_id'] ?? null,
                    'title' => $item['title'],
                    'variant_title' => $item['variant_title'] ?? null,
                    'quantity' => $item['quantity'] ?? 1,
                    'unit_price' => $item['unit_price'] ?? 0,
                    'total_price' => $item['total_price'] ?? 0,
                    'currency' => $item['currency'] ?? 'BDT',
                    'vendor' => $item['vendor'] ?? null,
                    'fulfillment_status' => $item['fulfillment_status'] ?? null,
                    'requires_shipping' => $item['requires_shipping'] ?? true,
                ]
            );

            $incomingIds[] = $orderItem->id;
        }

        // Remove items no longer in the webhook payload
        $order->items()->whereNotIn('id', $incomingIds)->delete();
    }

    // ─── Status Management ───────────────────────────────────────

    /**
     * Update a status field on an order with history tracking.
     */
    public function updateStatus(Order $order, string $field, string $newValue, ?string $reason = null, ?int $userId = null): Order
    {
        $validFields = ['financial_status', 'fulfillment_status', 'delivery_status'];

        if (!in_array($field, $validFields)) {
            throw new \InvalidArgumentException("Invalid status field: {$field}");
        }

        $oldValue = $order->{$field};

        if ($oldValue === $newValue) {
            return $order;
        }

        // Update the order
        $order->update([$field => $newValue]);

        // Record in status history
        OrderStatusHistory::create([
            'order_id' => $order->id,
            'user_id' => $userId ?? auth()->id(),
            'field_changed' => $field,
            'old_value' => $oldValue,
            'new_value' => $newValue,
            'reason' => $reason,
        ]);

        return $order->fresh();
    }

    /**
     * Add a note to an order.
     */
    public function addNote(Order $order, string $note, bool $isInternal = true, ?int $userId = null): OrderNote
    {
        $orderNote = OrderNote::create([
            'order_id' => $order->id,
            'user_id' => $userId ?? auth()->id(),
            'note' => $note,
            'is_internal' => $isInternal,
        ]);

        // Log the note addition as an activity
        $order->logActivity('note_added', null, [
            'note_id' => $orderNote->id,
            'note' => $note,
            'is_internal' => $isInternal,
        ], $userId ?? auth()->id());

        return $orderNote;
    }

    /**
     * Update shipping address on an order.
     */
    public function updateShippingAddress(Order $order, array $addressData): Order
    {
        $fillable = [
            'shipping_name',
            'shipping_phone',
            'shipping_address1',
            'shipping_address2',
            'shipping_city',
            'shipping_country',
            'shipping_country_code',
            'shipping_latitude',
            'shipping_longitude',
        ];

        $filtered = array_intersect_key($addressData, array_flip($fillable));
        $order->update($filtered);

        return $order->fresh();
    }

    /**
     * Update pricing on an order.
     */
    public function updatePricing(Order $order, array $pricingData): Order
    {
        $fillable = [
            'subtotal',
            'shipping_charge',
            'discount',
            'tax',
            'total',
            'total_outstanding',
        ];

        $filtered = array_intersect_key($pricingData, array_flip($fillable));
        $order->update($filtered);

        return $order->fresh();
    }

    /**
     * Update a line item's price or quantity.
     */
    public function updateLineItem(OrderItem $item, array $data): OrderItem
    {
        $fillable = ['quantity', 'unit_price', 'total_price'];
        $filtered = array_intersect_key($data, array_flip($fillable));
        $item->update($filtered);

        return $item->fresh();
    }
}
