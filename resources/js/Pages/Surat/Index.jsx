import Modal from '@/Components/Modal';
import TambahSuratForm from '@/Components/TambahSuratForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, surats, products, success }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tambah Surat
                    </h2>
                    <button onClick={toggleModal} className="text-sm font-sm bg-green-600 rounded-lg p-1">Tambah</button>
                </div>
            }
        >
            <Head title="Tambah Surat" />

            <div className="max-w-7xl mx-auto px-2 py-12 sm:px-6 lg:px-8">
                {success && (
                    <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                        {success}
                    </div>
                )}
                <div className="overflow-x-auto">
                    <div className="hidden sm:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal Surat
                                    </th>
                                    <th scope="col" className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Nomor Surat
                                    </th>
                                    <th scope="col" className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Perihal
                                    </th>
                                    <th scope="col" className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Pengirim
                                    </th>
                                    <th scope="col" className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Jenis Surat
                                    </th>
                                    <th scope="col" className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Surat
                                    </th>
                                    <th scope="col" className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200  ">
                            {surats.map((surat) => (
            <tr key={surat.id}>
              <td>{surat.tanggal_surat}</td>
              <td>{surat.nomor_surat}</td>
              <td>{surat.perihal}</td>
              <td>{surat.pengirim}</td>
              <td>{surat.jenis_surat}</td>
              <td>
                <a
                  href={`/storage/${surat.file_surat}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lihat Surat
                </a>
              </td>
            </tr>
          ))}
                                {/* {products.data.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-2 py-3 text-gray-900  sm:px-4 sm:py-2 whitespace-nowrap text-sm">
                                            {product.name}
                                        </td>
                                        <td className="px-2 py-3 text-gray-900  sm:px-4 sm:py-2 whitespace-nowrap text-wrap text-sm">
                                            Beli: {product.price.buy_price} / Jual: {product.price.sell_price}
                                        </td>
                                        <td className="px-2 py-3 text-gray-900  sm:px-4 sm:py-2 whitespace-nowrap text-sm">
                                            {product.stock ? product.stock.final_stock : 'N/A'}
                                        </td>
                                        <td className="px-3 py-2 text-gray-900  sm:px-4 sm:py-2 whitespace-nowrap text-sm">
                                            <Link
                                                href={route("product.show", product.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                    <div className="block sm:hidden">
                        {products.data.map((product) => (
                            <div key={product.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {product.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Beli: {product.price.buy_price} / Jual: {product.price.sell_price}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Stok: {product.stock ? product.stock.final_stock : 'N/A'}
                                </div>
                                <div className="mt-2">
                                    <Link
                                        href={route("product.show", product.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <Modal show={showModal} onClose={toggleModal}>
                    <TambahSuratForm onSuccess={toggleModal}/>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
