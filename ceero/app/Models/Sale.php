<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = ['customer_name', 'total', 'discount', 'cash', 'change'];

    public function products()
    {
        return $this->belongsToMany(Products::class, 'product_sale', 'sale_id', 'products_id')
                    ->withPivot('quantity', 'price')
                    ->withTimestamps();
    }
}
