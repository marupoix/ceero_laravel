import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    data?: any;
}


export function ReceiptModal({isOpen, closeModal, data }: Props) {

    if (!isOpen || !data) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Send the data to Laravel using Inertia
        router.post('/receipts', data, {
            onSuccess: () => {
                closeModal(); // Optional: close modal on success
                router.reload();
            },
            onError: (errors) => {
                console.error("Error submitting receipt:", errors);
            }
        });
    };

    return (
    <div>
        <Dialog open={isOpen} onClose={closeModal} className="relative z-10">
            <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                    <DialogTitle className="text-lg font-medium leading-6 text-white p-4 border-b border-gray-600">
                        Receipt
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        {/* Form content goes here */} 
                        <div className="p-5">
                            <table className="w-full mb-5 overflow-x-auto">
                                <thead className="h-10 border-y border-dashed border-gray-600">
                                    <tr>
                                        <th className="px-2">Item</th>
                                        <th className="text-right px-2">Price</th>
                                        <th className="text-right px-2">Qty</th>
                                        <th className="text-right px-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.products.map((product: any) => (
                                        <tr className="h-10" key={product.id}>
                                            <td className="px-2">{product.name}</td>
                                            <td className="text-right px-2">{`₱${product.price}`}</td>
                                            <td className="text-right px-2">{product.quantity}</td>
                                            <td className="text-right px-2">{`₱${(product.price * product.quantity).toFixed(2)}`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>    
                            <div className="w-full">
                                <div className="flex justify-between items-center">
                                    <label className="font-semibold">Total</label>
                                    <input
                                        className="p-2 rounded text-right focus:outline-none md:w-1/2 w-full font-semibold"
                                        value={`₱${data.total.toFixed(2)}`}
                                        readOnly
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label>Cash</label>
                                    <input
                                        className="p-2 rounded text-right focus:outline-none md:w-1/2 w-full"
                                        value={`₱${data.cash.toFixed(2)}`}
                                        readOnly
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label>Discount (%)</label>
                                    <input
                                        className="p-2 rounded text-right focus:outline-none md:w-1/2 w-full"
                                        value={`₱${data.discount.toFixed(2)}`}
                                        readOnly
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label>Change</label>
                                    <input
                                        className="p-2 rounded text-right focus:outline-none md:w-1/2 w-full"
                                        value={`₱${data.change.toFixed(2)}`}
                                        readOnly
                                    />
                                </div>
                                <div className="border-y border-dotted border-gray-600">
                                    <div className="flex justify-between items-center">
                                        <label>Sold To: </label>
                                        <input
                                            className="p-2 rounded text-right focus:outline-none md:w-1/2 w-full"
                                            value={data.customer_name}
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <label>Date: </label>
                                        <label>Time: </label>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="bg-gray-700/25 px-4 py-3 md:flex md:flex-row-reverse md:px-6">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 sm:mt-0 sm:w-auto"
                            >
                                Print
                            </button>
                        </div>
                    </form>

                </DialogPanel>
            </div>
            </div>
        </Dialog>
    </div> 
    );
}