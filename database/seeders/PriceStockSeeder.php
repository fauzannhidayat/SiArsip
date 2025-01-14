<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Price;
use App\Models\Stock;
use Illuminate\Database\Seeder;

class PriceStockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        $products = Product::factory()->count(10)->create();

        // Membuat data harga dan stok untuk setiap produk
        $products->each(function ($product) {
            // Membuat data harga untuk produk
            $price = Price::factory()->create(['product_id' => $product->id]);

            // Membuat data stok untuk produk
            $stock = Stock::factory()->create(['product_id' => $product->id]);

            // Mengupdate product_id di tabel products
            $product->update(['price_id' => $price->id, 'stock_id' => $stock->id]);
        });
    }
}
