<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('funnel_visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('funnel_id')->constrained('funnels')->cascadeOnDelete();
            $table->foreignId('funnel_step_id')->constrained('funnel_steps')->cascadeOnDelete();
            $table->foreignId('order_id')->nullable()->constrained('orders')->nullOnDelete();
            $table->string('visitor_ip', 45)->nullable();
            $table->string('session_id')->nullable()->index();
            $table->boolean('converted')->default(false)->index();
            $table->timestamps();

            $table->index('funnel_id');
            $table->index('funnel_step_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('funnel_visits');
    }
};
