const CastCard = ({ item }) => {
    if (!item?.cast) return null;
    return (
        <div className="flex-none w-32 sm:w-40 group snap-start cursor-pointer">
            {/* Image Container */}
            <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-500 shadow-lg bg-slate-900">
                <img
                    src={item.cast.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    alt={item.cast.name}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            </div>
            <div className="px-1 text-center sm:text-left">
                <p className="text-sm font-black text-white group-hover:text-blue-400 transition-colors line-clamp-1 uppercase tracking-tight">
                    {item.cast.name}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1.5 opacity-80">
                    {item.role || "Actor"}
                </p>
            </div>
        </div>
    );
};

export default CastCard;