<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->foreignId('funnel_id')->nullable()->constrained('funnels')->nullOnDelete();

            $table->unsignedBigInteger('order_number')->unique();
            $table->string('name')->nullable(); // display name like "#1001"

            // Statuses
            $table->string('payment_status', 50)->default('pending')->index();
            $table->string('fulfillment_status', 50)->nullable()->index();
            $table->string('delivery_status', 50)->default('pending')->index();
            $table->string('payment_method', 50)->default('cod');

            // Shipping address
            $table->string('shipping_name')->nullable();
            $table->string('shipping_phone', 50)->nullable();
            $table->string('shipping_address1', 500)->nullable();
            $table->string('shipping_address2', 500)->nullable();
            $table->string('shipping_city')->nullable();
            $table->string('shipping_country')->nullable();
            $table->string('shipping_country_code', 5)->nullable();

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
            $table->decimal('shipping_line_price', 12, 2)->nullable();

            // Coupon & notes
            $table->string('coupon_code')->nullable();
            $table->decimal('coupon_discount', 12, 2)->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index('customer_id');
            $table->index('funnel_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
