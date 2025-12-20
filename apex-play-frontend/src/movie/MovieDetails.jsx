import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Info } from 'lucide-react';
import CastSection from '../components/CastSection';
import Loading from '../components/Loading';
import ErrorPage from '../components/Error';
import BackButton from '../components/BackButton';
import MovieHero from '../components/MovieHero';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/${id}`);
                if (!response.ok) throw new Error('Movie not found');
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetail();
    }, [id]);

    if (loading) return <Loading />;
    if (error || !movie) return <ErrorPage />;
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 relative overflow-x-hidden">
            <div className="fixed inset-0 z-0">
                <img
                    src={movie.backdropUrl || movie.posterUrl}
                    className="w-full h-full object-cover opacity-20 blur-md scale-110"
                    alt="background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950 to-slate-950" />
            </div>

            <div className="relative z-10">
                <BackButton />
                <div className="max-w-6xl mx-auto px-6 md:px-16">
                    <MovieHero movie={movie} />

                    <main className="space-y-20">
                        <div className="mb-6">
                            <CastSection casts={movie.casts} />
                        </div>

                        <div className="space-y-6 max-w-4xl">
                            <h2 className="text-xl font-bold uppercase tracking-[0.2em] flex items-center gap-3 text-blue-500">
                                <Info size={22} strokeWidth={2.5} /> Storyline
                            </h2>
                            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium opacity-90">
                                {movie.description}
                            </p>
                        </div>

                    </main>
                </div>
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default MovieDetails;