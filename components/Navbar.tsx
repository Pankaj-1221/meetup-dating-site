"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // --- GLOBAL AUDIO FUNCTION ---
    // This uses 'window' so it can stop sounds playing from the other file
    const playJoinSound = () => {
        if (typeof window !== "undefined") {
            // 1. Stop ANY audio playing globally (even from the other page)
            const globalAudio = (window as any).globalAudioPlayer;
            if (globalAudio) {
                globalAudio.pause();
                globalAudio.currentTime = 0;
            }

            // 2. Play new sound and save it globally
            const newAudio = new Audio("/sounds/joinnow.mp3");
            (window as any).globalAudioPlayer = newAudio;
            newAudio.play().catch((e) => console.log("Audio play failed", e));
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none ${scrolled ? "bg-black/50 backdrop-blur-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* LOGO */}
                <Link href="/" className="pointer-events-auto flex items-center space-x-2 group">
                    <span className="text-2xl">🌹</span>
                    <span className="text-xl font-bold text-white tracking-widest font-cinzel group-hover:text-[#E00A5F] transition-colors">
                        MEETUP
                    </span>
                </Link>

                {/* CENTER LINKS */}
                <div className="pointer-events-auto hidden md:flex items-center space-x-8">
                    {["Stories", "Membership", "Safety"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="text-white/80 hover:text-[#FDE047] transition-colors text-sm uppercase tracking-wider font-medium"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* GOLDEN JOIN BUTTON WITH SHINE */}
                <button
                    onClick={playJoinSound}
                    className="pointer-events-auto group relative overflow-hidden bg-[#FDE047] text-[#3f2e18] font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(253,224,71,0.6)] hover:scale-105 transition-transform duration-300 active:scale-95"
                >
                    <span className="relative z-10">JOIN NOW</span>

                    {/* Shining Layer Slide */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                </button>

            </div>
        </nav>
    );
}