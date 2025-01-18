<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Sell;
use App\Models\Surat;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalSurat = Surat::all()->count();
        // Jumlah surat berdasarkan jenis
        $totalSuratMasuk = Surat::where('jenis_surat', 'masuk')->count();
        $totalSuratKeluar = Surat::where('jenis_surat', 'keluar')->count();
        $totalSuratKeterangan = Surat::where('jenis_surat', 'keterangan')->count();
        $totalSuratKeputusan = Surat::where('jenis_surat', 'keputusan')->count();

        return inertia('Dashboard', [
            'totalSurat'=> $totalSurat,
            'totalSuratMasuk' => $totalSuratMasuk,
            'totalSuratKeluar' => $totalSuratKeluar,
            'totalSuratKeterangan' => $totalSuratKeterangan,
            'totalSuratKeputusan' => $totalSuratKeputusan,
        ]);
    }
}
