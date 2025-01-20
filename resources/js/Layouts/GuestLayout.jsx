import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import LoginLogo from '../../gambar/Login-Logo.png';
import BgLogo from '../../gambar/background.png';

export default function Guest({ children }) {
    return (
        <div
        className="min-h-screen flex flex-col justify-center items-center bg-cover"
        style={{
            backgroundImage: `url(${BgLogo})`,
        }}
    >
        <div>
        <img
            src={LoginLogo}
            alt="Logo"
            className="h-45 w-auto" // Sesuaikan tinggi dan lebar logo
        />
        </div>
            <div className="text-5xl font-bold text-black mb-4 drop-shadow-lg">
                Sistem Arsip Surat
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-2xl rounded-lg">
                {children}
            </div>
        </div>

    );
}
