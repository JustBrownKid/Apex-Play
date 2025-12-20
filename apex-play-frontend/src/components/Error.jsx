import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw, ChevronLeft } from 'lucide-react';

const ErrorPage = ({ message = "We couldn't load the content you're looking for.", onRetry }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
            <div className="max-w-md">
                <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
                    <div className="relative bg-red-500/10 border border-red-500/20 p-6 rounded-3xl">
                        <AlertTriangle size={48} className="text-red-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                    Something went wrong
                </h1>

                <p className="text-slate-400 font-medium leading-relaxed mb-10">
                    {message}
                </p>

                <div className="flex flex-col gap-3">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-600/20 uppercase tracking-widest text-xs"
                        >
                            <RefreshCw size={18} /> Try Again
                        </button>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl border border-white/10 flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-[10px]"
                        >
                            <ChevronLeft size={16} /> Go Back
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl border border-white/10 flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-[10px]"
                        >
                            <Home size={16} /> Home
                        </button>
                    </div>
                </div>

                <p className="mt-12 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    Error Code: 0x554_APEX
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;