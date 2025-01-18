<?php

namespace App\Http\Controllers;

use App\Models\Sell;
use App\Models\Purchase;
use App\Models\Surat;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
                    'file_surat' => Storage::url($surat->file_surat)
                ];
            });
        };

        // Ambil data surat berdasarkan jenis
        $suratMasuk = $getSuratByJenis('masuk');
        $suratKeluar = $getSuratByJenis('keluar');
        $suratKeputusan = $getSuratByJenis('keputusan');
        $suratKeterangan = $getSuratByJenis('keterangan');

        

        return inertia('Report/Index', [
            'auth' => $request->user(),
            'success' => session('success'),
            'suratMasuk' => $suratMasuk,
            'suratKeluar' => $suratKeluar,
            'suratKeputusan' => $suratKeputusan,
            'suratKeterangan' => $suratKeterangan,
        ]);
    }
}
