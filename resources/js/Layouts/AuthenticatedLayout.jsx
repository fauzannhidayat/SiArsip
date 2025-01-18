import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import LoginLogo from '../../gambar/Login-Logo.png';

export default function AuthenticatedLayout({ user, header, children }) {
    const [activeNavItem, setActiveNavItem] = useState(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('report')) return 'report';
        if (currentPath.includes('sell')) return 'sell';
        if (currentPath.includes('user')) return 'user';
        if (currentPath.includes('product')) return 'product';
        if (currentPath.includes('surat')) return 'surat';
        return 'dashboard';
    });

    const handleNavItemClick = (item) => {
        setActiveNavItem(item);
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white fixed h-screen  ">
                <div className="h-16 flex items-center justify-center gap-2 bg-gray-900">
                    <img src={LoginLogo} alt="Logo" className="w-8 h-8" />
                    <h2 className="text-white">SiArsip</h2>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto flex flex-col">
                    <NavLink href={route('dashboard.index')} active={activeNavItem === 'dashboard'} onClick={() => handleNavItemClick('dashboard')}>
                        Dashboard
                    </NavLink>
                    <NavLink href={route('reports.index')} active={activeNavItem === 'report'} onClick={() => handleNavItemClick('report')}>
                        Rekap Surat 
                    </NavLink>
                    
                    <NavLink href={route('surat.index')} active={activeNavItem === 'surat'} onClick={() => handleNavItemClick('surat')}>
                        Tambah Surat
                    </NavLink>
                    <NavLink href={route('profile.edit')} active={activeNavItem === 'user'} onClick={() => handleNavItemClick('user')}>
                        User
                    </NavLink>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col ml-64">
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="flex-1 bg-gray-100  p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
