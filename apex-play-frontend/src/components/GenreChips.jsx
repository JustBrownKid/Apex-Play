import React from 'react'
const genres = ["Action", "Comedy", "Horror", "Sci-Fi", "Anime", "Romance", "Drama"];

const GenreChips = () => {
    return (
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar px-6 md:px-16">
            {genres.map((genre) => (
                <button key={genre} className="px-6 py-2 bg-slate-900 hover:bg-blue-600 border border-slate-800 rounded-full text-sm font-medium transition-all whitespace-nowrap">
                    {genre}
                </button>
            ))}
        </div>
    )
}

export default GenreChips