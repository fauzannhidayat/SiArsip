import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, totalSales, profit, totalModal, totalProductsSold }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-bold text-2xl text-indigo-700 leading-tight text-center">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-indigo-50 min-h-screen">
                <div className="max-w-screen-xl mx-auto grid grid-cols-3 gap-6 px-8">
                    {/* Total Penjualan */}
                    <div className="bg-white border-2 border-indigo-300 shadow-md rounded-xl flex flex-col items-center justify-center h-48">
                        <p className="text-lg font-semibold text-indigo-700">Total Penjualan</p>
                        <span className="text-3xl font-bold text-indigo-600">
                            Rp. {totalSales.toLocaleString('id-ID')}
                        </span>
                    </div>

                    {/* Keuntungan */}
                    <div className="bg-white border-2 border-indigo-300 shadow-md rounded-xl flex flex-col items-center justify-center h-48">
                        <p className="text-lg font-semibold text-indigo-700">Keuntungan</p>
                        <span className="text-3xl font-bold text-indigo-600">
                            Rp. {profit.toLocaleString('id-ID')}
                        </span>
                    </div>

                    {/* Modal */}
                    <div className="bg-white border-2 border-indigo-300 shadow-md rounded-xl flex flex-col items-center justify-center h-48">
                        <p className="text-lg font-semibold text-indigo-700">Modal</p>
                        <span className="text-3xl font-bold text-indigo-600">
                            Rp. {totalModal.toLocaleString('id-ID')}
                        </span>
                    </div>

                    {/* Produk Terjual */}
                    <div className="bg-white border-2 border-indigo-300 shadow-md rounded-xl flex flex-col items-center justify-center h-48 col-span-3">
                        <p className="text-lg font-semibold text-indigo-700">Produk Terjual</p>
                        <span className="text-3xl font-bold text-indigo-600">
                            {totalProductsSold} Produk
                        </span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
