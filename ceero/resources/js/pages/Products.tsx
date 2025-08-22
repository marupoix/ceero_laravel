import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from "react";
import { ProductModal } from '@/components/product-modal';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Products() {
    const { products } = usePage<{ products: { id: number; image?: string; name: string; price: number; availability: boolean; }[] }>().props;
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (product = null) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }
    

    const handleDelete = (id: number) => {
        router.delete(`/products/${id}`, {
            onSuccess: () => {
                router.reload();
            },
            onError: () => {
                console.error('Failed to delete product.');
            }
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                    <div dir='rtl'> 
                        <Button onClick={() => openModal()}>Add Product</Button>
                    </div>

                    <div className="relative p-5 flex-1 overflow-auto rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <table className='w-full table-auto'>
                            <thead className='w-full'>
                                <tr className='grid grid-cols-4 justify-around w-full'>
                                    {[ "Name", "Price", "Availability", "Options"].map((header) => (
                                        <th key={header} className='p-2'>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='mt-5'>
                                {products.length ? (
                                    products.map((product) => (
                                        <tr key={product.id} className='grid grid-cols-4 justify-items-center w-full'>
                                            {/* <td className='p-2'>{product.image ? <img src={product.image} alt={product.name} /> : "No Picture"}</td> */}
                                            <td className='p-2'>{product.name}</td>
                                            <td className='p-2'>{product.price}</td>
                                            <td className='p-2'>{product.availability}</td>
                                            <td className='p-2'>
                                                <button
                                                    onClick={() => openModal(product)}
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                                                    >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(product.id)}
                                                    className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                                                    >
                                                    Delete
                                                    </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className='p-2 text-center' colSpan={5}>No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ProductModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} product={selectedProduct}  />
        </AppLayout>
    );
}
