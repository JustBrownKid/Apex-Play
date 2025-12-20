import React from 'react';
import { Star } from 'lucide-react';

const MovieCard = ({ item, onClick }) => {
    return (
        <div
            className="group relative bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-white/5 cursor-pointer aspect-[2/3] w-full transition-all duration-500 hover:scale-[1.03] hover:border-blue-500/50"
            onClick={() => onClick(item.id)}
        >
            <img
                src={item.posterUrl || item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[1px]"
                loading="lazy"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster'; }}
            />

            {item.rating && (
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black border border-white/10 flex items-center gap-1 z-10">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" /> {item.rating}
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <h3 className="text-md font-black text-white uppercase tracking-wider leading-tight line-clamp-2">
                        {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-[13px] font-bold text-blue-400 uppercase tracking-widest">
                            {item.releaseYear || 'Movie'}
                        </span>
                        <div className="w-1 h-1 bg-slate-500 rounded-full" />
                        <span className="text-[13px] font-bold text-slate-300 uppercase tracking-widest">
                            {item.duration ? `${item.duration}m` : 'HD'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;