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
            'email' => 'ade@example.com',
            'password' => bcrypt('ade123'),
            'email_verified_at' => time()
        ]);

        Project::factory()
            ->count(30)
            ->create();

        

        $this->call(PriceStockSeeder::class);
    }
}
