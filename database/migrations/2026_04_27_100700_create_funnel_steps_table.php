<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('funnel_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('funnel_id')->constrained('funnels')->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->enum('type', ['landing', 'checkout', 'upsell', 'downsell', 'thank_you']);
            $table->string('title');
            $table->longText('content')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->json('settings')->nullable();
            $table->timestamps();

            $table->index('funnel_id');
            $table->index('product_id');
            $table->index(['funnel_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('funnel_steps');
    }
};
