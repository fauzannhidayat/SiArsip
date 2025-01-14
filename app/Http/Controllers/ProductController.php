<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\StoreStockRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Price;
use App\Models\Purchase;
use App\Models\Stock;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['price', 'stock' => function ($query) {
            $query->latest(); // Mengambil stok terbaru
        }])->get();

        return inertia("Product/Index", [
            "products" => ProductResource::collection($products),
            'success' => session('success'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Product/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $product = Product::create($data);
        $addedStock = $data['stock'];

        $price = new Price(
            [
                'sell_price' => $data['sell_price'],
                'buy_price' => $data['buy_price']
            ]
        );
        $product->price()->save($price);

        // Membuat objek Stock baru dan menyimpannya dengan mengaitkannya dengan produk
        $stock = new Stock([
            'initial_stock' => 0,
            'added_stock' => $data['stock'],
            'reduced_stock' => 0,
            'final_stock' => $data['stock']
        ]);

        $product->stock()->save($stock);

        $buyPrice = $product->price->buy_price;
        $totalBuyPrice = $addedStock * $buyPrice;

        $purchase = new Purchase([
            'product_id' => $product->id,
            'added_stock' => $addedStock,
            'price' => $buyPrice,
            'total_buy_price' => $totalBuyPrice,
        ]);

        $purchase->save();

        return to_route('product.index')
            ->with('success', 'Product was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['stock' => function ($query) {
            $query->latest(); // Mengambil stok terbaru
        }]);

        return inertia("Product/Show", [
            "product" => new ProductResource($product),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return inertia('Product/Edit', [
            'product' => new ProductResource($product),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        // Perbarui data produk
        $product->update([
            'name' => $data['name'],

        ]);

        // Perbarui data harga jika ada
        if (isset($data['price'])) {
            $product->price()->update([
                'price' => $data['price'],
            ]);
        }

        // Perbarui data stok jika ada
        if (isset($data['stock'])) {
            $product->stock()->update([
                'final_stock' => $data['stock']
            ]);
        }

        return to_route('product.index')
            ->with('success', "Project \"$product->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $name = $product->name;
        $product->delete();

        return to_route('product.index')
            ->with('success', "product \"$name\" was deleted");
    }

    public function addStockForm(Product $product)
    {
        $product->load(['stock' => function ($query) {
            $query->latest()->first();
        }]);
        return inertia('Product/AddStockForm', [
            'product' => new ProductResource($product),
        ]);
    }

    public function addStock(StoreStockRequest $request, Product $product)
    {
        $data = $request->validated();
        // Mendapatkan stok terakhir
        $lastStock = $data['final_stock'];
        // Mengambil inputan penambahan stok dari request
        $addedStock = $data['added_stock'];




        // Menghitung stok saat ini
        $finalStock = $lastStock + $addedStock;

        // Menyimpan stok baru ke database
        $stock = new Stock([
            'initial_stock' => $lastStock,
            'added_stock' => $addedStock,
            'reduced_stock' => 0,
            'final_stock' => $finalStock,
        ]);

        $product->stock()->save($stock);

        // Menyimpan data pembelian ke database
        $buyPrice = $product->price->buy_price;
        $totalBuyPrice = $addedStock * $buyPrice;

        $purchase = new Purchase([
            'product_id' => $product->id,
            'added_stock' => $addedStock,
            'price' => $buyPrice,
            'total_buy_price' => $totalBuyPrice,
        ]);

        $purchase->save();

        // Redirect atau berikan respons sesuai kebutuhan
        return to_route('product.index')->with('success', 'Stock added successfully.');
    }
}
