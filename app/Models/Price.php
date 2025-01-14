<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'buy_price', 'sell_price'];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
