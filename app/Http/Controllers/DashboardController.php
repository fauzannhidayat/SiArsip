<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Sell;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Total penjualan
        $totalSales = Sell::sum('total_price');

        // Total modal
        $totalModal = Purchase::sum('total_buy_price');

        // Keuntungan
        $profit = $totalSales - $totalModal;

        // Total produk terjual
        $totalProductsSold = Sell::sum('quantity');

        return inertia('Dashboard', [
            'totalSales' => $totalSales,
            'totalModal' => $totalModal,
            'profit' => $profit,
            'totalProductsSold' => $totalProductsSold,
        ]);
    }
}
