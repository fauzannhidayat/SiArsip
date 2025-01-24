import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function EditStaffForm({ onSuccess, staff }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: staff.name || "",
        email: staff.email || "",
        password: "", // Biasanya kosong saat mengedit
        role: staff.role || "",
    });

    useEffect(() => {
        setData({
            name: staff.name || "",
            email: staff.email || "",
            password: "",
            role: staff.role || "",
        });
    }, [staff]);

    const submit = (e) => {
        e.preventDefault();

        put(route('staff.update', staff.id), {
            onSuccess: () => {
                reset();
                onSuccess();
            },
            onError: (errors) => {
                console.error("Error:", errors);
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <div>
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="role" value="role" />
                <TextInput
                    id="role"
                    name="role"
                    value={data.role}
                    className="mt-1 block w-full"
                    autoComplete="role"
                    onChange={(e) => setData('role', e.target.value)}
                    
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData('password', e.target.value)}
                    
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ms-4" disabled={processing}>
                    {processing ? "Menyimpan..." : "Simpan"}
                </PrimaryButton>
            </div>
        </form>
    );
}
