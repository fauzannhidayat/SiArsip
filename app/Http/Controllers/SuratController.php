<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use App\Http\Requests\StoreSuratRequest;
use App\Http\Requests\UpdateSuratRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SuratController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $surats = Surat::orderBy('created_at', 'desc')->get()->map(function ($surat) {
            if ($surat->file_surat) {
                $surat->file_surat = Storage::url($surat->file_surat); // Pastikan file dapat diakses melalui URL
            }
            $surat->created_at_formatted = $surat->created_at 
    ? Carbon::parse($surat->created_at)->translatedFormat('d F Y') 
    : '-'; // Atau bisa menggunakan string lain yang sesuai

$surat->tanggal_surat_formatted = $surat->tanggal_surat 
    ? Carbon::parse($surat->tanggal_surat)->translatedFormat('d F Y') 
    : '-'; // Atau bisa menggunakan string lain yang sesuai
            return $surat;
        });


        return inertia("Surat/Index", [
            'userRole' => $user->role,
            "surats" => $surats,
            'success' => session('success'),
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
    public function store(StoreSuratRequest $request)
    {
        // Debugging: Memeriksa data yang diterima
        $data = $request->validated(); // Validasi data request
        
        // Cek jika tanggal_surat kosong, jangan set tanggal otomatis
        if (empty($data['tanggal_surat'])) {
            $data['tanggal_surat'] = null; // Jangan set tanggal otomatis jika kosong
        }
        
        // Cek jika created_at kosong, tetap biarkan null atau jangan set
        if (empty($data['created_at'])) {
            $data['created_at'] = null; // Tidak ada tanggal masuk jika kosong
        }
        
        if ($request->hasFile('file_surat')) {
            $file = $request->file('file_surat');
            $path = $file->store('file_surat', 'public'); // Simpan file di storage/public/surat_files
            $data['file_surat'] = $path; // Simpan path file di database
        } else {
            $data['file_surat'] = null; // Simpan null jika file tidak diunggah
        }

        // Simpan data ke database
        Surat::create($data);

        // Redirect ke halaman index dengan pesan sukses
        return to_route('surat.index')
            ->with('success', 'Surat berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Surat $surat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Surat $surat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSuratRequest $request, Surat $surat)
    {
        if ($request->hasFile('file_surat')) {
            // Delete old file if it exists
            if ($surat->file_surat) {
                Storage::delete($surat->file_surat);
            }

            // Store new file
            $surat->file_surat = $request->file('file_surat')->store('file_surat');
        }

        // Update other attributes
        $surat->update($request->except('file_surat'));

        return redirect()->route('surat.index')
            ->with('success', 'Surat berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Surat $surat)
    {
        if ($surat->file_surat) {
            // Delete the specific file
            Storage::disk('public')->delete($surat->file_surat);
        }
        $surat->delete();
        return to_route('surat.index')
            ->with('success', "surat Berhasil Dihapus");
    }
}
