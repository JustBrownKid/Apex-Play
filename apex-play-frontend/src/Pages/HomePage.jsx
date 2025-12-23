import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tv, Sparkles, Flame, History } from 'lucide-react';
import Loading from '../components/Loading';
import HorizontalScroll from '../components/HorizontalScroll';
import HeroAdsSlider from '../components/HeroAdsSlider';
import FeatureBanner from '../components/FeatureBanner';

const Home = () => {
    const [data, setData] = useState({
        movieCat1: [],
        movieCat2: [],
        seriesCat1: [],
        seriesCat2: []
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const graphqlQuery = {
                query: `
                    query HomeData {
                        newMovies: moviesByCategory(categoryId: 1) { id title posterUrl rating duration }
                        actionMovies: moviesByCategory(categoryId: 2) { id title posterUrl rating duration }
                        freshSeries: seriesByCategory(categoryId: 1) { id title posterUrl rating }
                        mustWatchSeries: seriesByCategory(categoryId: 2) { id title posterUrl rating }
                    }
                `
            };

            const response = await fetch(`${apiUrl}/graphql`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(graphqlQuery),
            });

            const result = await response.json();
            const { newMovies, actionMovies, freshSeries, mustWatchSeries } = result.data;

            setData({
                movieCat1: newMovies || [],
                movieCat2: actionMovies || [],
                seriesCat1: freshSeries || [],
                seriesCat2: mustWatchSeries || []
            });

        } catch (error) {
            console.error("GraphQL Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20 overflow-x-hidden font-sans">
            <HeroAdsSlider />

            <div className="relative z-20 space-y-4">
                {data.movieCat1.length > 0 && (
                    <HorizontalScroll
                        title="New Releases"
                        icon={Sparkles}
                        data={data.movieCat1}
                        onCardClick={(id) => navigate(`/movie/${id}`)}
                        viewAllLink="/movies"
                    />
                )}

                {!token && <FeatureBanner />}

                {data.movieCat2.length > 0 && (
                    <HorizontalScroll
                        title="Top Action Hits"
                        icon={Flame}
                        data={data.movieCat2}
                        onCardClick={(id) => navigate(`/movie/${id}`)}
                        viewAllLink="/movies"
                    />
                )}

                {data.seriesCat1.length > 0 && (
                    <HorizontalScroll
                        title="Fresh Series"
                        icon={Tv}
                        data={data.seriesCat1}
                        onCardClick={(id) => navigate(`/series/${id}`)}
                        viewAllLink="/series"
                    />
                )}

                {data.seriesCat2.length > 0 && (
                    <HorizontalScroll
                        title="Must Watch Series"
                        icon={History}
                        data={data.seriesCat2}
                        onCardClick={(id) => navigate(`/series/${id}`)}
                        viewAllLink="/series"
                    />
                )}
            </div>
        </div>
    );
};

export default Home;