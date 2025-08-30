import { RecentOrders } from '@/components/ui/recent-order';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { AnimatedCounter } from '@/components/ui/animate-counter';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];


export default function Dashboard() {
    const { recentSales, todaySales, todayCustomers, monthlySales } = usePage().props

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 text-center">
                    <div className=" place-content-center relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                         <h3 className="text-lg  font-semibold">Daily Sales</h3>
                        <p className="text-2xl font-bold text-green-500 mt-2">
                            <AnimatedCounter value={todaySales} currency/>
                        </p>
                    </div>
                    <div className="place-content-center  relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <h3 className="text-lg font-semibold">Daily Total Customers</h3>
                        <p className="text-2xl font-bold text-blue-500 mt-2">
                            <AnimatedCounter value={todayCustomers} />
                        </p>
                    </div>
                    <div className="place-content-center  relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                         <h3 className="text-lg font-semibold">
                            Total Sales for {new Date().toLocaleString('default', { month: 'long' })}
                        </h3>
                        <p className="text-2xl font-bold text-purple-500 mt-2">
                            <AnimatedCounter value={monthlySales} currency/>
                        </p>
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
