<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\DashboardController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('dashboard', DashboardController::class);
    Route::resource('products', ProductController::class);
    Route::resource('pos', POSController::class);
    Route::post('/receipts', [ReceiptController::class, 'store']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
