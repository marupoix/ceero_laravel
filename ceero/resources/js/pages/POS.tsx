import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from "react";
import { POSCounter } from '@/components/pos-counter';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'POS',
        href: '/pos',
    },
];

export default function POS() {
    const { pos } = usePage<{ pos: { id: number; image?: string; name: string; price: number; availability: boolean; }[] }>().props;
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

    const handleAddProduct = (product: any) => {
        setSelectedProducts((prev) => {
            // If product already exists, increase quantity
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }
            // Else, add new product with quantity 1
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS" />
            <div className="md:flex flex-1 gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative flex-2 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div
                        className='grid md:grid-cols-3 gap-5 p-5 overflow-y-auto h-[88vh]'
                    >
                        {pos.length ? (
                            pos.map((product) => (
                                <div key={product.id} className='bg-slate-700/50 py-3 rounded-lg h-fit'>
                                    <div className='px-4 py-1 '>
                                        {product.image ? (
                                            <img className='w-60 h-50 object-cover rounded-t-lg' src={product.image} alt={product.name} />
                                        ) : "No Picture"}
                                    </div>
                                    <h3 className='px-4 py-1 text-base font-semibold'>{product.name}</h3>
                                    <div className='px-4 py-1'>₱ {product.price}</div>
                                    <div className='px-4 py-1 sm:flex sm:flex-row-reverse'>
                                        <Button
                                            className={
                                                product.availability === "Out of Stock"
                                                    ? "bg-gray-700 text-white cursor-not-allowed"
                                                    : "bg-green-600 hover:bg-green-700 text-white cursor-pointer transition ease-in-out duration-150"
                                            }
                                            onClick={() => handleAddProduct(product)}
                                            disabled={product.availability === "Out of Stock"}
                                        >
                                            {product.availability === "Out of Stock" ? "Out of Stock" : "Add"}
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <div className='p-2 text-center'>No products found.</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <POSCounter selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
                </div>
            </div>
        </AppLayout>
    );
}



