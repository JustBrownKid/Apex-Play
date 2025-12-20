import React from 'react';
import { Users } from 'lucide-react';
import CastCard from './CastCard';

const CastSection = ({ casts }) => {
    if (!casts || casts.length === 0) return null;

    const sortedCasts = [...casts].sort((a, b) => a.priority - b.priority);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3 text-white">
                <Users size={24} className="text-blue-500" /> Top Cast
            </h2>

            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
                {sortedCasts.map((item) => (
                    <CastCard key={item.castId} item={item} />
                ))}
            </div>
        </div>
    );
};


export default CastSection;