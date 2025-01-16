import Modal from '@/Components/Modal';
import TambahSuratForm from '@/Components/TambahSuratForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, surats, success }) {
    const [showModal, setShowModal] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(""); // State untuk URL file surat
    const [isIframeModalOpen, setIsIframeModalOpen] = useState(false); // State untuk modal iframe
    const [searchTerm, setSearchTerm] = useState("");

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const openIframeModal = (url) => {
        setIframeUrl(url); // Set URL file surat
        setIsIframeModalOpen(true); // Buka modal iframe
    };

    const closeIframeModal = () => {
        setIsIframeModalOpen(false); // Tutup modal iframe
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
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSurats.map((surat) => (
                                    <tr key={surat.id}>
                                        <td>{surat.tanggal_surat}</td>
                                        <td>{surat.nomor_surat}</td>
                                        <td>{surat.perihal}</td>
                                        <td>{surat.pengirim}</td>
                                        <td className="py-2 flex justify-center">
                                            <span className={
                                                surat.jenis_surat === "masuk"
                                                    ? "px-2 py-1 rounded bg-green-600 text-white"
                                                    : surat.jenis_surat === "keluar"
                                                        ? "px-2 py-1 rounded bg-red-700 text-white"
                                                        :surat.jenis_surat === "keterangan"
                                                            ? "px-2 py-1 rounded bg-yellow-600 text-white"
                                                            : "px-2 py-1 rounded bg-blue-600 text-white"
                                            }>
                                                {surat.jenis_surat}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="text-blue-500 underline"
                                                onClick={() => openIframeModal(`/storage/${surat.file_surat}`)}
                                            >
                                                Lihat Surat
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Tambah Surat */}
            {showModal && (
                <Modal show={showModal} onClose={toggleModal}>
                    <TambahSuratForm onSuccess={toggleModal} />
                </Modal>
            )}

            {/* Modal Iframe */}
            {isIframeModalOpen && (
                <Modal show={isIframeModalOpen} onClose={closeIframeModal}>
                    <iframe
                        src={iframeUrl}
                        width="100%"
                        height="500px"
                        style={{ border: "none" }}
                        title="Surat Viewer"
                    />
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
