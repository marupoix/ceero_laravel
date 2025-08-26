<?php

namespace App\Models;

use App\Models\Sale;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $fillable = [
        'name',
        'price',
        'availability',
        'image',
    ];

    public function sales()
    {
        return $this->belongsToMany(Sale::class, 'product_sale', 'products_id', 'sale_id')
                    ->withPivot('quantity', 'price')
                    ->withTimestamps();
    }
}
