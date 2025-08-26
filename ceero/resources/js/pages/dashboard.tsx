import { RecentOrders } from '@/components/ui/recent-order';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];


export default function Dashboard() {
    const { recentSales } = usePage().props; // Fetch data from props

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        Daily Sales
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        Monthly Sales
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className='grid gap-3'>
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            Number of Accounts
                        </div>
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            Purchase Mode
                        </div>
                    </div>
                    <div className="relative col-span-2 aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <h2 className='font-semibold text-2xl pt-5 px-5'>Recent Order</h2>
                            <RecentOrders data={recentSales}/>
                    
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
