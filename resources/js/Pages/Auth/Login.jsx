import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
    <Head title="Log in" />

    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

    <form onSubmit={submit}>
        <div className="flex flex-row justify-between">
            <h2 className=""></h2>
            <h2 className="text-center text-white bg-indigo-600 p-3 rounded-lg shadow-md">
                Login Admin
            </h2>
            <h2 className=""></h2>
        </div>

        <div className="mt-6">
            <InputLabel 
                htmlFor="email" 
                value="Email" 
                className="!text-indigo-800 font-bold" // Warna lebih cerah dan tegas
            />

            <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full px-4 py-2 border-2 border-indigo-300 bg-indigo-50 text-indigo-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-300"
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData('email', e.target.value)}
            />

            <InputError message={errors.email} className="mt-2 text-red-500" />
        </div>

        <div className="mt-4">
            <InputLabel 
                htmlFor="password" 
                value="Password" 
                className="!text-indigo-800 font-bold" // Warna lebih cerah dan tegas
            />

            <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full px-4 py-2 border-2 border-indigo-300 bg-indigo-50 text-indigo-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-300"
                autoComplete="current-password"
                onChange={(e) => setData('password', e.target.value)}
            />

            <InputError message={errors.password} className="mt-2 text-red-500" />
        </div>

        <div className="block mt-4">
            <label className="flex items-center">
                <Checkbox
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                    className="text-indigo-500 focus:ring-indigo-500 focus:ring-offset-2"
                />
                <span className="ms-2 text-sm text-indigo-800">Remember me</span>
            </label>
        </div>

        <div className="flex items-center justify-end mt-6">
            {canResetPassword && (
                <Link
                    href={route('password.request')}
                    className="underline text-sm text-indigo-800 hover:text-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Forgot your password?
                </Link>
            )}

            <PrimaryButton
                className="ms-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
                disabled={processing}
            >
                Log in
            </PrimaryButton>
        </div>
    </form>
</GuestLayout>

    );
}
