import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
                Sistem Arsip Surat
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-2xl rounded-lg">
                {children}
            </div>
        </div>

    );
}
