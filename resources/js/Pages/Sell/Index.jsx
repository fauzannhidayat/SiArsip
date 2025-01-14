import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ auth, products, success, temporarySells = [] }) {
    const { props } = usePage();
    const [quantity, setQuantity] = useState({});
    const [cartItems, setCartItems] = useState(temporarySells);

    const handleQuantityChange = (productId, value) => {
        setQuantity((prev) => ({
            ...prev,
            [productId]: value,
        }));
    };

    const handleBuy = (productId) => {
        const productQuantity = quantity[productId] || 1; // Default quantity is 1 if not set
        Inertia.post(route('temporary-sell.store'), {
            product_id: productId,
            quantity: productQuantity,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setCartItems(props.temporarySells);
            }
        });
    };

    const cartItemCount = cartItems.reduce((total, sell) => total + sell.quantity, 0);

    return (
        <AuthenticatedLayout user={auth.user} header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Jualan</h2>
                <Link href={route('sell.confirm')} className="relative text-gray-800 hover:text-gray-600 transition">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {cartItemCount}
                        </span>
                    )}
                </Link>
            </div>
        }>
            <Head title="Sell" />
            <div className="max-w-7xl  mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {success && <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">{success}</div>}
                <div className="overflow-y-auto  ">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="hidden sm:block">
                            <table className="min-w-full divide-y  divide-gray-200">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                                    {products.data.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-4 py-2 text-sm text-white">{product.name}</td>
                                            <td className="px-4 py-2 text-sm text-white">{product.price.sell_price}</td>
                                            <td className="px-4 py-2 text-sm text-white">{product.stock && product.stock.final_stock}</td>
                                            <td className="px-4 py-2 text-sm">
                                                <TextInput
                                                    type="number"
                                                    name="quantity"
                                                    value={quantity[product.id] || 1}
                                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                                    className="w-16"
                                                    disabled={!product.stock || product.stock.final_stock === 0} // Disable input if stock is 0
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => handleBuy(product.id)}
                                                    className={`py-1 px-3 text-white rounded shadow transition-all ${
                                                        (!product.stock || product.stock.final_stock === 0)
                                                            ? 'bg-gray-500 cursor-not-allowed'
                                                            : 'bg-emerald-500 hover:bg-emerald-600'
                                                    }`}
                                                    disabled={!product.stock || product.stock.final_stock === 0} // Disable button if stock is 0
                                                >
                                                    {product.stock && product.stock.final_stock === 0 ? 'Stok Habis' : 'Beli'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Layout */}
                        <div className="sm:hidden">
                            {products.data.map((product) => (
                                <div key={product.id} className="mb-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                                    <div className="flex justify-between">
                                        <div className="text-sm font-medium text-white">{product.name}</div>
                                        <div className="text-sm text-gray-500">{product.price.sell_price}</div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">Stock: {product.stock && product.stock.final_stock}</div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <TextInput
                                            type="number"
                                            name="quantity"
                                            value={quantity[product.id] || 1}
                                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                            className="w-16"
                                            disabled={!product.stock || product.stock.final_stock === 0} // Disable input if stock is 0
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleBuy(product.id)}
                                            className={`py-1 px-3 text-white rounded shadow transition-all ${
                                                (!product.stock || product.stock.final_stock === 0)
                                                    ? 'bg-gray-500 cursor-not-allowed'
                                                    : 'bg-emerald-500 hover:bg-emerald-600'
                                            }`}
                                            disabled={!product.stock || product.stock.final_stock === 0} // Disable button if stock is 0
                                        >
                                            {product.stock && product.stock.final_stock === 0 ? 'Stok Habis' : 'Beli'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </form>
                    <div className='text-center mx-auto mt-4'>
                        <Link
                            href={route("sell.confirm")}
                            className="bg-blue-400 py-2 px-4 text-gray-800 rounded shadow transition-all hover:bg-blue-500"
                        >
                            Konfirmasi Pesanan
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
