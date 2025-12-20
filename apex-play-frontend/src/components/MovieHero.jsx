import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, Clock, Download } from 'lucide-react';

const MovieHero = ({ movie }) => {
    const navigate = useNavigate();
    if (!movie) return null;

    return (
        <div className="pt-24 md:pt-32 pb-12 flex justify-center w-full px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 max-w-7xl w-full">

                <div className="w-48 sm:w-56 md:w-80 shrink-0 aspect-[2/3] bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 relative group">
                    <img
                        src={movie.posterUrl}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={movie.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                </div>

                <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start pt-2">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
                        {movie.title}
                    </h1>

                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 mb-4">
                        <div className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-lg flex items-center gap-2 text-[11px] font-black tracking-tighter uppercase">
                            <Star size={14} className="fill-yellow-500" />
                            IMDb {movie.rating || 'N/A'}
                        </div>

                        <div className="flex items-center gap-2 uppercase text-slate-400 text-[12px] font-bold tracking-widest">
                            <Calendar size={18} className="text-blue-500" />
                            {movie.releaseYear}
                        </div>

                        <div className="flex items-center gap-2 uppercase text-slate-400 text-[12px] font-bold tracking-widest">
                            <Clock size={18} className="text-blue-500" />
                            {movie.duration} MIN
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                        {movie.categories?.map(cat => (
                            <span key={cat.categoryId} className="text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 bg-[#0a192f] text-blue-400 border border-blue-900/50 rounded-md">
                                {cat.category.name}
                            </span>
                        ))}
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-12 font-medium opacity-90 mx-auto md:mx-0">
                        {movie.description}
                    </p>

                    <button
                        onClick={() => navigate('/download', { state: { movie } })}
                        className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-blue-600 hover:text-white active:scale-95 shadow-xl group/btn"
                    >
                        <Download size={22} strokeWidth={3} />
                        <span className="text-sm tracking-widest uppercase">Download Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieHero;