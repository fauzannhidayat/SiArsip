// resources/js/Components/TambahPermintaanForm.jsx

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import SelectInput from './SelectInput';

export default function TambahSuratForm({ onSuccess }) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        tanggal_surat: '',
        nomor_surat: '',
        perihal: '',
        pengirim: '',
        jenis_surat: '',
        file_surat: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('surat.store'), {
            onSuccess: () => {
                onSuccess();
                reset(); // Reset form setelah sukses
                console.log("Data berhasil disimpan!");
            },
            onError: (errors) => {
                console.error("Error:", errors);
            },
        });
    };

    return (
        <>
            <Head title="Tambah Surat" />
            <div className='p-3'>

            <h2 className='text-center text-white'>Tambah Surat</h2>
            <form onSubmit={submit}>
            <div>
                    <InputLabel htmlFor="jenis_Surat" value="Jenis Surat" />

                    <SelectInput
                    name="jenis_surat"
                    id="jenis_Surat"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("jenis_surat", e.target.value)}
                    >
                    <option value="">Pilih Jenis Surat</option>
                    <option value="masuk">Masuk</option>
                    <option value="keluar">Keluar</option>
                    <option value="keterangan">Keterangan</option>
                    <option value="keputusan">Keputusan</option>
                    </SelectInput>

                    <InputError message={errors.jenis_Surat} className="mt-2" />
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
                    <InputLabel htmlFor="pengirim" value="pengirim Surat" />
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
