<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('surats', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_surat')->unique(); // Nomor surat yang unik
            $table->string('nomor_agenda')->unique(); // Nomor surat yang unik
            $table->string('perihal'); // Judul surat
            $table->string('pengirim'); // Pengirim surat
            $table->string('file_surat')->default(null); // Isi surat
            $table->date('tanggal_surat'); // Tanggal surat
            $table->enum('jenis_surat', ['masuk', 'keluar', 'keterangan', 'keputusan']); // Jenis surat: masuk atau keluar
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surats');
    }
};
