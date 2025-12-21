import React from 'react';
import { Globe, Shield, Activity } from 'lucide-react';
import Logo from '../assets/Apex-Banner-W.png'

const UniversalFooter = () => {
    return (
        <footer className="w-full mt-24 border-t border-white/5 bg-[#020617] pt-12 pb-8">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="">
                        <div className="w-40 h-15 items-center justify-center  group">
                            <img
                                src={Logo}
                                alt="Apex"
                                className="w-full h-full object-contain p-3 brightness-110 group-hover:brightness-125 transition-all"
                            />
                        </div>
                        <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-wider font-bold">
                            Preserving Cinema. <br />
                            High-Bitrate Digital Archive for the Local Collector.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 mb-2">Navigation // 03</span>
                        <a href="/" className="text-slate-400 hover:text-blue-500 text-xs transition-colors w-fit uppercase font-bold tracking-widest">Index</a>
                        <a href="/about" className="text-slate-400 hover:text-blue-500 text-xs transition-colors w-fit uppercase font-bold tracking-widest">Philosophy</a>
                        <a href="/contact" className="text-slate-400 hover:text-blue-500 text-xs transition-colors w-fit uppercase font-bold tracking-widest">Get In Touch</a>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 text-white opacity-60 text-[9px] font-black uppercase tracking-[0.3em]">
                        <span>© 2025 Apex Myanmar</span>
                        <span className="hidden md:block h-3 w-[1px] bg-white/20"></span>
                        <a href="https://apex-play.brownsley.online" className="hover:text-blue-400 transition-colors">
                            apex-play.online
                        </a>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default UniversalFooter;