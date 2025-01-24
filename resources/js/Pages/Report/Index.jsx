import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import MasukReport from './MasukReport';
import KeluarReport from './KeluarReport';
import KeteranganReport from './KeteranganReport';
import KeputusanReport from './KeputusanReport';
import './custom.css';

export default function Index({ auth, suratMasuk, suratKeterangan, suratKeputusan, suratKeluar, success }) {
    const [reportType, setReportType] = useState("masuk");
  const [searchTerm, setSearchTerm] = useState(""); // State pencarian

  // Filter surat berdasarkan tipe laporan dan kata kunci pencarian
  const filteredData = {
    masuk: (suratMasuk || []).filter((surat) =>
      (surat.nomor_surat && surat.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.nomor_agenda && surat.nomor_agenda.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.perihal && surat.perihal.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.pengirim && surat.pengirim.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    keluar: (suratKeluar || []).filter((surat) =>
      (surat.nomor_surat && surat.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.nomor_agenda && surat.nomor_agenda.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.perihal && surat.perihal.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.pengirim && surat.pengirim.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    keterangan: (suratKeterangan || []).filter((surat) =>
      (surat.nomor_surat && surat.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.nomor_agenda && surat.nomor_agenda.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.perihal && surat.perihal.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.pengirim && surat.pengirim.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    keputusan: (suratKeputusan || []).filter((surat) =>
      (surat.nomor_surat && surat.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.nomor_agenda && surat.nomor_agenda.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.perihal && surat.perihal.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (surat.pengirim && surat.pengirim.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
  };
  

  const reportComponents = {
    masuk: <MasukReport suratMasuk={filteredData.masuk} />,
    keluar: <KeluarReport suratKeluar={filteredData.keluar} />,
    keterangan: <KeteranganReport suratKeterangan={filteredData.keterangan} />,
    keputusan: <KeputusanReport suratKeputusan={filteredData.keputusan} />,
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

        {/* Filter Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari berdasarkan nomor, perihal, atau pengirim"
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tab Navigation */}
        <div className="tab-container relative flex justify-center m-4 transparent">
          <div
            className="tab-background absolute top-0 bottom-0 bg-blue-500 rounded-2xl transition-all duration-300"
            style={{
              left:
                reportType === "masuk"
                  ? "0%"
                  : reportType === "keluar"
                  ? "25%"
                  : reportType === "keterangan"
                  ? "50%"
                  : "75%",
              width: "25%",
            }}
          ></div>
          <button
            onClick={() => setReportType("masuk")}
            className={`tab-button ${reportType === "masuk" ? "active" : ""}`}
          >
            Surat Masuk
          </button>
          <button
            onClick={() => setReportType("keluar")}
            className={`tab-button ${reportType === "keluar" ? "active" : ""}`}
          >
            Surat Keluar
          </button>
          <button
            onClick={() => setReportType("keterangan")}
            className={`tab-button ${
              reportType === "keterangan" ? "active" : ""
            }`}
          >
            Surat Keterangan
          </button>
          <button
            onClick={() => setReportType("keputusan")}
            className={`tab-button ${
              reportType === "keputusan" ? "active" : ""
            }`}
          >
            Surat Keputusan
          </button>
        </div>

        {/* Report Content */}
        <div>{reportComponents[reportType]}</div>
      </div>
    </AuthenticatedLayout>
  );
}
