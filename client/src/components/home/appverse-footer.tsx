'use client';

import { useEffect, useState } from 'react';
// import Link from "next/link"
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import LazyVideo from './lazy-video';
import { Link } from 'react-router-dom';
// import Image from "next/image"

interface FooterContent {
    tagline: string;
    copyright: string;
}

const defaultContent: FooterContent = {
    tagline:
        'Experience 3D animation like never before. We craft cinematic visuals for brands and products.',
    copyright: '© 2025 — Skitbit International Uk',
};

export function AppverseFooter() {
    const [content, setContent] = useState<FooterContent>(defaultContent);

    useEffect(() => {
        // Load content from localStorage
        const savedContent = localStorage.getItem('skitbit-content');
        if (savedContent) {
            try {
                const parsed = JSON.parse(savedContent);
                if (parsed.footer) {
                    setContent(parsed.footer);
                }
            } catch (error) {
                console.error('Error parsing saved content:', error);
            }
        }
    }, []);

    return (
        <section className="text-white">
            {/* Contact CTA */}
            {/* <div className="container mx-auto px-4 pt-12 sm:pt-16">
                <div className="flex justify-center">
                    <Button
                        asChild
                        className="rounded-full bg-lime-400 px-6 py-2 text-sm font-medium text-black shadow-[0_0_20px_rgba(163,230,53,0.35)] hover:bg-lime-300"
                    >
                        <a
                            href="https://wa.link/rc25na"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contact us
                        </a>
                    </Button>
                </div>
            </div> */}

            {/* Download the app */}
            <div className="container mx-auto px-4 py-8 sm:py-10">
                <Card className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10">
                    <div className="relative grid items-center gap-8 md:grid-cols-2">
                        {/* Left copy */}
                        <div>
                            <p className="mb-2 text-[11px] tracking-widest text-lime-300">
                                STREAMLINE YOUR LAUNCHES
                            </p>
                            <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                                Preview &amp; approve high-end 3D visuals from
                                anywhere
                            </h3>
                            <p className="mt-2 max-w-prose text-sm text-neutral-400">
                                Review renders, leave timestamped comments, and
                                approve scenes from anywhere. Using our revision
                                &amp; collaboration tools
                            </p>
                        </div>

                        {/* Right mockup */}
                        <div className="mx-auto w-full max-w-[320px]">
                            <div className="relative rounded-[28px] liquid-glass p-2 shadow-2xl">
                                <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
                                    {/* Lazy-loaded video fills the screen */}
                                    <LazyVideo
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%202-YFaCK7cEiHWSMRv8XEHaLCoYj2SUAi.mp4"
                                        className="absolute inset-0 h-full w-full object-cover"
                                        autoplay={true}
                                        loop={true}
                                        muted={true}
                                        playsInline={true}
                                        aria-label="Skitbit app preview - approvals made easy"
                                    />
                                    {/* On-screen content */}
                                    <div className="relative p-3">
                                        <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
                                        <div className="space-y-1 px-1">
                                            <div className="text-5xl font-extrabold text-lime-300">
                                                Approvals Made Easy
                                            </div>
                                            <p className="text-xs text-white/80">
                                                From feedback to approval in a
                                                single flow
                                            </p>
                                            <div className="mt-3 inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-lime-300">
                                                Zero Hassle
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}
