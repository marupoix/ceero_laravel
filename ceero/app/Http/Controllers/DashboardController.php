<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Sale; 
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Recent sales with products
        $recentSales = Sale::with('products')
            ->latest()
            ->take(10)
            ->get();

        // Daily Sales
        $todaySales = Sale::whereDate('created_at', Carbon::today())->sum('total');

        // Daily Total Customers
        $todayCustomers = Sale::whereDate('created_at', Carbon::today())->count();

        // Monthly Sales
        $monthlySales = Sale::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->sum('total');

        return Inertia::render('dashboard', [
            'recentSales' => $recentSales,
            'todaySales' => $todaySales,
            'todayCustomers' => $todayCustomers,
            'monthlySales' => $monthlySales,
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
