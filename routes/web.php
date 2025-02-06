<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SalesReportController;
use App\Http\Controllers\SellController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\TemporarySellController;
use App\Http\Controllers\UserController;
use App\Models\Sell;
use Database\Factories\ProductFactory;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard.index');

    Route::get('/reports', [SalesReportController::class, 'index'])->name('reports.index');
    Route::resource('project', ProjectController::class);
    Route::post('/temporary-sell', [TemporarySellController::class, 'store'])->name('temporary-sell.store');
    Route::get('/sell/confirm', [TemporarySellController::class, 'confirm'])->name('sell.confirm');
    Route::resource('user', UserController::class);
    Route::resource('surat', SuratController::class);
    Route::get('/products/{product}/add-stock-form', [ProductController::class, 'addStockForm'])->name('product.addStockForm');
    Route::post('/products/{product}/add-stock', [ProductController::class, 'addStock'])->name('product.addStock');
    Route::resource('product', ProductController::class);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
