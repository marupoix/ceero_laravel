<?php

namespace App\Http\Controllers;
use App\Models\Sale;
use App\Models\Products;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Sale::with('products')->get();
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
        // ✅ Step 1: Validate the request
        $data = $request->validate([
            'customer_name' => 'required|string|max:255',
            'discount' => 'nullable|numeric|min:0|max:99',
            'cash' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'change' => 'required|numeric|min:0',
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|integer|exists:products,id',
            'products.*.price' => 'required|numeric|min:0',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // ✅ Step 2: Create the sale record
        $sale = Sale::create([
            'customer_name' => $data['customer_name'],
            'discount' => $data['discount'] ?? 0,
            'cash' => $data['cash'],
            'total' => $data['total'],
            'change' => $data['change'],
        ]);

        // ✅ Step 3: Attach products to the sale with pivot data
        foreach ($data['products'] as $product) {
            $sale->products()->attach($product['id'], [
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);
        }

        // ✅ Step 4: Optionally return or redirect
        return redirect()->back()->with('success', 'Sale recorded successfully!');
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
