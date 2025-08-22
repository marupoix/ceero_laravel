import { Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
import { useState } from "react";

interface Product {
    id?: number;
    name: string;
    price: number;
    quantity?: number;
}

interface Props {
    selectedProducts: Product[];
    setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function POSCounter({ selectedProducts, setSelectedProducts }: Props) {
    const handleRemove = (id: number | undefined) => {
        setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const [cash, setCash] = useState("");
    const [discount, setDiscount] = useState("");

    // Calculate total price
    const totalPrice = selectedProducts.reduce(
        (sum, product) => sum + (product.price * (product.quantity || 1)),
        0
    );

    // Parse discount as percentage (0-99)
    const discountPercent = Math.min(parseFloat(discount) || 0, 99);
    const discountValue = (totalPrice * discountPercent) / 100;
    const cashValue = parseFloat(cash) || 0;

    // Calculate final total after discount
    const finalTotal = Math.max(totalPrice - discountValue, 0);

    // Calculate change
    const change = cashValue >= finalTotal ? (cashValue - finalTotal) : 0;

    // Enable Pay button only if enough cash is provided and total > 0
    const canPay = cashValue >= finalTotal && finalTotal > 0;

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto">
                <form action="">
                    <table className="w-full table-auto">
                        <thead className="bg-amber-500 justify-around">
                            <tr>
                                <th className="p-3">Product</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Remove</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {selectedProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="text-left p-2">{product.name}</td>
                                    <td className="text-center p-2">{product.quantity || 1}</td>
                                    <td className="p-2">₱{product.price * (product.quantity || 1)}</td>
                                    <td className="p-2 flex items-center justify-center">
                                        <span>
                                            <Trash2
                                                className="cursor-pointer text-red-500 transition hover:text-red-800 delay-10 ease-in"
                                                onClick={() => handleRemove(product.id)}
                                            />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
            <div className="bg-blue-800 flex-1 p-4 flex flex-col gap-6 justify-center">
                <div className="flex flex-col gap-1 font-semibold justify-between">
                    <div className="flex place-items-center justify-between">
                        <span>Customer Name</span>
                        <input className="border border-gray-300 p-2 rounded" name="" id="" required/>
                    </div>
                    <div className="flex place-items-center justify-between">
                        <span>Total Price</span>
                        <input
                            className="border border-gray-300 p-2 rounded"
                            name="TotalPrice"
                            id=""
                            value={`₱${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            readOnly
                        />
                    </div>
                    <div className="flex place-items-center justify-between">
                        <span>Discount (%)</span>
                        <input
                            className="border border-gray-300 p-2 rounded"
                            name="Discount"
                            id=""
                            value={discount}
                            onChange={e => setDiscount(e.target.value.replace(/[^0-9.]/g, ""))}
                            placeholder="0"
                            maxLength={3}
                        />
                    </div>
                    <div className="flex place-items-center justify-between">
                        <span>Cash</span>
                        <input
                            className="border border-gray-300 p-2 rounded"
                            name=""
                            id=""
                            value={`₱${cash}`}
                            onChange={e => setCash(e.target.value.replace(/[^0-9.]/g, ""))}
                        />
                    </div>
                    <div className="flex place-items-center justify-between">
                        <span>Change</span>
                        <input
                            className="border border-gray-300 p-2 rounded"
                            name="Change"
                            id=""
                            value={cash ? `₱${change.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded cursor-pointer transition hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!canPay}
                    >
                        Pay
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedProducts([])}
                        className="bg-red-500 text-white p-2 rounded cursor-pointer transition hover:bg-red-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

