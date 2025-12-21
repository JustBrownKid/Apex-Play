import React from 'react';
import { UserCircle, ShieldCheck, HardDriveDownload, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureBanner = () => {
    const navigate = useNavigate();

    return (
        <div className="mx-6 md:mx-16 my-10 p-8 md:p-10 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden shadow-xl">

            {/* Subtle Glow - အရမ်းမလင်းအောင် လျှော့ထားပါတယ် */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px]"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">

                <div className="text-center md:text-left">
                    {/* Compact Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <HardDriveDownload size={14} /> High-Speed Servers
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
                        Direct Downloads. <br />
                        <span className="text-blue-500">Login to Access.</span>
                    </h2>

                    <p className="text-slate-400 max-w-md text-sm md:text-base mb-6 leading-relaxed">
                        ဖိုင်များကို တိုက်ရိုက်ရယူနိုင်ရန် Member ဝင်ပေးရန် လိုအပ်ပါသည်။ <br />
                        Safe, Secure & Always Fast.
                    </p>

                    {/* Small Status Indicators */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
                            <ShieldCheck size={16} className="text-blue-500" />
                            <span className="text-white text-xs font-semibold">Virus Free</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
                            <Lock size={16} className="text-indigo-500" />
                            <span className="text-white text-xs font-semibold">Members Only</span>
                        </div>
                    </div>
                </div>

                {/* Compact Action Button */}
                <div className="w-full md:w-auto min-w-[240px]">
                    <button
                        onClick={() => navigate('/auth')}
                        className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-sm font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95 shadow-lg"
                    >
                        <UserCircle size={20} />
                        SIGN IN TO DOWNLOAD
                    </button>
                    <p className="text-center text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-4 opacity-60">
                        Join Our Community
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeatureBanner;