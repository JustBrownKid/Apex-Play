import React from 'react';
import { Mail, Github, MessageCircle, ArrowUpRight, Shield, User } from 'lucide-react';

const ContactPage = () => {
    const socialLinks = [
        {
            name: "Telegram",
            label: "Social // Connect",
            value: "@brownsley",
            icon: <MessageCircle size={20} />,
            link: "https://t.me/brownsley",
            color: "group-hover:text-sky-400"
        },
        {
            name: "GitHub",
            label: "Projects // Code",
            value: "justbrownkid",
            icon: <Github size={20} />,
            link: "https://github.com/justbrownkid",
            color: "group-hover:text-white"
        },
        {
            name: "Email",
            label: "Official // Mail",
            value: "phyoewaiheim@gmail.com",
            icon: <Mail size={20} />,
            link: "mailto:phyoewaiheim@gmail.com",
            color: "group-hover:text-blue-400"
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 pb-12 px-6 overflow-hidden relative">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-[1px] w-8 bg-blue-500" />
                        <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-blue-500 underline decoration-blue-500/30 underline-offset-8">
                            Personal Inquiries // 07
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase">
                        Let's <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400 italic">Collaborate.</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                    <div className="md:col-span-7 bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between group hover:bg-white/[0.05] transition-all duration-500">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 mb-4">
                                <User size={24} />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Phyo Wai Heim ( Brownsley )</h2>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-4">
                                Developer and Media Curator based in Myanmar. Focusing on high-fidelity digital archiving and modern web experiences.
                            </p>
                            <p className="text-blue-500/80 text-xs font-medium bg-blue-500/5 py-2 px-4 rounded-full inline-block border border-blue-500/10">
                                Open for technical discussions
                            </p>
                        </div>
                        <div className="mt-1 flex items-center gap-4">
                            <span className="h-[1px] flex-1 bg-white/10"></span>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 italic">Available for Projects</span>
                        </div>
                    </div>

                    <div className="md:col-span-5 flex flex-col gap-4">
                        {socialLinks.map((item, i) => (
                            <a
                                href={item.link}
                                key={i}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-white/20"
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-5">
                                        <div className="text-slate-500 group-hover:text-blue-500 transition-colors duration-500">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600 mb-0.5">
                                                {item.label}
                                            </p>
                                            <h3 className={`text-lg font-bold transition-colors duration-300 ${item.color}`}>
                                                {item.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="text-slate-700 group-hover:text-white group-hover:rotate-45 transition-all duration-500">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/[0.02] group-hover:to-indigo-600/[0.02] transition-all" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;