<?php

use App\Http\Controllers\Api\WebhookController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Webhook endpoint — no auth required (Shopify sends data here).
| Products are auto-synced from order line_items.
|
*/

Route::post('/webhooks/orders', [WebhookController::class, 'handleOrder'])
    ->name('api.webhooks.orders');
