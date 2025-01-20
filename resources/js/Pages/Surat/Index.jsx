import EditSuratForm from '@/Components/EditSuratForm';
import Modal from '@/Components/Modal';
import TambahSuratForm from '@/Components/TambahSuratForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, surats, success }) {
    const [showModal, setShowModal] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(""); // State untuk URL file surat
    
    const [isIframeModalOpen, setIsIframeModalOpen] = useState(false); // State untuk modal iframe
    const [searchTerm, setSearchTerm] = useState("");

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentSurat, setCurrentSurat] = useState(null);


    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const openEditModal = (surat) => {
        setCurrentSurat(surat); // Set data surat yang akan diedit
        setEditModalOpen(true); // Buka modal edit
    };

    const closeEditModal = () => {
        setCurrentSurat(null); // Reset data surat
        setEditModalOpen(false); // Tutup modal edit
    };

    const openIframeModal = (url) => {
        setIframeUrl(url); // Set URL file surat
        setIsIframeModalOpen(true); // Buka modal iframe
    };

    const closeIframeModal = () => {
        setIframeUrl("");  
        setIsIframeModalOpen(false); // Tutup modal iframe
    };

    const handleFileClick = (url) => {
        setIframeUrl(url);
        setIsIframeModalOpen(true);
    };

    // Filtered surat list
    const filteredSurats = surats.filter((surat) =>
        surat.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surat.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surat.pengirim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surat.jenis_surat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteProject = (surat) => {
        if (!window.confirm("Apakah Anda Yakin ingin Menghapus Surat ini?")) {
          return;
        }
        router.delete(route("surat.destroy", surat.id));
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
                                    <th className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">No</th>  
                                    <th className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Tanggal </th>  
                                    <th className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Tanggal Surat</th>  
                                    <th className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Nomor Surat</th>  
                                    <th className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Perihal</th>  
                                    <th className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Pengirim</th>  
                                    <th className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Jenis Surat</th>  
                                    <th className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Surat</th>  
                                    <th className="px-2 py-3 sm:px-4 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Aksi</th>  
                                </tr>  
                            </thead>  
                            <tbody className="bg-white divide-y divide-gray-200">  
                                {filteredSurats.map((surat, index) => (  
                                    <tr key={surat.id}>  
                                        <td>{index + 1}</td>  
                                        <td>{new Date(surat.created_at).toLocaleDateString()}</td>  
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                                        <button onClick={() => handleFileClick(surat.file_surat)} className="text-indigo-600 hover:text-indigo-900">
                                        Lihat File
                                    </button>
                                        </td>  
                                        <td>
                                            <div className='text-sm flex gap-2'>
                                            <button  onClick={() => openEditModal(surat)} className="font-medium text-yellow-600  hover:underline mx-1">
                                            Edit
                                        </button>
                                                <button
                                            onClick={(e) => deleteProject(surat)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                        >
                                            Hapus
                                        </button>
                                            </div>
                                            
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
                <Modal title={"Tambah Surat"} show={showModal} onClose={toggleModal}>
                    <TambahSuratForm onSuccess={toggleModal} />
                </Modal>
            )}

            {/* Modal Iframe */}
            {isIframeModalOpen && (
                <Modal title={"Surat"} show={isIframeModalOpen} onClose={closeIframeModal}>
                <div className="p-4">
                <iframe src={iframeUrl} width="100%" height="500px"></iframe>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={closeIframeModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Tutup
                    </button>
                </div>
            </Modal>
            )}

{editModalOpen && (
    <Modal title="Edit Surat" show={editModalOpen} onClose={closeEditModal}>
        <EditSuratForm
            surat={currentSurat} // Data surat yang akan diedit
            onSuccess={closeEditModal} // Callback setelah sukses edit
        />
    </Modal>
)}
        </AuthenticatedLayout>
    );
}
