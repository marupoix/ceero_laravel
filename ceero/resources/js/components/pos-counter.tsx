import { Trash2 } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ReceiptModal } from "./payment-modal";

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
  const [cash, setCash] = useState("");
  const [discount, setDiscount] = useState("");

  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const openModal = () => setIsReceiptModalOpen(true);

  // Total before discount
  const totalPrice = selectedProducts.reduce(
    (sum, product) => sum + product.price * (product.quantity || 1),
    0
  );

  const discountPercent = Math.min(parseFloat(discount) || 0, 99);
  const discountValue = (totalPrice * discountPercent) / 100;
  const finalTotal = Math.max(totalPrice - discountValue, 0);

  const cashValue = parseFloat(cash) || 0;
  const change = cashValue >= finalTotal ? cashValue - finalTotal : 0;
  const canPay = cashValue >= finalTotal && finalTotal > 0;

  const { data, setData, post, processing, reset, errors } = useForm({
    customer_name: "",
    discount: discountPercent,
    cash: cashValue,
    total: finalTotal,
    change: change,
    products: selectedProducts.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      quantity: p.quantity || 1,
    })),
  });

  // Sync calculated fields whenever state changes
  useEffect(() => {
    setData("discount", discountPercent);
    setData("cash", cashValue);
    setData("total", finalTotal);
    setData("change", change);
    setData(
      "products",
      selectedProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity || 1,
      }))
    );
  }, [discountPercent, cashValue, finalTotal, change, selectedProducts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post("/sale", {
      onSuccess: () => {
        setSelectedProducts([]);
        setCash("");
        setDiscount("");
      },
    });
  };

  const handleRemove = (id: number | undefined) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col h-full">
      {/* 🛒 Product List Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full table-auto">
          <thead className="bg-amber-500">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Remove</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {selectedProducts.map((product) => (
              <tr key={product.id}>
                <td className="text-left p-2">{product.name}</td>
                <td className="p-2">{product.quantity || 1}</td>
                <td className="p-2">₱{product.price * (product.quantity || 1)}</td>
                <td className="p-2 flex items-center justify-center">
                  <Trash2
                    className="cursor-pointer text-red-500 transition hover:text-red-800 ease-in"
                    onClick={() => handleRemove(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 💵 Payment Form */}
      <div className="bg-blue-800 p-4 flex flex-col gap-6 justify-center text-white">
        <div className="flex flex-col gap-4 font-semibold">

          {/* Customer Name */}
          <div className="flex justify-between items-center">
            <label>
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded"
              value={data.customer_name}
              onChange={(e) => setData("customer_name", e.target.value)}
              required
            />
          </div>
          {errors.customer_name && <p className="text-red-400 text-sm">{errors.customer_name}</p>}

          {/* Total */}
          <div className="flex justify-between items-center">
            <label>Total Price</label>
            <input
              className="border border-gray-300 p-2 rounded"
              value={`₱${finalTotal.toFixed(2)}`}
              readOnly
            />
          </div>

          {/* Discount */}
          <div className="flex justify-between items-center">
            <label>Discount (%)</label>
            <input
              className="border border-gray-300 p-2 rounded"
              value={discount}
              onChange={(e) => setDiscount(e.target.value.replace(/[^0-9.]/g, ""))}
              maxLength={3}
              placeholder="0"
            />
          </div>

          {/* Cash */}
          <div className="flex justify-between items-center">
            <label>Cash</label>
            <input
              className="border border-gray-300 p-2 rounded"
              value={cash}
              onChange={(e) => setCash(e.target.value.replace(/[^0-9.]/g, ""))}
            />
          </div>

          {/* Change */}
          <div className="flex justify-between items-center">
            <label>Change</label>
            <input
              className="border border-gray-300 p-2 rounded"
              value={cash ? `₱${change.toFixed(2)}` : ""}
              readOnly
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={openModal}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-green-500"
            disabled={!canPay || processing}
          >
            {processing ? "Processing..." : "Pay"}
          </button>

          <button
            type="button"
            onClick={() => setSelectedProducts([])}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
      <ReceiptModal isOpen={isReceiptModalOpen} closeModal={() => setIsReceiptModalOpen(false)} data={data} />
    </div>
  );
}
