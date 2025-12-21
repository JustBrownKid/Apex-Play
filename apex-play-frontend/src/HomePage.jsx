import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar
    from './Navbar/Navbar';
import UniversalFooter from './components/Footer';
const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />
            <main className="pt-28">
                <Outlet />
            </main>
            <UniversalFooter />
        </div>
    );
};

export default MainLayout;