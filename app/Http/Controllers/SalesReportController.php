<?php

namespace App\Http\Controllers;

use App\Models\Sell;
use App\Models\Purchase;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SalesReportController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Sell::with('product');

        if ($startDate && $endDate) {
            if ($startDate === $endDate) {
                $query->whereDate('created_at', $startDate);
            } else {
                $startDate2 = Carbon::parse($startDate)->subDay();
                $endDate2 = Carbon::parse($endDate)->addDay();
                $query->whereBetween('created_at', [$startDate2, $endDate2]);
            }
        }

        $sales = $query->orderBy('created_at', 'desc')->get()->map(function ($sell) {
            return [
                'id' => $sell->id,
                'product_name' => $sell->product ? $sell->product->name : 'Unknown',
                'quantity_sold' => $sell->quantity,
                'total_price' => $sell->total_price,
                'created_at' => $sell->created_at->format('Y-m-d'),
            ];
        });

        $query = Purchase::with('product');
        if ($startDate && $endDate) {
            if ($startDate === $endDate) {
                $query->whereDate('created_at', $startDate);
            } else {
                $startDate2 = Carbon::parse($startDate)->subDay();
                $endDate2 = Carbon::parse($endDate)->addDay();
                $query->whereBetween('created_at', [$startDate2, $endDate2]);
            }
        }
        $purchases = $query->orderBy('created_at', 'desc')->get()->map(function ($purchase) {
            return [
                'id' => $purchase->id,
                'product_name' => $purchase->product ? $purchase->product->name : 'Unknown',
                'quantity_purchased' => $purchase->added_stock,
                'total_buy_price' => $purchase->total_buy_price,
                'created_at' => $purchase->created_at->format('Y-m-d'),
            ];
        });

        return inertia('Report/Index', [
            'auth' => $request->user(),
            'sales' => $sales,
            'purchases' => $purchases,
            'success' => session('success'),
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }
}
