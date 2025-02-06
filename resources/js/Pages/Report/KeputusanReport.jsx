import Modal from '@/Components/Modal';
import React, { useState } from 'react';

export default function KeputusanReport({ suratKeputusan }) {
    const [iframeUrl, setIframeUrl] = useState(""); // State untuk URL file surat
    const [isIframeModalOpen, setIsIframeModalOpen] = useState(false);
const [sortOrder, setSortOrder] = useState("asc"); // Default ascending

    const handleSortByNomorAgenda = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
    };

    const handleFileClick = (url) => {
        setIframeUrl(url);
        setIsIframeModalOpen(true);
    };
    const closeIframeModal = () => {
        setIframeUrl("");  
        setIsIframeModalOpen(false); // Tutup modal iframe
    };
    const sortedSurats = suratKeputusan.sort((a, b) => {
        const aValue = a.nomor_agenda || null; // Jika null/undefined, tetap sebagai null
    const bValue = b.nomor_agenda || null; // Jika null/undefined, tetap sebagai null

    if (aValue === null && bValue === null) return 0; // Jika keduanya null, tidak ada perubahan
    if (aValue === null) return 1; // Tempatkan null di bagian bawah
    if (bValue === null) return -1; // Tempatkan null di bagian bawah

        if (sortOrder === "asc") {
        return aValue.localeCompare(bValue); // Urutan ascending untuk nilai non-null
    } else {
        return bValue.localeCompare(aValue); // Urutan descending untuk nilai non-null
    }
    });
    return (
        
        <div className="p-4 overflow-x-auto">
            {suratKeputusan.length === 0 ? (
                <div className="text-center text-gray-600 mt-4">
                    <p>Data surat Keputusan tidak tersedia.</p>
                </div>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                            <th className="border border-gray-300 px-4 py-2">Nomor Surat</th>
                            <th
    onClick={handleSortByNomorAgenda}
    className="border border-gray-300 px-4 py-2 cursor-pointer"
>
    No Agenda {sortOrder === "asc" ? "↑" : "↓"}
</th>  
                            <th className="border border-gray-300 px-4 py-2">Perihal</th>
                            <th className="border border-gray-300 px-4 py-2">Pengirim</th>
                            <th className="border border-gray-300 px-4 py-2">Surat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suratKeputusan.map((surat) => (
                            <tr key={surat.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{surat.tanggal_surat}</td>
                                <td className="border border-gray-300 px-4 py-2">{surat.nomor_surat}</td>
                                <td className="border border-gray-300 px-4 py-2">{surat.nomor_agenda}</td>
                                <td className="border border-gray-300 px-4 py-2">{surat.perihal}</td>
                                <td className="border border-gray-300 px-4 py-2">{surat.pengirim}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                {surat.file_surat ? (
                                                <button onClick={() => handleFileClick(surat.file_surat)} className="text-indigo-600 hover:text-indigo-900">
                                                    Lihat File
                                                </button>
                                            ) : (
                                                <span className="text-gray-500">Tidak ada file</span>
                                            )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
        </div>

        
        
    );
}
