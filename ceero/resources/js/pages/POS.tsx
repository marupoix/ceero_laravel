import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from "react";
import {AddProductModal} from '@/components/product-modal';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'POS',
        href: '/pos',
    },
];

export default function POS() {
    const { pos } = usePage<{ pos: { id: number; image?: string; name: string; price: number; availability: boolean; }[] }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS" />
            <div className="flex h-full flex-1 gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] flex-2 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div>
                       {pos.length ? 
                        (
                            pos.map((product) => (
                                <div key={product.id} className=''>
                                    {/* <td className='p-2'>{product.image ? <img src={product.image} alt={product.name} /> : "No Picture"}</td> */}
                                    <div className='p-2'>{product.name}</div>
                                    <div className='p-2'>{product.price}</div>
                                    <div className='p-2'>{product.availability}</div>
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
                    
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}


