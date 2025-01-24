<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use PhpParser\Builder\Use_;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staff = User::where('role', 'staff')->get();
        return inertia("Staff/Index", [
            "staffs" => $staff,
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
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::default()],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);


        return to_route('staff.index')
            ->with('success', 'Surat berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        // Validasi input dari request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => ['nullable', Rules\Password::default()], // Password optional
            'role' => 'nullable|string|max:255', // Jika role perlu diupdate
        ]);

        // Cari staff berdasarkan ID
        $staff = User::find($id);

        if (!$staff) {
            return redirect()->route('staff.index')->with('error', 'Staff tidak ditemukan.');
        }

        // Update data staff
        $staff->name = $request->name;
        $staff->email = $request->email;

        // Periksa apakah password diisi (hanya update jika tidak kosong)
        if ($request->filled('password')) {
            $staff->password = bcrypt($request->password);
        }

        // Jika ada role, perbarui juga
        if ($request->filled('role')) {
            $staff->role = $request->role;
        }

        // Simpan perubahan ke database
        $staff->save();

        // Redirect dengan pesan sukses
        return redirect()->route('staff.index')->with('success', 'Staff berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return redirect()->route('staff.index')->with('error', 'Staff tidak ditemukan.');
        }

        $user->delete();
        return to_route('staff.index')
            ->with('success', "surat Berhasil Dihapus");
    }
}
