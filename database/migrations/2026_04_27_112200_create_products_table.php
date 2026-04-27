<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shopify_product_id')->unique();
            $table->string('title');
            $table->string('vendor')->nullable()->index();
            $table->string('status', 50)->default('active')->index();
            $table->string('image_url')->nullable();
            $table->json('raw_data')->nullable(); // full webhook payload
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
