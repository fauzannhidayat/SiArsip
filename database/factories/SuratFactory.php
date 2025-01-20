<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SuratFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomor_surat' => $this->faker->unique()->regexify('[A-Z]{3}/[0-9]{4}/[A-Z]{2}'), // Nomor surat unik dengan format
            'perihal' => $this->faker->sentence(3), // Perihal atau judul surat
            'pengirim' => $this->faker->name(), // Nama pengirim surat
            'file_surat' => $this->faker->word() . '.pdf', // Nama file surat (contoh: dokumen.pdf)
            'tanggal_surat' => $this->faker->date(), // Tanggal surat random
            'jenis_surat' => $this->faker->randomElement(['masuk', 'keluar', 'keterangan', 'keputusan']), // Jenis surat
        ];
    }
}
