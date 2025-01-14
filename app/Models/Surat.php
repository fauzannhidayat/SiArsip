<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surat extends Model
{
    use HasFactory;

    // Kolom yang bisa diisi secara massal
    protected $fillable = [
        'nomor_surat',
        'perihal',
        'pengirim',
        'file_surat',
        'tanggal_surat',
        'jenis_surat',
    ];
}
