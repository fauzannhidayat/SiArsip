<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function price()
    {
        return $this->hasOne(Price::class);
    }

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }

    public function TemporarySell()
    {
        return $this->hasMany(TemporarySell::class);
    }

    // Relasi ke tabel Purchase
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }
}
