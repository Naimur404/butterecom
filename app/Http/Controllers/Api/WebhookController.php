<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function __construct(
        protected OrderService $orderService,
    ) {}

    /**
     * Handle incoming Shopify order webhook.
     * Products are auto-synced from line_items inside OrderService.
     *
     * POST /api/webhooks/orders
     */
    public function handleOrder(Request $request): JsonResponse
    {
        try {
            $data = $request->all();

            if (empty($data['order']['id']) || empty($data['customer']['id'])) {
                Log::warning('Webhook received with missing order or customer ID', [
                    'payload' => $data,
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Missing required order or customer ID.',
                ], 422);
            }

            $order = $this->orderService->processWebhook($data);

            return response()->json([
                'success' => true,
                'message' => 'Order processed successfully.',
                'data' => [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                    'shopify_order_id' => $order->shopify_order_id,
                ],
            ], 200);

        } catch (\Throwable $e) {
            Log::error('Webhook processing failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'payload' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error.',
            ], 500);
        }
    }
}
