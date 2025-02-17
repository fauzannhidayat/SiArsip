// resources/js/Components/TambahPermintaanForm.jsx

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import SelectInput from './SelectInput';

export default function EditSuratForm({ onSuccess, surat }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        tanggal_surat: surat.tanggal_surat || "",
        nomor_surat: surat.nomor_surat || "",
        nomor_agenda: surat.nomor_agenda || "",
        perihal: surat.perihal || "",
        pengirim: surat.pengirim || "",
        jenis_surat: surat.jenis_surat || "", // Sesuaikan penamaan
        created_at: surat.created_at || "", // Pastikan menggunakan format yang benar
        file_surat: null,
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tanggal_surat', data.tanggal_surat);
        formData.append('nomor_surat', data.nomor_surat);
        formData.append('nomor_agenda', data.nomor_agenda);
        formData.append('perihal', data.perihal);
        formData.append('pengirim', data.pengirim);
        formData.append('jenis_surat', data.jenis_surat);
        formData.append('created_at', data.created_at);

        if (data.file_surat) {
            formData.append('file_surat', data.file_surat);
        }

        // Gunakan method PUT
        put(route('surat.update', surat.id), {
            data: formData,
            onSuccess: () => {
                reset();
                onSuccess();
            },
            onError: (errors) => {
                console.error("Error:", errors);
            },
        });
    };
    const label = data.jenis_surat === 'keluar' || data.jenis_surat === 'keputusan' ? 'Penerima Surat' : 'Pengirim Surat';
    return (
        <>
            <Head title="Edit Surat" />
            <div className="p-3">
                <h2 className="text-center text-white">Edit Surat</h2>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="jenis_Surat" value="Jenis Surat" />
                        <SelectInput
                            name="jenis_surat"
                            id="jenis_Surat"
                            className="mt-1 block w-full"
                            value={data.jenis_surat}
                            onChange={(e) => setData("jenis_surat", e.target.value)}
                        >
                            <option value="">Pilih Jenis Surat</option>
                            <option value="masuk">Masuk</option>
                            <option value="keluar">Keluar</option>
                            <option value="keterangan">Keterangan</option>
                            <option value="keputusan">Keputusan</option>
                        </SelectInput>
                        <InputError message={errors.jenis_surat} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="tanggal_masuk" value="Tanggal Masuk" />
                        <TextInput
                            id="tanggal_masuk"
                            type="date"
                            name="created_at"
                            value={data.created_at}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('created_at', e.target.value)}
                        />
                        <InputError message={errors.created_at} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="tanggal_surat" value="Tanggal Surat" />
                        <TextInput
                            id="tanggal_surat"
                            type="date"
                            name="tanggal_surat"
                            value={data.tanggal_surat}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('tanggal_surat', e.target.value)}
                        />
                        <InputError message={errors.tanggal_surat} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="nomor_surat" value="Nomor Surat" />
                        <TextInput
                            id="nomor_surat"
                            type="text"
                            name="nomor_surat"
                            value={data.nomor_surat}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('nomor_surat', e.target.value)}
                        />
                        <InputError message={errors.nomor_surat} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="nomor_agenda" value="Nomor Agenda" />
                        <TextInput
                            id="nomor_agenda"
                            type="text"
                            name="nomor_agenda"
                            value={data.nomor_agenda}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('nomor_agenda', e.target.value)}
                        />
                        <InputError message={errors.nomor_agenda} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="perihal" value="Perihal Surat" />
                        <TextInput
                            id="perihal"
                            type="text"
                            name="perihal"
                            value={data.perihal}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('perihal', e.target.value)}
                        />
                        <InputError message={errors.perihal} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="pengirim" value={label} />
                        <TextInput
                            id="pengirim"
                            type="text"
                            name="pengirim"
                            value={data.pengirim}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('pengirim', e.target.value)}
                        />
                        <InputError message={errors.pengirim} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="file_surat" value="File Surat" />
                        <TextInput
                            id="file_surat"
                            type="file"
                            name="file_surat"
                            className="mt-1 block w-full"
                            onChange={(e) => setData('file_surat', e.target.files[0])}
                        />
                        <InputError message={errors.file_surat} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            {processing ? "Menyimpan..." : "Simpan"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}

