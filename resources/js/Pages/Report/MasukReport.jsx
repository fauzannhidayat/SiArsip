import React from 'react';

export default function MasukReport({ suratMasuk }) {
    return (
        <div className="p-4 overflow-x-auto">
            {suratMasuk.length === 0 ? (
                <div className="text-center text-gray-600 mt-4">
                    <p>Data surat masuk tidak tersedia.</p>
                </div>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                            <th className="border border-gray-300 px-4 py-2">Nomor Surat</th>
                            <th className="border border-gray-300 px-4 py-2">Perihal</th>
                            <th className="border border-gray-300 px-4 py-2">Pengirim</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suratMasuk.map((surat) => (
                            <tr key={surat.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{surat.tanggal_surat}</td>
                                <td className="border border-gray-300 px-4 py-2">{surat.nomor_surat}</td>
                                <td className="border border-gray-300 px-4 py-2">{surat.perihal}</td>
                                <td className="border border-gray-300 px-4 py-2">{surat.pengirim}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
