<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemporarySell extends Model
{
    protected $fillable = ['product_id', 'quantity', 'user_id'];
    use HasFactory;

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
