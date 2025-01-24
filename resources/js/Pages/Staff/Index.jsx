import EditStaffForm from '@/Components/EditStaffForm';
import EditSuratForm from '@/Components/EditSuratForm';
import Modal from '@/Components/Modal';
import TambahStaff from '@/Components/TambahStaff';
import TambahSuratForm from '@/Components/TambahSuratForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, staffs, success }) {
    const [showModal, setShowModal] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(""); // State untuk URL file surat
    
    const [isIframeModalOpen, setIsIframeModalOpen] = useState(false); // State untuk modal iframe
    const [searchTerm, setSearchTerm] = useState("");

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);

    const [sortOrder, setSortOrder] = useState("asc"); // Default ascending

    

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const openEditModal = (staff) => {
        setCurrentStaff(staff); // Set data surat yang akan diedit
        setEditModalOpen(true); // Buka modal edit
    };

    const closeEditModal = () => {
        setCurrentStaff(null); // Reset data surat
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
    const filteredStaffs = staffs.filter((staff) =>
        (staff.name && staff.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (staff.email && staff.email.toLowerCase().includes(searchTerm.toLowerCase())) 
        
    );
    
    // const sortedStaffs = filteredSurats.sort((a, b) => {
    //     const aValue = a.nomor_agenda || null; // Jika null/undefined, tetap sebagai null
    // const bValue = b.nomor_agenda || null; // Jika null/undefined, tetap sebagai null

    // if (aValue === null && bValue === null) return 0; // Jika keduanya null, tidak ada perubahan
    // if (aValue === null) return 1; // Tempatkan null di bagian bawah
    // if (bValue === null) return -1; // Tempatkan null di bagian bawah

    //     if (sortOrder === "asc") {
    //     return aValue.localeCompare(bValue); // Urutan ascending untuk nilai non-null
    // } else {
    //     return bValue.localeCompare(aValue); // Urutan descending untuk nilai non-null
    // }
    // });

    const deleteProject = (id) => {
        if (!window.confirm("Apakah Anda Yakin ingin Menghapus Staff ini?")) {
            return;
        }
        router.delete(route("staff.destroy", id));
        };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Staff
                    </h2>
                    <button onClick={toggleModal} className="text-sm font-sm text-white bg-green-600 rounded-lg p-1">Tambah</button>
                </div>
            }
        >
            <Head title="Tambah Staff" />

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
                        placeholder="Cari Staff berdasarkan nama atau Email"
                        className="w-full p-2 border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <div className="hidden sm:block">
                    <table className="min-w-full divide-y divide-gray-200 ">  
                            <thead className="bg-gray-50">  
                                <tr className=''>  
                                    <th className="px-2 py-3 sm:px-2 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">No</th>  
                                    <th className="px-2 py-3 sm:px-2 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Nama</th>  
                                    <th className="px-2 py-3 sm:px-2 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>  
                                    
                                    
                                    <th className="px-2 py-3 sm:px-2 sm:py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Aksi</th>  
                                </tr>  
                            </thead>  
                            <tbody className="bg-white divide-y divide-gray-200 text-center">  
                                {filteredStaffs.map((staff, index) => (
                                    <tr key={staff.id}>  
                                        <td>{index + 1}</td>  
                                
                                        <td>{staff.name}</td>
                                        <td>{staff.email}</td>
                                        <td>
                                            <div className='text-sm flex gap-2'>
                                            <button  onClick={() => openEditModal(staff)} className="font-medium text-yellow-600  hover:underline mx-1">
                                            Edit
                                        </button>
                                                <button
                                            onClick={(e) => deleteProject(staff.id)}
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
                    <TambahStaff onSuccess={toggleModal} />
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
    <Modal title="Edit Staff" show={editModalOpen} onClose={closeEditModal}>
        <EditStaffForm
            staff={currentStaff} // Data surat yang akan diedit
            onSuccess={closeEditModal} // Callback setelah sukses edit
        />
    </Modal>
)}
        </AuthenticatedLayout>
    );
}
