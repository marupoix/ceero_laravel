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
        Schema::create('product_sale', function (Blueprint $table) {
        $table->id();
        $table->foreignId('sale_id')->constrained()->onDelete('cascade');
        $table->foreignId('products_id')->constrained()->onDelete('cascade');
        $table->integer('quantity');
        $table->decimal('price', 10, 2); // price at time of sale
        $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_sale');
    }
};
