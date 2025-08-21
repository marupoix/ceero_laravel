import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

interface Product {
    id?: number;
    image?: string;
    name: string;
    price: number;
    availability: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    product?: Product | null;
}


export function AddProductModal({isOpen, closeModal, product }: Props) {
    const [formData, setFormData] = useState<Product>({ image: '', name: '', price: 0, availability: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        if (product) {
            setFormData({ name: product.name, price: product.price, availability: product.availability, image: product.image || "" });
            setPreview(product.image || "");
            setSelectedFile(null);
        } else {
            setFormData({ name: '', price: 0, availability: '', image: '' });
            setPreview("");
            setSelectedFile(null);
        }
    }, [product]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const form = new FormData();
        
        form.append('name', formData.name);
        form.append('price', formData.price.toString());
        form.append('availability', formData.availability.toString());
        if (selectedFile) {
            form.append('image', selectedFile);
        }

        if(product?.id) {
            form.append('_method', 'PUT');
            router.post(`/products/${product.id}`, form, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (error) => {
                    console.error((error.message) || 'Failed to submit product.');
                }
            });
        } else {
            router.post('/products', form, {
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: (error) => {
                    console.error((error.message) || 'Failed to create product.');
                }
            });
        }
    };

    if (!isOpen) return null;

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
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:m-4 sm:text-left grid gap-2">
                        <DialogTitle as="h3" className="text-base font-semibold text-white">
                        {product ? "Edit Product" : "Add Product"}
                        </DialogTitle>
                        <div className="mt-2">
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                placeholder="Product Name" 
                                className="mb-2 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500" 
                                onChange={handleChange} 
                                required />
                            <input 
                                type="number" 
                                name="price" 
                                value={formData.price} 
                                placeholder="Price" 
                                className="mb-2 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500" 
                                onChange={handleChange} 
                                required />
                            <select 
                                name="availability" 
                                value={formData.availability}
                                className="mb-2 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500"
                                onChange={e => setFormData({ ...formData, availability: e.target.value })}>
                                    <option value="">Select Availability</option>
                                    <option value="Available">Available</option>
                                    <option value="Out of Stock">Out of Stock</option>     
                            </select>
                            <input 
                                type="file" 
                                name="image" 
                                accept="image/*"    
                                onChange={handleFileChange} 
                                className="mb-2 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500"
                            />

                            {preview && (
                                <div className="mt-4">
                                    <p>Preview:</p>
                                    <img src={preview} alt="Product Preview" className="mt-2 w-full rounded-md" />
                                </div>
                            )}
                        </div>
                    </div>
                    </div>
                </div>
                    <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                        >
                            {product ? "Update" : "Create"}
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