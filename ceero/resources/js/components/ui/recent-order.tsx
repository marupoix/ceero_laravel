import { OrderDetailsModal } from "../order-details-modal";
import { useState } from "react";

interface Props {
    data?: any;
}

export function RecentOrders({data}: Props) {
    const [selectedSale, setSelectedSale] = useState<any>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = (sale: any) => {
        setSelectedSale(sale);
        setModalOpen(true);
    };
    return(
        <div className="p-3">
            <table className='w-full table-auto'>
                <thead className='w-full'>
                    <tr className='grid md:grid-cols-5 justify-between w-full'>
                        {["Order ID", "Name", "Date", "Total", "Options"].map((header) => (
                            <th key={header} className='p-2'>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((sale) => (
                        <tr key={sale.id} className="grid md:grid-cols-5 justify-items-center w-full">
                            <td className="p-2">{sale.id}</td>
                            <td className="p-2">{sale.customer_name}</td>
                            <td className="p-2">{new Date(sale.created_at).toLocaleDateString()}</td>
                            <td className="p-2">{`₱${parseFloat(sale.total).toFixed(2)}`}</td>
                            <td className="p-2 flex md:gap-2">
                            <button
                                className="inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 sm:w-auto"
                                onClick={() => openModal(sale)} // TEMP: View products in alert
                            >
                                View
                            </button>
                            <button 
                                type="button" 
                                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:w-auto" 
                            > 
                                Delete 
                            </button> 
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan={5} className="text-center p-4">
                            No recent orders found.
                        </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <OrderDetailsModal isOpen={isModalOpen} closeModal={() => setModalOpen(false)} data={selectedSale} />
        </div>
    );
}