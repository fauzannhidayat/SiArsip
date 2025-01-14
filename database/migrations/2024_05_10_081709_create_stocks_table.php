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
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            // Sesuaikan nama kolom yang merujuk ke produk menjadi 'product_id'
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->unsignedInteger('initial_stock');
            $table->unsignedInteger('added_stock')->nullable();
            $table->unsignedInteger('reduced_stock')->nullable();
            $table->unsignedInteger('final_stock');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};
