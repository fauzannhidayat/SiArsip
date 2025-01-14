import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import SellReport from './SellReport';
import PurchaseReport from './PurchaseReport';
import './custom.css';

// Fungsi untuk mendapatkan tanggal dalam format YYYY-MM-DD
const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

export default function Index({ auth, sales, purchases, success, startDate, endDate }) {
    const [reportType, setReportType] = useState('sell');
    const { data, setData, get } = useForm({
        start_date: startDate || getTodayDate(),
        end_date: endDate || getTodayDate(),
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('reports.index'), {
            preserveState: true,
            preserveScroll: true,
            data: {
                start_date: data.start_date,
                end_date: data.end_date,
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Rekap Surat Masuk dan Keluar
                    </h2>
                </div>
            }
        >
            <Head title="Report" />

            <div className="max-w-7xl mx-auto px-2 py-12 sm:px-6 lg:px-8">
                {success && (
                    <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                        {success}
                    </div>
                )}

                <div className="font-sm mb-2">
                    <form onSubmit={handleFilter} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <input
                            type="date"
                            value={data.start_date}
                            onChange={e => setData('start_date', e.target.value)}
                            className="border border-gray-300 rounded p-1 w-full sm:w-auto"
                        />
                        <input
                            type="date"
                            value={data.end_date}
                            onChange={e => setData('end_date', e.target.value)}
                            className="border border-gray-300 rounded p-1 w-full sm:w-auto"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600 w-full sm:w-auto"
                        >
                            Filter
                        </button>
                    </form>
                </div>

                <div className="tab-container relative flex mx-auto justify-center m-4 transparent">
                    <div
                        className="tab-background absolute top-0 bottom-0 bg-blue-500 rounded-2xl transition-all duration-300"
                        style={{
                            left: reportType === 'sell' ? '0%' : '50%',
                        }}
                    ></div>
                    <button
                        onClick={() => setReportType('sell')}
                        className={`tab-button ${reportType === 'sell' ? 'active' : ''}`}
                    >
                        Surat Masuk
                    </button>
                    <button
                        onClick={() => setReportType('purchase')}
                        className={`tab-button ${reportType === 'purchase' ? 'active' : ''}`}
                    >
                        Surat Keluar
                    </button>
                </div>
                {reportType === 'sell' ? <SellReport sales={sales} /> : <PurchaseReport purchases={purchases} />}
            </div>
        </AuthenticatedLayout>
    );
}
