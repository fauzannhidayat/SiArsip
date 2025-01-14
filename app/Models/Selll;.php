<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sell extends Model
{
    use HasFactory;

    protected $fillable = [
        
        'project_id',
        'status',
    ];

    public function product()
    {
        return $this->hasMany(Product::class);
    }

}
