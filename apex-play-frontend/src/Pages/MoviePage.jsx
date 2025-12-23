import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Film, X, SlidersHorizontal } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import ErrorPage from '../components/Error';
import UniversalFooter from '../components/Footer';

const MoviePage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL;
            const graphqlQuery = {
                query: `
                    query GetSeries {
                        movies {
                            id
                            posterUrl
                            rating
                            duration
                            title
                            categories {
                                category {
                                    name
                                }
                            }
                        }
                    }
                    `
            };
            const response = await fetch(`${apiUrl}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(graphqlQuery),
            });
            if (!response.ok) throw new Error('Failed to connect to movie database');
            const data = await response.json();
            setMovies(data.data.movies);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
        window.scrollTo(0, 0);
    }, []);

    const categories = ['All', ...new Set(movies.flatMap(m => m.categories?.map(c => c.category.name) || []))];

    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' ||
            movie.categories?.some(c => c.category.name === selectedCategory);
        return matchesSearch && matchesCategory;
    });

    if (loading) return <Loading />;
    if (error) return <ErrorPage message={error} onRetry={fetchMovies} />;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-blue-500/30">
            <header className="max-w-7xl mx-auto -mt-10 mb-10">
                <div className="flex flex-col gap-6">

                    <div className="flex flex-col md:flex-row items-center gap-4 bg-white/[0.02] border border-white/5 p-2 rounded-2xl md:rounded-full">

                        <div className="relative w-full md:w-72 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="SEARCH..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-full py-2.5 pl-10 pr-10 text-xs font-bold focus:outline-none focus:border-blue-500/50 transition-all uppercase tracking-widest placeholder:text-slate-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <div className="hidden md:block w-[1px] h-6 bg-white/10" />

                        <div className="w-full flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide px-2">
                            <SlidersHorizontal size={14} className="text-slate-600 shrink-0" />
                            <div className="flex items-center gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${selectedCategory === cat
                                            ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                                            : "bg-white/5 border-white/5 text-slate-500 hover:text-slate-200"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                {filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {filteredMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                item={movie}
                                onClick={(id) => navigate(`/movie/${id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-3xl">
                        <Search size={48} className="mx-auto text-slate-800 mb-4" />
                        <h3 className="text-slate-500 font-black uppercase tracking-widest">No Movies Found</h3>
                        <p className="text-slate-700 text-xs font-bold mt-2 uppercase">Adjust your filters or search terms</p>
                    </div>
                )}
            </main>
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>

    );
};

export default MoviePage;