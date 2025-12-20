import React, { useEffect } from 'react';
import Logo from '../assets/Apex-Banner-W.png';

const Loading = () => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
            <div className="relative flex flex-col items-center -mt-28 md:-mt-32">

                <div className="relative">
                    <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full animate-pulse scale-150" />

                    <img
                        src={Logo}
                        alt="Apex"
                        className="w-48 md:w-64 relative z-10 animate-bounce transition-all duration-1000"
                        style={{ animationDuration: '3s' }}
                    />
                </div>

                <div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_15px_rgba(162,28,175,0.2)]">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-600 to-transparent w-full animate-shimmer"
                        style={{ backgroundSize: '200% 100%' }}
                    />
                </div>

                <p className="mt-5 text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">
                    Preparing your experience
                </p>
                <p className="mt-2 text-slate-700 font-bold text-[8px] uppercase tracking-[0.2em]">
                    Apex Play
                </p>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite linear;
                }
            `}</style>
        </div>
    );
};

export default Loading;