<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    protected $fillable = [
    'product_id',
    'initial_stock',
    'added_stock',
    'reduced_stock',
    'final_stock',];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
