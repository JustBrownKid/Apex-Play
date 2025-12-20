import React from 'react';
import { PlayCircle, Download } from 'lucide-react';

const EpisodeSection = ({ seasons, activeSeason, setActiveSeason, filteredEpisodes, onDownload }) => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3 text-white">
                    <PlayCircle className="text-blue-500" /> Episodes List
                </h2>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {seasons.map((num) => (
                        <button
                            key={num}
                            onClick={() => setActiveSeason(num)}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border shrink-0 ${activeSeason === num
                                ? " border-white-500 text-white"
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                }`}
                        >
                            Season {num}
                        </button>
                    ))}
                </div>
            </div>

            {filteredEpisodes?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredEpisodes.map((ep) => (
                        <div
                            key={ep.id}
                            className="group bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-4 flex items-center gap-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-800 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                                <span className="text-xl font-black text-white  -600 group-hover:text-black transition-colors">
                                    {ep.episodeNumber}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-300 truncate group-hover:text-white transition-colors">
                                    {ep.title || `Episode ${ep.episodeNumber}`}
                                </h4>
                            </div>
                            <button
                                onClick={() => onDownload(ep)}
                                className="p-3 bg-white text-black hover:bg-slate-200 rounded-xl transition-all active:scale-90 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                            >
                                <Download size={18} strokeWidth={3} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                        No episodes found for this season.
                    </p>
                </div>
            )}
        </div>
    );
};

export default EpisodeSection;