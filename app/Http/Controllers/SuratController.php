<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use App\Http\Requests\StoreSuratRequest;
use App\Http\Requests\UpdateSuratRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class SuratController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $surats = Surat::orderBy('created_at', 'desc')->get();


        return inertia("Surat/Index", [

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

        $data = $request->validated(); // Validasi data request
        if ($request->hasFile('file_surat')) {
            $file = $request->file('file_surat');
            $path = $file->store('surat_files', 'public'); // Simpan file di storage/public/surat_files
            $data['file_surat'] = $path; // Simpan path file di database
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Surat $surat)
    {
        //
    }
}
