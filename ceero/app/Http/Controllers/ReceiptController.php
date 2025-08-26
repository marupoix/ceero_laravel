<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;
use App\Models\Product;
use App\Models\ProductSale;
use Illuminate\Support\Facades\DB;

class ReceiptController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'total' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'cash' => 'required|numeric',
            'change' => 'required|numeric',
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.price' => 'required|numeric',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            // Save sale
            $sale = Sale::create([
                'customer_name' => $validated['customer_name'],
                'total' => $validated['total'],
                'discount' => $validated['discount'] ?? 0,
                'cash' => $validated['cash'],
                'change' => $validated['change'],
            ]);

            // Save products associated with the sale
            foreach ($validated['products'] as $product) {
                $sale->products()->attach($product['id'], [
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                ]);
            }

            DB::commit();

            return redirect()->back()->with('success', 'Receipt saved successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to save receipt: ' . $e->getMessage()]);
        }
    }
}
