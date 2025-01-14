import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Confirm({ auth, temporarySells }) {
    const { post, processing } = useForm();

    const handleConfirm = () => {
        post(route('sell.store'), {
            preserveScroll: true,
        });
    };

    // Menghitung total harga dari temporarySells
    const totalPrice = temporarySells.reduce((total, sell) => total + (sell.product.price.sell_price * sell.quantity), 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Confirm</h2>}
        >
            <Head title="Confirm" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-medium">Konfirmasi Pesanan</h3>
                            <div className="mt-4">
                                {temporarySells.map((sell) => (
                                    <div key={sell.id} className="flex justify-between border-b border-gray-200 py-2">
                                        <div className="text-sm text-gray-500">{sell.product.name}</div>
                                        <div className="text-sm text-gray-500">@{sell.quantity}</div>
                                        <div className="text-sm text-gray-500">Rp. {sell.product.price.sell_price}</div>
                                        <div className="text-sm text-gray-500">Rp. {sell.product.price.sell_price * sell.quantity}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4">
                                <div className="font-bold">Total:</div>
                                <div className="font-bold">Rp. {totalPrice}</div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button 
                                    className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600"
                                    onClick={handleConfirm}
                                    disabled={processing}
                                >
                                    Bayar
                                </button>
                                <Link
                                    href={route("sell.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200"
                                >
                                    Tambah
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
