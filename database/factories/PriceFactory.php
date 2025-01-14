<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Price>
 */
class PriceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(), // Membuat harga untuk produk yang di-generate oleh factory produk
            'sell_price'=> $this->faker->randomFloat(0, 10, 1000), // Harga acak antara 10 dan 1000 dengan dua angka di belakang koma
            'buy_price'=> $this->faker->randomFloat(0, 10, 1000), // Harga acak antara 10 dan 1000 dengan dua angka di belakang koma
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}
