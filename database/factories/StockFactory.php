<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stock>
 */
class StockFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(), // Membuat stok untuk produk yang di-generate oleh factory produk
            'initial_stock' => $this->faker->numberBetween(0, 100), // Stok acak antara 0 dan 100
            'final_stock' => $this->faker->numberBetween(0, 100), // Stok acak antara 0 dan 100
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}
