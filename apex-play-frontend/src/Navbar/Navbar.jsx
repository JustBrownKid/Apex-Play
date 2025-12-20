import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Film, Tv, Info, Mail, Menu, X } from 'lucide-react';
import Logo from '../assets/Apex-Banner-w.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'HOME', path: '/', icon: <Home size={22} /> },
        { name: 'MOVIES', path: '/movies', icon: <Film size={22} /> },
        { name: 'SERIES', path: '/series', icon: <Tv size={22} /> },
        { name: 'ABOUT', path: '/about', icon: <Info size={22} /> },
        { name: 'CONTACT', path: '/contact', icon: <Mail size={22} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-6">
            <div className="max-w-6xl mx-auto bg-slate-950/60 backdrop-blur-xl border border-white/5 rounded-3xl px-8 py-2 flex items-center justify-between shadow-2xl transition-all duration-300">
                <div
                    className="w-36 md:w-44  shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                    onClick={() => navigate('/')}
                >
                    <img src={Logo} alt="Apex Logo" className="w-full h-auto object-contain" />
                </div>

                <ul className="hidden md:flex items-center gap-2 lg:gap-4">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <button
                                onClick={() => navigate(link.path)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all duration-300 flex items-center gap-2.5
                                    ${isActive(link.path)
                                        ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.15)] scale-105'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.icon}
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    className="md:hidden p-2.5 text-white bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-28 left-4 right-4 bg-slate-950/98 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-300 overflow-hidden">
                    <div className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => {
                                    navigate(link.path);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-5 p-5 rounded-2xl text font-black tracking-[0.2em] transition-all
                                    ${isActive(link.path)
                                        ? 'bg-white text-black translate-x-2'
                                        : 'text-slate-400 bg-white/[0.03] active:bg-white/10'}`}
                            >
                                {link.icon}
                                {link.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;