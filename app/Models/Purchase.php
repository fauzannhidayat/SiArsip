<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'added_stock', 'price','total_buy_price'];

    // Relasi ke tabel Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
