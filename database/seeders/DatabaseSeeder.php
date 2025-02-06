<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Project;
use App\Models\User;
use Database\Factories\ProjectFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Fauzan',
            'email' => 'fauzan@example.com',
            'password' => bcrypt('ozan1407'),
            'email_verified_at' => time()
        ]);

        User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('adminKoni'),
            // 'role' => User::ROLE_ADMIN, // Gunakan konstanta untuk role
        ]);

        $this->call(SuratSeeder::class);
    }
}
