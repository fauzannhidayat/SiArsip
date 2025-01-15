import Modal from '@/Components/Modal';
import TambahSuratForm from '@/Components/TambahSuratForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, surats, products, success }) {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Filtered surat list
    const filteredSurats = surats.filter((surat) =>
        surat.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surat.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surat.pengirim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surat.jenis_surat.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

                {/* Filter Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Cari surat berdasarkan nomor, perihal, pengirim, atau jenis surat"
                        className="w-full p-2 border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <div className="hidden sm:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
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
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSurats.map((surat) => (
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <Modal show={showModal} onClose={toggleModal}>
                    <TambahSuratForm onSuccess={toggleModal} />
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
