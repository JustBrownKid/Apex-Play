import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star, Film, Tv, Info, Sparkles, Flame, History } from 'lucide-react';
import Loading from '../components/Loading';
import HorizontalScroll from '../components/HorizontalScroll';

const Home = () => {
    const [heroMovie, setHeroMovie] = useState(null);
    const [movieCat1, setMovieCat1] = useState([]);
    const [movieCat2, setMovieCat2] = useState([]);
    const [seriesCat1, setSeriesCat1] = useState([]);
    const [seriesCat2, setSeriesCat2] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;

                const [allMoviesRes, mCat1Res, mCat2Res, sCat1Res, sCat2Res] = await Promise.all([
                    fetch(`${apiUrl}/movie`),
                    fetch(`${apiUrl}/movie/category/1`),
                    fetch(`${apiUrl}/movie/category/2`),
                    fetch(`${apiUrl}/series/category/1`),
                    fetch(`${apiUrl}/series/category/2`),
                ]);

                const allMovies = await allMoviesRes.json();
                const mCat1Data = await mCat1Res.json();
                const mCat2Data = await mCat2Res.json();
                const sCat1Data = await sCat1Res.json();
                const sCat2Data = await sCat2Res.json();

                if (allMovies.length > 0) setHeroMovie(allMovies[allMovies.length - 1]);

                setMovieCat1(Array.isArray(mCat1Data) ? [...mCat1Data].reverse() : []);
                setMovieCat2(Array.isArray(mCat2Data) ? [...mCat2Data].reverse() : []);
                setSeriesCat1(Array.isArray(sCat1Data) ? [...sCat1Data].reverse() : []);
                setSeriesCat2(Array.isArray(sCat2Data) ? [...sCat2Data].reverse() : []);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20 overflow-x-hidden font-sans">

            <div className="relative z-20 space-y-4">

                {movieCat1.length > 0 && (
                    <HorizontalScroll
                        title="New Releases"
                        icon={Sparkles}
                        data={movieCat1}
                        onCardClick={(id) => navigate(`/movie/${id}`)}
                        viewAllLink="/movies"
                    />
                )}

                {movieCat2.length > 0 && (
                    <HorizontalScroll
                        title="Top Action Hits"
                        icon={Flame}
                        data={movieCat2}
                        onCardClick={(id) => navigate(`/movie/${id}`)}
                        viewAllLink="/movies"
                    />
                )}

                {seriesCat1.length > 0 && (
                    <HorizontalScroll
                        title="Fresh Series"
                        icon={Tv}
                        data={seriesCat1}
                        onCardClick={(id) => navigate(`/series/${id}`)}
                        viewAllLink="/series"
                    />
                )}

                {seriesCat2.length > 0 && (
                    <HorizontalScroll
                        title="Must Watch Series"
                        icon={History}
                        data={seriesCat2}
                        onCardClick={(id) => navigate(`/series/${id}`)}
                        viewAllLink="/series"
                    />
                )}
            </div>
        </div>
    );
};

export default Home;