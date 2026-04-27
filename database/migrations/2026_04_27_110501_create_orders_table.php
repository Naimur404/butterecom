<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shopify_order_id')->unique();
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();

            // Order identifiers
            $table->unsignedInteger('order_number')->index();
            $table->string('name', 50)->nullable(); // e.g. "#1124"
            $table->string('confirmation_number', 50)->nullable()->index();

            // Statuses
            $table->string('financial_status', 50)->default('pending');
            $table->string('fulfillment_status', 50)->nullable();
            $table->string('delivery_status', 50)->default('pending'); // internal tracking
            $table->string('payment_method', 100)->nullable();
            $table->text('tags')->nullable();

            // Shipping address (snapshot at order time)
            $table->string('shipping_name')->nullable();
            $table->string('shipping_phone', 50)->nullable();
            $table->string('shipping_address1', 500)->nullable();
            $table->string('shipping_address2', 500)->nullable();
            $table->string('shipping_city')->nullable();
            $table->string('shipping_country')->nullable();
            $table->string('shipping_country_code', 10)->nullable();
            $table->decimal('shipping_latitude', 10, 7)->nullable();
            $table->decimal('shipping_longitude', 10, 7)->nullable();

            // Pricing
            $table->string('currency', 10)->default('BDT');
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('shipping_charge', 12, 2)->default(0);
            $table->decimal('discount', 12, 2)->default(0);
            $table->decimal('tax', 12, 2)->default(0);
            $table->decimal('total', 12, 2)->default(0);
            $table->decimal('total_outstanding', 12, 2)->default(0);

            // Shipping line
            $table->string('shipping_line_title')->nullable();
            $table->decimal('shipping_line_price', 12, 2)->default(0);

            // Meta
            $table->string('source_ip', 45)->nullable();
            $table->text('source_url')->nullable();
            $table->unsignedBigInteger('source_app_id')->nullable();
            $table->text('order_status_url')->nullable();

            // Shopify timestamps
            $table->timestamp('shopify_created_at')->nullable();
            $table->timestamp('shopify_processed_at')->nullable();
            $table->timestamp('webhook_received_at')->nullable();

            $table->timestamps();

            // Indexes for common filters
            $table->index('financial_status');
            $table->index('fulfillment_status');
            $table->index('delivery_status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
