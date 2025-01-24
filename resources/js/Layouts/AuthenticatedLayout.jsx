import { useState, useEffect } from 'react';
import NavLink from '@/Components/NavLink';
import LoginLogo from '../../gambar/Login-Logo.png';

export default function AuthenticatedLayout({ user, header, children }) {
    const [activeNavItem, setActiveNavItem] = useState('');

    useEffect(() => {
        // Tentukan menu aktif berdasarkan URL saat ini
        const currentPath = window.location.pathname;
        if (currentPath.includes('reports')) setActiveNavItem('reports');
        else if (currentPath.includes('profile')) setActiveNavItem('profile');
        else if (currentPath.includes('staff')) setActiveNavItem('staff');
        else if (currentPath.includes('surat')) setActiveNavItem('surat');
        else setActiveNavItem('dashboard');
    }, []);

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white fixed h-screen">
                <div className="h-16 flex items-center justify-center gap-2 bg-gray-900">
                    <img src={LoginLogo} alt="Logo" className="w-8 h-8" />
                    <h2 className="text-white">SiArsip</h2>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto flex flex-col">
                    {/* Dashboard */}
                    <NavLink
                        href={route('dashboard.index')}
                        active={activeNavItem === 'dashboard'}
                    >
                        Dashboard
                    </NavLink>

                    {/* Rekap Surat */}
                    
                    <NavLink
                        href={route('reports.index')}
                        active={activeNavItem === 'reports'}
                    >
                        Rekap Surat
                    </NavLink>

                    {/* Tambah Surat (Admin Only) */}
                    {user?.role === 'admin' && (
                        <NavLink
                            href={route('surat.index')}
                            active={activeNavItem === 'surat'}
                        >
                            Tambah Surat
                        </NavLink>
                        
                    )}

                    {/* Staff (Admin Only) */}
                    {user?.role === 'admin' && (
                        <NavLink
                            href={route('staff.index')}
                            active={activeNavItem === 'staff'}
                        >
                            Staff
                        </NavLink>
                    )}

                    {/* Profil */}
                    <NavLink
                        href={route('profile.edit')}
                        active={activeNavItem === 'profile'}
                    >
                        Profil
                    </NavLink>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col ml-64">
                {/* Header */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                {/* Children */}
                <main className="flex-1 bg-gray-100 p-6">{children}</main>
            </div>
        </div>
    );
}
