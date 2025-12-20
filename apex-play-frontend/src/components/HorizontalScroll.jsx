import React from 'react';
import { ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const HorizontalScroll = ({ title, icon: Icon, data, onCardClick, viewAllLink }) => {
    return (
        <div className="pl-6 md:pl-16 mb-8 group">
            <div className="flex items-center justify-between mb-5 pr-6 md:pr-16">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <Icon size={22} className="text-blue-500" />
                        </div>
                    )}
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="flex-none w-[160px] sm:w-[200px] md:w-[240px] mt-2"
                    >
                        <MovieCard
                            item={item}
                            onClick={onCardClick}
                        />
                    </div>
                ))}

                <div className="flex-none w-6 md:w-16" />
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default HorizontalScroll;