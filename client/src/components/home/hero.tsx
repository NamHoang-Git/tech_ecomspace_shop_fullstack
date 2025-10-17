// @ts-nocheck

import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
// import Image from "next/image"
import LazyVideo from './lazy-video';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { valideURLConvert } from '../../utils/valideURLConvert';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Hero() {
    const loadingCategory = useSelector(
        (state) => state.product.loadingCategory
    );
    const categoryData = useSelector((state) => state.product.allCategory);
    const navigate = useNavigate();
    const containerRef = useRef();

    const handleRedirectProductListPage = (id, cat) => {
        const url = `/${valideURLConvert(cat)}-${id}`;
        navigate(url);
    };

    const buttonNew = (
        <Button
            asChild
            className="rounded-full bg-lime-400 px-6 text-black hover:bg-lime-300"
        >
            <a href="#">Khám phá ngay</a>
        </Button>
    );

    return (
        <section className="relative isolate overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center py-14 sm:py-20">
                    <div className="mb-5 flex items-center gap-2">
                        {/* <Image src="/icons/skitbit-white.svg" alt="Skitbit logo" width={32} height={32} className="h-8 w-8" /> */}
                        <p className="text-sm uppercase tracking-[0.25em] text-lime-300/80">
                            Tech EcomSpace
                        </p>
                    </div>
                    <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl uppercase grid gap-2">
                        <span className="block">Công nghệ</span>
                        <span className="block text-lime-300 drop-shadow-[0_0_20px_rgba(132,204,22,0.35)]">
                            đỉnh cao
                        </span>
                        <span className="block">giá trị vượt trội</span>
                    </h1>
                    <div className="mt-6">{buttonNew}</div>

                    {/* Categories with navigation */}
                    <div className="mt-10 relative w-full">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                            <button
                                onClick={() => {
                                    if (containerRef.current) {
                                        containerRef.current.scrollBy({
                                            left: -300,
                                            behavior: 'smooth',
                                        });
                                    }
                                }}
                                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                                aria-label="Previous categories"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <div
                            ref={containerRef}
                            className="flex overflow-x-auto scrollbar-hide space-x-4 py-2 px-2"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            {loadingCategory ? (
                                <div className="flex space-x-4">
                                    {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-64 w-64 flex-shrink-0 bg-gray-800 rounded-2xl animate-pulse"
                                            ></div>
                                        ))}
                                </div>
                            ) : (
                                <div className="flex space-x-4">
                                    {categoryData?.map((category, i) => {
                                        const gradients = [
                                            'from-[#0f172a] via-[#14532d] to-[#052e16]',
                                            'from-[#1e1b4b] via-[#1e40af] to-[#1e3a8a]',
                                            'from-[#431407] via-[#9a3412] to-[#7c2d12]',
                                            'from-[#1e1b4b] via-[#4338ca] to-[#312e81]',
                                            'from-[#4c0519] via-[#9f1239] to-[#831843]',
                                        ];

                                        return (
                                            <div
                                                key={category._id || i}
                                                className="flex-shrink-0 w-64 cursor-pointer"
                                                onClick={() =>
                                                    handleRedirectProductListPage(
                                                        category._id,
                                                        category.name
                                                    )
                                                }
                                            >
                                                <PhoneCard
                                                    title={category.name}
                                                    sub={
                                                        category.description ||
                                                        'Khám phá ngay'
                                                    }
                                                    tone="calm"
                                                    gradient={
                                                        gradients[
                                                            i % gradients.length
                                                        ]
                                                    }
                                                    videoSrc={category.video}
                                                    imageSrc={category.image}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                            <button
                                onClick={() => {
                                    if (containerRef.current) {
                                        containerRef.current.scrollBy({
                                            left: 300,
                                            behavior: 'smooth',
                                        });
                                    }
                                }}
                                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                                aria-label="Next categories"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PhoneCard({
    title = '8°',
    sub = 'Clear night. Great for render farm runs.',
    tone = 'calm',
    gradient = 'from-[#0f172a] via-[#14532d] to-[#052e16]',
    videoSrc,
    imageSrc,
}: {
    title?: string;
    sub?: string;
    tone?: string;
    gradient?: string;
    videoSrc?: string;
    imageSrc?: string;
}) {
    return (
        <div className="relative rounded-[28px] glass-border bg-neutral-900 p-2">
            <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ) : videoSrc ? (
                    <LazyVideo
                        src={videoSrc}
                        className="h-full w-full object-cover"
                        autoplay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <div
                        className={`h-full w-full bg-gradient-to-br ${gradient}`}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/60" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-sm text-white/80">{sub}</p>
            </div>
        </div>
    );
}