import React, { useState, useEffect } from "react";
import { Download, ChevronLeft, ShieldCheck, Check, Timer } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const ResponsiveDownloadStrip = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const movie = location.state?.movie || {
        title: "Movie Title",
        quality: "HD",
        size: "0.0 GB",
        downloadUrl: "#"
    };

    const [timeLeft, setTimeLeft] = useState(15);
    const [isReady, setIsReady] = useState(false);
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsReady(true);
        }
    }, [timeLeft]);

    const handleDownload = () => {
        setStatus("loading");
        setTimeout(() => {
            try {
                const link = document.createElement("a");
                link.href = movie.downloadUrl || "#";
                link.setAttribute("download", `${movie.title}.mp4`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setStatus("success");
                setTimeout(() => setStatus("idle"), 150000);
            } catch (error) {
                setStatus("idle");
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 md:p-6">
            <div className="w-full max-w-[650px] bg-zinc-900/90 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center gap-5 shadow-2xl relative overflow-hidden">

                {!isReady && (
                    <div className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-1000 ease-linear"
                        style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
                    />
                )}

                <div className="flex items-center w-full gap-4 md:contents">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all active:scale-90"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex-1 min-w-0">
                        <h1 className="text-base md:text-lg font-black truncate uppercase tracking-tight leading-tight text-white">
                            {movie.title}
                        </h1>
                        <div className="flex items-center gap-2 md:gap-3 mt-1">
                            <span className="text-[10px] md:text-xs font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                                {movie.quality || "4K ULTRA HD"}
                            </span>
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                            <span className="text-xs text-slate-400 font-bold">
                                {movie.size || "2.4 GB"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 px-3 md:px-4 border-l border-white/10 hidden sm:flex">
                        <ShieldCheck size={18} className="text-emerald-500" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                            Secure
                        </span>
                    </div>
                </div>

                <div className="w-full md:w-auto">
                    {!isReady ? (
                        <div className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-slate-400 w-full md:min-w-[200px]">
                            <Timer size={20} className="animate-pulse" />
                            <span className="text-sm font-black uppercase tracking-widest">
                                Wait {timeLeft}s
                            </span>
                        </div>
                    ) : (
                        <button
                            onClick={handleDownload}
                            disabled={status !== "idle"}
                            className={`flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-[0.15em] transition-all shadow-2xl w-full md:min-w-[200px] justify-center ${status === "success"
                                ? "bg-emerald-600 text-white"
                                : status === "loading"
                                    ? "bg-zinc-800 text-slate-500 cursor-wait"
                                    : "bg-white text-black hover:bg-blue-600 hover:text-white active:scale-95 animate-in fade-in zoom-in duration-300"
                                }`}
                        >
                            {status === "loading" ? (
                                <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                            ) : status === "success" ? (
                                <Check size={20} strokeWidth={3} />
                            ) : (
                                <Download size={20} strokeWidth={3} />
                            )}

                            <span>
                                {status === "idle" ? "Download Now" : status === "loading" ? "Syncing" : "Success"}
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResponsiveDownloadStrip;