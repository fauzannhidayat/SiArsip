import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, totalSurat, totalSuratMasuk, totalSuratKeluar, totalSuratKeterangan, totalSuratKeputusan }) {
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
                <div className="max-w-screen-xl mx-auto grid grid-cols-4 gap-3 px-8">
                    {/* Total Surat Masuk */}
                    <div className="bg-white border-2 border-indigo-300 shadow-md rounded-xl flex flex-col items-center justify-center h-48">
                        <p className="text-lg font-semibold text-indigo-700">Total Surat Masuk</p>
                        <span className="text-3xl font-bold text-indigo-600">
                            {totalSuratMasuk}
                        </span>
                    </div>

                    {/* Jumlah Surat Keluar */}
                    <div className="bg-white border-2 border-indigo-300 shadow-md rounded-xl flex flex-col items-center justify-center h-48">
                        <p className="text-lg font-semibold text-indigo-700">Jumlah Surat Keluar</p>
                        <span className="text-3xl font-bold text-indigo-600">
                            {totalSuratKeluar}
                        </span>
                    </div>

                    {/* Jumlah Surat Keterangan */}
                    <div className="bg-white border-2 border-indigo-300 shadow-md rounded-xl flex flex-col items-center justify-center h-48">
                        <p className="text-lg font-semibold text-indigo-700">Jumlah Surat Keterangan</p>
                        <span className="text-3xl font-bold text-indigo-600">
                            {totalSuratKeterangan}
                        </span>

                    </div>
                    {/* Jumlah Surat Keputusan */}
                    <div className="bg-white border-2 border-indigo-300 shadow-md rounded-xl flex flex-col items-center justify-center h-48">
                        <p className="text-lg font-semibold text-indigo-700">Jumlah Surat Keputusan</p>
                        <span className="text-3xl font-bold text-indigo-600">
                            {totalSuratKeputusan}
                        </span>
                    </div>

                    {/* Total */}
                    <div className="bg-white border-2 border-indigo-300 shadow-md rounded-xl flex flex-col items-center justify-center h-48 col-span-4">
                        <p className="text-lg font-semibold text-indigo-700">Total Surat</p>
                        <span className="text-3xl font-bold text-indigo-600">
                            {totalSurat} Surat
                        </span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
