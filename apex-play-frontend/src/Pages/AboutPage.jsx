import React from 'react';
import { Shield, Zap, HardDrive, Cpu, Globe, Download, Unlock } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto pt pb-20 px-6">

                <header className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
                        Apex <span className="text-blue-500">Project</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-xl leading-relaxed font-medium">
                        အရည်အသွေးအကောင်းဆုံး ရုပ်ရှင်များကို စုဆောင်းသိမ်းဆည်းထားသော  <br></br>Digital Archive။
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="md:col-span-1 bg-blue-600/10 border border-blue-500/20 p-8 rounded-3xl group transition-all">
                        <div className="flex items-center gap-3 mb-4 text-blue-400">
                            <Unlock size={22} />
                            <h2 className="text-sm font-black uppercase tracking-widest">Free Access</h2>
                        </div>
                        <h3 className="text-2xl font-black mb-2 uppercase ">အခမဲ့ ကြည့်ရှုနိုင်ခြင်း</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            မည်သည့် အခကြေးငွေမှ ပေးဆောင်ရန်မလိုဘဲ ရုပ်ရှင်နှင့် ဇာတ်လမ်းတွဲများကို အခမဲ့ လေ့လာကြည့်ရှုနိုင်ပါသည်။
                        </p>
                    </div>

                    <div className="md:col-span-1 bg-white/[0.03] border border-white/10 p-8 rounded-3xl group transition-all">
                        <div className="flex items-center gap-3 mb-4 text-blue-500">
                            <Download size={22} />
                            <h2 className="text-sm font-black uppercase tracking-widest">Download</h2>
                        </div>
                        <h3 className="text-2xl font-black mb-2 uppercase ">ဒေါင်းလုဒ် ရယူနိုင်ခြင်း</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            မိမိနှစ်သက်ရာ ဇာတ်ကားများကို High-Quality အတိုင်း Offline ကြည့်ရှုရန် တိုက်ရိုက်ဒေါင်းလုဒ် ရယူနိုင်ပါသည်။
                        </p>
                    </div>

                    <div className="md:col-span-2 bg-white/[0.03] border border-white/10 p-8 rounded-3xl">
                        <div className="flex items-center gap-3 mb-4 text-blue-500">
                            <Shield size={22} />
                            <h2 className="text-sm font-black uppercase tracking-widest">Our Philosophy</h2>
                        </div>
                        <p className="text-slate-400 leading-relaxed ">
                            "Quality is our priority" - Streaming များတွင် ကြုံတွေ့ရလေ့ရှိသော Quality လျော့နည်းမှုများကို ကျော်လွှားပြီး အကောင်းဆုံး Cinema Experience ကို ပေးစွမ်းရန် ရည်ရွယ်ပါသည်။
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;