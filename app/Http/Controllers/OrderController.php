<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(
        protected OrderService $orderService
    ) {}

    /**
     * Display a listing of orders.
     *
     * GET /orders
     */
    public function index(Request $request)
    {
        $query = Order::with('customer')
            ->latest();

        // Filters
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('confirmation_number', 'like', "%{$search}%")
                  ->orWhere('order_number', $search)
                  ->orWhere('shipping_phone', 'like', "%{$search}%")
                  ->orWhereHas('customer', function ($cq) use ($search) {
                      $cq->where('first_name', 'like', "%{$search}%")
                         ->orWhere('last_name', 'like', "%{$search}%")
                         ->orWhere('phone', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('financial_status')) {
            $query->where('financial_status', $request->input('financial_status'));
        }

        if ($request->filled('delivery_status')) {
            $query->where('delivery_status', $request->input('delivery_status'));
        }

        if ($request->filled('fulfillment_status')) {
            $query->where('fulfillment_status', $request->input('fulfillment_status'));
        }

        $orders = $query->paginate(25)->withQueryString();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'financial_status', 'delivery_status', 'fulfillment_status']),
            'statuses' => [
                'financial' => Order::FINANCIAL_STATUSES,
                'delivery' => Order::DELIVERY_STATUSES,
            ],
        ]);
    }

    /**
     * Display a single order with all details.
     *
     * GET /orders/{order}
     */
    public function show(Order $order)
    {
        $order->load([
            'customer',
            'items',
            'notes.user',
            'statusHistories.user',
            'activityLogs.user',
        ]);

        return Inertia::render('Orders/Show', [
            'order' => $order,
            'statuses' => [
                'financial' => Order::FINANCIAL_STATUSES,
                'fulfillment' => Order::FULFILLMENT_STATUSES,
                'delivery' => Order::DELIVERY_STATUSES,
            ],
        ]);
    }

    /**
     * Update the financial/fulfillment/delivery status.
     *
     * PUT /orders/{order}/status
     */
    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'field' => 'required|in:financial_status,fulfillment_status,delivery_status',
            'value' => 'required|string|max:50',
            'reason' => 'nullable|string|max:1000',
        ]);

        $this->orderService->updateStatus(
            $order,
            $validated['field'],
            $validated['value'],
            $validated['reason'] ?? null
        );

        return back()->with('success', ucfirst(str_replace('_', ' ', $validated['field'])) . ' updated.');
    }

    /**
     * Add a note to the order.
     *
     * POST /orders/{order}/notes
     */
    public function addNote(Request $request, Order $order)
    {
        $validated = $request->validate([
            'note' => 'required|string|max:5000',
            'is_internal' => 'boolean',
        ]);

        $this->orderService->addNote(
            $order,
            $validated['note'],
            $validated['is_internal'] ?? true
        );

        return back()->with('success', 'Note added.');
    }

    /**
     * Delete a note.
     *
     * DELETE /orders/{order}/notes/{note}
     */
    public function deleteNote(Order $order, int $noteId)
    {
        $note = $order->notes()->findOrFail($noteId);
        $note->delete();

        return back()->with('success', 'Note deleted.');
    }

    /**
     * Update shipping address.
     *
     * PUT /orders/{order}/address
     */
    public function updateAddress(Request $request, Order $order)
    {
        $validated = $request->validate([
            'shipping_name' => 'nullable|string|max:255',
            'shipping_phone' => 'nullable|string|max:50',
            'shipping_address1' => 'nullable|string|max:500',
            'shipping_address2' => 'nullable|string|max:500',
            'shipping_city' => 'nullable|string|max:255',
            'shipping_country' => 'nullable|string|max:255',
            'shipping_country_code' => 'nullable|string|max:10',
        ]);

        $this->orderService->updateShippingAddress($order, $validated);

        return back()->with('success', 'Shipping address updated.');
    }

    /**
     * Update pricing.
     *
     * PUT /orders/{order}/pricing
     */
    public function updatePricing(Request $request, Order $order)
    {
        $validated = $request->validate([
            'subtotal' => 'nullable|numeric|min:0',
            'shipping_charge' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'total' => 'nullable|numeric|min:0',
            'total_outstanding' => 'nullable|numeric|min:0',
        ]);

        $this->orderService->updatePricing($order, $validated);

        return back()->with('success', 'Pricing updated.');
    }

    /**
     * Update a line item (price/quantity).
     *
     * PUT /orders/{order}/items/{item}
     */
    public function updateItem(Request $request, Order $order, OrderItem $item)
    {
        // Ensure the item belongs to this order
        abort_unless($item->order_id === $order->id, 404);

        $validated = $request->validate([
            'quantity' => 'nullable|integer|min:1',
            'unit_price' => 'nullable|numeric|min:0',
            'total_price' => 'nullable|numeric|min:0',
        ]);

        $this->orderService->updateLineItem($item, $validated);

        return back()->with('success', 'Item updated.');
    }

    /**
     * Get activity log for an order.
     *
     * GET /orders/{order}/activity
     */
    public function activity(Order $order)
    {
        $logs = $order->activityLogs()
            ->with('user')
            ->paginate(50);

        return response()->json($logs);
    }
}
