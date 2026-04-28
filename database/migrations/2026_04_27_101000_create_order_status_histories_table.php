<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_status_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('field_changed', 100);
            $table->string('old_value')->nullable();
            $table->string('new_value')->nullable();
            $table->text('reason')->nullable();
            $table->timestamps();

            $table->index('order_id');
            $table->index('field_changed');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_status_histories');
    }
};
