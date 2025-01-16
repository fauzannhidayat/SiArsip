<?php

namespace App\Http\Controllers;

use App\Models\Sell;
use App\Models\Purchase;
use App\Models\Surat;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SalesReportController extends Controller
{
    public function index(Request $request)
    {
        
        // Fungsi untuk query data surat berdasarkan jenis
        $getSuratByJenis = function ($jenis) {
            $query = Surat::where('jenis_surat', $jenis);


            return $query->orderBy('tanggal_surat', 'desc')->get()->map(function ($surat) {
                return [
                    'id' => $surat->id,
                    'nomor_surat' => $surat->nomor_surat,
                    'tanggal_surat' => $surat->tanggal_surat,
                    'perihal' => $surat->perihal,
                    'pengirim' => $surat->pengirim,
                    'file_surat' => $surat->file_surat,
                ];
            });
        };

        // Ambil data surat berdasarkan jenis
        $suratMasuk = $getSuratByJenis('masuk');
        $suratKeluar = $getSuratByJenis('keluar');
        $suratKeputusan = $getSuratByJenis('keputusan');
        $suratKeterangan = $getSuratByJenis('keterangan');

        $query = Sell::with('product');


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
            'suratMasuk' => $suratMasuk,
            'suratKeluar' => $suratKeluar,
            'suratKeputusan' => $suratKeputusan,
            'suratKeterangan' => $suratKeterangan,
        ]);
    }
}
