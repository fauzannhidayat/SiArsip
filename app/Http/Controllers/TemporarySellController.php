<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\TemporarySell;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TemporarySellController extends Controller
{
    public function store(Request $request)
    {
        TemporarySell::create([
            'user_id' => Auth::id(),
            'product_id' => $request->input('product_id'),
            'quantity' => $request->input('quantity')
        ]);

        // Dapatkan data terbaru untuk keranjang
        $temporarySells = TemporarySell::with('product.price')
            ->where('user_id', Auth::id())
            ->get();

        return to_route('sell.confirm');
        // return Inertia::render('Sell/Confirm', [
        //     'success' => 'Produk berhasil dimasukkan ke keranjang',
        //     'temporarySells' => $temporarySells,
        //     'products' => ProductResource::collection(Product::with(['price', 'stock'])->get())
        // ]);
    }

    public function confirm()
    {
        $temporarySells = TemporarySell::with(['product.price', 'product.stock'])
            ->where('user_id', auth()->id())
            ->get();

        return Inertia::render('Sell/Confirm', [
            'temporarySells' => $temporarySells
        ]);
    }
}
