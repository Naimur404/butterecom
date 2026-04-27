<?php

namespace App\Models;

use App\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use LogsActivity;

    protected $fillable = [
        'shopify_product_id',
        'title',
        'vendor',
        'status',
        'image_url',
        'raw_data',
    ];

    protected function casts(): array
    {
        return [
            'shopify_product_id' => 'integer',
            'raw_data' => 'array',
        ];
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function activityLogs()
    {
        return $this->morphMany(ActivityLog::class, 'loggable')->latest();
    }
}
