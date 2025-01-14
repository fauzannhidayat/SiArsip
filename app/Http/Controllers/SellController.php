<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmSellRequest;
use App\Models\Sell;
use App\Http\Requests\StoreSellRequest;
use App\Http\Requests\UpdateSellRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Stock;
use App\Models\TemporarySell;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SellController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = Product::with(['price', 'stock' => function ($query) {
            $query->latest(); // Mengambil stok terbaru
        }])->get();

        $temporarySells = TemporarySell::where('user_id', $request->user()->id)->get();

        return inertia("Sell/Index", [
            "products" => ProductResource::collection($products),
            'success' => session('success'),
            'temporarySells' => $temporarySells,
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    DB::beginTransaction();

    try {
        // Ambil data temporary sells berdasarkan user
        $temporarySells = TemporarySell::where('user_id', $request->user()->id)->get();

        foreach ($temporarySells as $temporarySell) {
            // Pindahkan data dari temporary sells ke sells
            $sell = new Sell();
            $sell->product_id = $temporarySell->product_id;
            $sell->quantity = $temporarySell->quantity;
            $sell->total_price = $temporarySell->quantity * $temporarySell->product->price->sell_price;
            $sell->save();

            // Update stok produk
            $lastStock = Stock::where('product_id', $temporarySell->product_id)->latest()->first();
            $initialStock = $lastStock ? $lastStock->final_stock : 0;
            $finalStock = $initialStock - $temporarySell->quantity;

            $newStock = new Stock();
            $newStock->product_id = $temporarySell->product_id;
            $newStock->initial_stock = $initialStock;
            $newStock->added_stock = 0; // Jika tidak ada penambahan stok
            $newStock->reduced_stock = $temporarySell->quantity;
            $newStock->final_stock = $finalStock;
            $newStock->save();
        }

        // Hapus data temporary sells setelah dipindahkan
        TemporarySell::where('user_id', $request->user()->id)->delete();

        DB::commit();

        return to_route('sell.index')->with('success', 'Purchase confirmed successfully.');
    } catch (\Exception $e) {
        DB::rollBack();
        return to_route('sell.confirm')->with('error', 'Failed to confirm purchase. Please try again.');
    }
}

    

    /**
     * Display the specified resource.
     */
    public function show(Sell $sell)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sell $sell)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSellRequest $request, Sell $sell)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sell $sell)
    {
        //
    }

}
