import Modal from '@/Components/Modal';
import React, { useState } from 'react';

export default function KeteranganReport({ suratKeterangan }) {
    const [iframeUrl, setIframeUrl] = useState(""); // State untuk URL file surat
    const [isIframeModalOpen, setIsIframeModalOpen] = useState(false);
    
        const handleFileClick = (url) => {
            setIframeUrl(url);
            setIsIframeModalOpen(true);
        };
        const closeIframeModal = () => {
            setIframeUrl("");  
            setIsIframeModalOpen(false); // Tutup modal iframe
        };
    return (
        <div className="p-4 overflow-x-auto">
            {suratKeterangan.length === 0 ? (
                <div className="text-center text-gray-600 mt-4">
                    <p>Data surat keterangan tidak tersedia.</p>
                </div>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                                            <th className="border border-gray-300 px-4 py-2">Nomor Surat</th>
                                            <th className="border border-gray-300 px-4 py-2">Nomor Agenda</th>
                                            <th className="border border-gray-300 px-4 py-2">Perihal</th>
                                            <th className="border border-gray-300 px-4 py-2">Pengirim</th>
                                            <th className="border border-gray-300 px-4 py-2">Surat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {suratKeterangan.map((surat) => (
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
