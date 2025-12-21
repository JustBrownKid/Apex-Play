import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import CastSection from '../components/CastSection';
import Loading from '../components/Loading';
import ErrorPage from '../components/Error';
import EpisodeSection from '../components/EpisodeSection';
import SeriesHero from '../components/SeriesHero';
import BackButton from '../components/BackButton';
import UniversalFooter from '../components/Footer';
import HorizontalScroll from '../components/HorizontalScroll';

const SeriesDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [series, setSeries] = useState(null);
    const [seriesCategory, setSeriesCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSeason, setActiveSeason] = useState(1);

    useEffect(() => {
        const fetchSeriesDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/series/${id}`);
                if (!response.ok) throw new Error('Series not found or server error');

                const data = await response.json();
                setSeries(data);

                if (data.episodes?.length > 0) {
                    const firstSeason = Math.min(...data.episodes.map(ep => ep.seasonNumber));
                    setActiveSeason(firstSeason);
                }
                if (data.categories && data.categories.length > 0) {
                    const firstCatId = data.categories[0].categoryId;

                    const catResponse = await fetch(`${import.meta.env.VITE_API_URL}/series/category/${firstCatId}`);
                    if (catResponse.ok) {
                        const catData = await catResponse.json();
                        const filteredData = catData.filter(m => m.id !== parseInt(id));
                        setSeriesCategory(filteredData);
                    }
                }
                setError(null);
            } catch (error) {
                console.error("Error fetching series:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSeriesDetail();
    }, [id]);

    const handleDownloadRedirect = (episode) => {
        navigate('/download', {
            state: {
                movie: {
                    title: `${series.title} - S${episode.seasonNumber} E${episode.episodeNumber}: ${episode.title}`,
                    quality: "HD",
                    size: "Variable",
                    downloadUrl: episode.videoUrl,
                    posterUrl: series.posterUrl
                }
            }
        });
    };

    if (loading) return <Loading />;
    if (error || !series) return <ErrorPage />;

    const seasons = [...new Set(series?.episodes?.map(ep => ep.seasonNumber))].sort((a, b) => a - b);
    const filteredEpisodes = series?.episodes?.filter(ep => ep.seasonNumber === activeSeason);

    return (
        <>
            <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 relative overflow-x-hidden">
                <div className="fixed inset-0 z-0">
                    <img
                        src={series.backdropUrl || series.posterUrl}
                        className="w-full h-full object-cover opacity-20 blur-md scale-110"
                        alt="background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950 to-slate-950" />
                </div>

                <div className="relative z-10">
                    <BackButton />
                    <div className="max-w-6xl mx-auto px-6 md:px-16">
                        <SeriesHero series={series} />
                        <div className="mb-4">
                            <CastSection casts={series.casts} />
                        </div>
                        <EpisodeSection
                            seasons={seasons}
                            activeSeason={activeSeason}
                            setActiveSeason={setActiveSeason}
                            filteredEpisodes={filteredEpisodes}
                            onDownload={handleDownloadRedirect}
                        />
                    </div>
                    {seriesCategory && seriesCategory.length > 0 && (
                        <div className="pt-10">
                            <HorizontalScroll
                                title="You May Like"
                                icon={Sparkles}
                                data={seriesCategory}
                                onCardClick={(seriesId) => navigate(`/series/${seriesId}`)}
                                viewAllLink="/movies"
                            />
                        </div>
                    )}
                </div>
                <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            </div>
            <div className="relative z-10 bg-slate-950/80 backdrop-blur-sm border-t border-slate-800">
                <UniversalFooter />
            </div>
        </>
    );
};

export default SeriesDetails;