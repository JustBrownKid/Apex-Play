import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroAdsSlider = () => {
    const adsData = [
        {
            id: 1,
            title: "Premium Streaming Experience",
            desc: "Watch your favorite movies and series in 4K Ultra HD quality anytime, anywhere.",
            image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop",
            tag: "Cinema Tech"
        },
        {
            id: 2,
            title: "Unlimited Entertainment",
            desc: "Explore thousands of titles from various genres. New content added every week.",
            image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
            tag: "Trending"
        },
        {
            id: 3,
            title: "Join Our Community",
            desc: "Stay updated with latest releases and exclusive sneak peeks on our social media.",
            image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop",
            tag: "Exclusive"
        },
        {
            id: 4,
            title: "Live Sports Action",
            desc: "Never miss a goal. Stream all major football leagues and sporting events live in crystal clear HD.",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000",
            tag: "Live Sports"
        },
        {
            id: 5,
            title: "Magical World for Kids",
            desc: "Safe, educational, and fun animation series for children of all ages. Curated with love.",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop",
            tag: "Kids & Family"
        },
        {
            id: 6,
            title: "The Anime Universe",
            desc: "Dive into the world of Japanese animation. From classic masterpieces to the latest seasonal hits.",
            image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1974&auto=format&fit=crop",
            tag: "Anime"
        },
        {
            id: 7,
            title: "Stay Informed 24/7",
            desc: "Breaking news and deep-dive documentaries from around the globe. Accurate. Immediate. Global.",
            image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop",
            tag: "News & Docs"
        },
        {
            id: 8,
            title: "Epic Movie Marathons",
            desc: "Get the popcorn ready. Binge-watch entire movie franchises from start to finish without interruptions.",
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
            tag: "Binge Watch"
        }
    ];

    return (
        <div className="w-full h-[50vh] md:h-[75vh] relative group overflow-hidden bg-slate-950">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect={'fade'}
                loop={true}
                speed={800}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{ clickable: true }}
                navigation={false}
                className="w-full h-full"
            >
                {adsData.map((ad) => (
                    <SwiperSlide key={ad.id}>
                        <div className="relative w-full h-full">
                            <img
                                src={ad.image}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                            <div className="absolute inset-0 bg-black/20" />

                            <div className="absolute bottom-0 left-0 p-8 md:p-20 w-full z-10">
                                <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block shadow-lg">
                                    {ad.tag}
                                </span>
                                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white leading-[0.9]">
                                    {ad.title}
                                </h2>
                                <p className="text-slate-200 text-sm md:text-lg max-w-2xl font-medium opacity-90 leading-relaxed">
                                    {ad.desc}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style>{`
                .swiper-pagination-bullet {
                    background: white !important;
                    opacity: 0.3;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                    background: #8F00FF !important;
                    width: 30px !important;
                    border-radius: 4px !important;
                    opacity: 1;
                }
                .swiper-pagination {
                    bottom: 30px !important;
                }
            `}</style>
        </div>
    );
};

export default HeroAdsSlider;