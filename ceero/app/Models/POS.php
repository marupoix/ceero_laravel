<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class POS extends Model
{
    protected $fillable = [
        'name',
        'price',
        'availability',
        'image',
    ];
}
