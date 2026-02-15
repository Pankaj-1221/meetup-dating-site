"use client";

import ProfileVisScroll from "@/components/ProfileVisScroll";
import { profiles } from "@/data/profiles";
import { useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
    const currentProfile = profiles[0];

    // --- CONFIGURATION ---
    const REVEAL_DELAY_MS = 4000;
    const TARGET_REVIEW_TEXT = "( chal B4 -402 review deta hun)";

    // --- STATE MANAGEMENT ---
    const [showCrushExplosion, setShowCrushExplosion] = useState(false);
    const [showKisses, setShowKisses] = useState(false);

    // Heart Reveal State
    const [revealStep, setRevealStep] = useState(0);
    const [isRevealing, setIsRevealing] = useState(false);
    const [isHeartBroken, setIsHeartBroken] = useState(false);

    // Chemistry & Interaction State
    const [chemistryResult, setChemistryResult] = useState<'idle' | 'yes' | 'no'>('idle');
    const [isVerifying, setIsVerifying] = useState(false);
    const [proposalMessage, setProposalMessage] = useState("");

    // Runaway No Button State
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

    // Review Section State
    const [starRating, setStarRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    // --- NEW PRANK & BUTTON STATE ---
    const [isPrankActive, setIsPrankActive] = useState(false);
    const [prankStep, setPrankStep] = useState(0);
    // Store click coordinates for local heart explosions
    const [clickExplosions, setClickExplosions] = useState<{ id: number, x: number, y: number }[]>([]);

    // --- AUDIO ENGINE ---
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = (filename: string, volume = 1.0) => {
        if (typeof window !== "undefined") {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            const newAudio = new Audio(`/sounds/${filename}.mp3`);
            newAudio.volume = volume;
            audioRef.current = newAudio;
            newAudio.play().catch((e) => console.log("Audio play prevented", e));
        }
    };

    const playSfx = (filename: string, volume = 0.5) => {
        const audio = new Audio(`/sounds/${filename}.mp3`);
        audio.volume = volume;
        audio.play().catch(() => { });
    };

    // --- INTERACTION HANDLERS ---

    // 1. TOP RIGHT BUTTON (PRANK TRIGGER)
    const handleTopRightJoin = () => {
        playAudio('joinnow', 1.0); // PLAY JOINNOW.MP3
        setIsPrankActive(true);

        // Sequence: 3 Second Delays
        setTimeout(() => setPrankStep(1), 3000); // IP
        setTimeout(() => setPrankStep(2), 6000); // Location
        setTimeout(() => setPrankStep(3), 9000); // Emails
        setTimeout(() => setPrankStep(4), 12000); // Final Popup
    };

    // 2. PREMIUM BUTTONS (HEARTS + SOUND SELECTION)
    const handlePremiumClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        // Audio Logic
        if (index === 2) {
            playSfx('ching', 1.0); // 3rd Option
        } else {
            playSfx('select', 1.0); // 1st & 2nd Option
        }

        // Heart Explosion Visual
        const newExplosion = { id: Date.now(), x: e.clientX, y: e.clientY };
        setClickExplosions(prev => [...prev, newExplosion]);
        setTimeout(() => {
            setClickExplosions(prev => prev.filter(ex => ex.id !== newExplosion.id));
        }, 1000);
    };

    const triggerCrushExplosion = () => {
        if (showCrushExplosion) return;
        playAudio('crush', 0.8);
        setShowCrushExplosion(true);
        setTimeout(() => setShowCrushExplosion(false), 8000);
    };

    const handleHeartBoxClick = () => {
        if (isHeartBroken) return;
        playAudio('break', 1.0);
        setIsHeartBroken(true);
        setTimeout(() => { setIsHeartBroken(false); }, 3000);
    };

    const handleChemistryChoice = (choice: 'yes' | 'no') => {
        if (choice === 'no') return;
        setChemistryResult(choice);
        if (choice === 'yes') {
            playAudio('YES', 1.0);
            setShowKisses(true);
            setTimeout(() => setShowKisses(false), 6000);
        }
    };

    const handleNoBtnHover = () => {
        const x = (Math.random() - 0.5) * 300;
        const y = (Math.random() - 0.5) * 300;
        setNoBtnPos({ x, y });
        playSfx('pop', 0.5);
    };

    const handleContactClick = () => {
        playSfx('contact', 1.0);
    };

    const handleDoubtClick = () => {
        playAudio('gadbad', 1.0);
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            alert("Verification Failed: Dil too masoom hai! 🤖");
        }, 5000);
    };

    const handleProposalClick = () => {
        playSfx('proposal', 1.0);
        setProposalMessage("Your proposal will be accepted within 3-4 business years 📉");
        setTimeout(() => setProposalMessage(""), 5000);
    };

    const handleStarClick = () => {
        if (starRating === 5) return;
        playSfx('pop', 0.8);
        setStarRating(5);
    };

    const handleReviewType = () => {
        if (reviewText.length > 0) return;
        playAudio('type', 1.0);
        setReviewText(TARGET_REVIEW_TEXT);
    };

    const handleRevealGirls = () => {
        if (isRevealing || revealStep === 5) return;
        setIsRevealing(true);
        setRevealStep(1);
        playAudio('reveal', 0.8);
        setTimeout(() => {
            setRevealStep(5);
            playSfx('ching', 1.0);
            setIsRevealing(false);
        }, REVEAL_DELAY_MS);
    };

    // --- ASSETS ---
    const myPhotos = ["/my-photos/1.jpg", "/my-photos/2.jpg", "/my-photos/3.jpg", "/my-photos/4.jpg", "/my-photos/5.jpg"];
    const societyGirls = ["/girls/1.jpg", "/girls/2.jpg", "/girls/3.jpg"];
    const bioStats = [{ label: "Looks", value: 70 }, { label: "Skills", value: 90 }, { label: "Maturity", value: 30 }, { label: "Sincerity", value: 95 }, { label: "Earning", value: 5 }];

    // UPDATED PREMIUM OFFERS
    const membershipPlans = [
        { title: "Option A", text: "Whatsapp chat", price: "Free", color: "bg-green-50 border-green-200" },
        { title: "Option B", text: "Only coffee with me [t*c apply]", price: "Bill Split", color: "bg-orange-50 border-orange-200" },
        { title: "Option C", text: "Itna pyar se bol rehe ho to dono hi le leti hun", price: "Sold!", color: "bg-pink-50 border-pink-200" },
    ];

    const heartVariants = ['💖', '✨', '🌸', '💘', '💝'];
    const kissVariants = ['💋', '👄', '😽', '💋', '❤️'];

    return (
        <main className={`relative w-full bg-transparent ${isPrankActive ? 'h-screen overflow-hidden animate-shake-once' : ''}`}>

            {/* GLOBAL STYLES & ANIMATIONS */}
            <style jsx global>{`
        @keyframes floatUpOptimized {
          0% { transform: translate3d(0, 0, 0) scale(0.5); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate3d(0, -100vh, 0) scale(1.2); opacity: 0; }
        }
        .animate-float-heart { animation: floatUpOptimized 8s linear forwards; will-change: transform, opacity; }
        @keyframes kissPop {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1.5) rotate(-10deg); opacity: 1; }
            100% { transform: scale(1) rotate(10deg); opacity: 0; }
        }
        .animate-kiss { animation: kissPop 2s ease-out forwards; }
        .break-left { transform: translateX(-60px) rotate(-20deg); opacity: 0; }
        .break-right { transform: translateX(60px) rotate(20deg); opacity: 0; }
        .zoom-reveal { animation: zoomOutEffect 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes zoomOutEffect { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 2s linear infinite; }
        .text-gradient { background-clip: text; -webkit-background-clip: text; color: transparent; background-image: linear-gradient(to right, #E00A5F, #FDE047); }
        @keyframes wobble {
            0% { transform: translateX(0%); }
            15% { transform: translateX(-5%) rotate(-5deg); }
            30% { transform: translateX(4%) rotate(3deg); }
            45% { transform: translateX(-3%) rotate(-3deg); }
            60% { transform: translateX(2%) rotate(2deg); }
            75% { transform: translateX(-1%) rotate(-1deg); }
            100% { transform: translateX(0%); }
        }
        .hover-wobble:hover { animation: wobble 0.5s ease-in-out; }
        
        /* Shake Once Animation - Little Shake */
        @keyframes shakeOnce {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake-once { animation: shakeOnce 0.6s cubic-bezier(.36,.07,.19,.97) both; }

        /* Local Button Explosion */
        @keyframes burstOut {
            0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
            100% { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1.5); opacity: 0; }
        }
        .animate-burst { animation: burstOut 0.8s ease-out forwards; }
        
        /* Terminal Cursor */
        .cursor-blink::after { content: '_'; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

            {/* --- TOP RIGHT GOLDEN BUTTON --- */}
            {!isPrankActive && (
                <button
                    onClick={handleTopRightJoin}
                    className="fixed top-6 right-6 z-[80] bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 text-white font-black uppercase tracking-widest px-8 py-3 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.8)] border-2 border-white/80 animate-pulse hover:scale-110 transition-transform duration-300 ring-4 ring-yellow-400/30"
                >
                    Join Now
                </button>
            )}

            {/* --- CLICK EXPLOSIONS (PREMIUM BUTTON EFFECT) --- */}
            {clickExplosions.map((exp) => (
                <div key={exp.id} className="fixed pointer-events-none z-[70]" style={{ left: exp.x, top: exp.y }}>
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-2xl animate-burst"
                            style={{
                                '--tw-translate-x': `${(Math.random() - 0.5) * 150}px`,
                                '--tw-translate-y': `${(Math.random() - 0.5) * 150}px`
                            } as React.CSSProperties}
                        >
                            {heartVariants[i % heartVariants.length]}
                        </div>
                    ))}
                </div>
            ))}

            {/* --- PRANK HACKING OVERLAY --- */}
            {isPrankActive && (
                <div className="fixed inset-0 z-[9999] bg-black text-[#00ff00] font-mono flex flex-col p-8 overflow-hidden">
                    {/* Terminal Header */}
                    <div className="border-b border-green-800 pb-2 mb-8 flex justify-between uppercase text-xs tracking-widest opacity-50">
                        <span>Secure Connection: ESTABLISHED</span>
                        <span>System: LINUX_KERNEL_V4</span>
                    </div>

                    <div className="max-w-4xl mx-auto w-full space-y-8">

                        {/* WARNING HEADER */}
                        <div className="border-l-4 border-red-600 pl-6 py-2 bg-red-900/10">
                            <h1 className="text-4xl md:text-6xl font-bold text-red-500 uppercase tracking-tighter mb-2">⚠️ WARNING DETECTED ⚠️</h1>
                            <h2 className="text-xl md:text-2xl text-white uppercase tracking-widest">
                                Target is attempting to date a <span className="text-yellow-500 font-bold">Bajrang Dal Member</span>
                            </h2>
                        </div>

                        {/* FAKE HACKING STEPS (3s Delay Each) */}
                        <div className="space-y-6 mt-12 text-lg md:text-2xl">

                            {prankStep >= 1 && (
                                <div className="flex items-center gap-4 animate-fade-in-up">
                                    <span className="text-yellow-400">[SYSTEM]</span>
                                    <span className="cursor-blink">Tracking User IP Address...</span>
                                    <span className="ml-auto font-bold text-red-400">192.168.1.{Math.floor(Math.random() * 255)} :: SUCCESS</span>
                                </div>
                            )}

                            {prankStep >= 2 && (
                                <div className="flex items-center gap-4 animate-fade-in-up">
                                    <span className="text-yellow-400">[GEO]</span>
                                    <span className="cursor-blink">Triangulating GPS Location...</span>
                                    <span className="ml-auto text-xs border border-green-500 px-2 py-1 text-green-500">LOCKED ON</span>
                                </div>
                            )}

                            {prankStep >= 3 && (
                                <div className="flex items-center gap-4 animate-fade-in-up">
                                    <span className="text-yellow-400">[DATA]</span>
                                    <span className="cursor-blink">Mirroring Email & Gallery...</span>
                                    <div className="w-32 h-2 bg-gray-800 rounded overflow-hidden">
                                        <div className="h-full bg-green-500 animate-[pulse_0.5s_ease-in-out_infinite] w-full"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FINAL POPUP */}
                        {prankStep >= 4 && (
                            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] text-white p-10 rounded-none border-4 border-red-600 shadow-[0_0_100px_rgba(255,0,0,0.5)] text-center w-full max-w-2xl z-50 animate-bounce">
                                <div className="text-8xl mb-6">🕉️</div>
                                <h3 className="text-4xl font-black uppercase mb-4 text-orange-500">Dispatch Initiated</h3>
                                <p className="text-2xl font-bold font-sans">Bajrang Dal unit will reach your location within 5 mins.</p>
                                <p className="text-sm text-gray-500 mt-6 font-mono">Do not attempt to leave the premises.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- STANDARD OVERLAYS (Only if Prank inactive) --- */}
            {isVerifying && !isPrankActive && (
                <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-4">
                    <div className="max-w-md w-full border border-gray-200 rounded-lg p-8 shadow-2xl bg-gray-50 text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Checking if the site connection is secure</h2>
                        <div className="flex items-center justify-center gap-3 bg-white border border-gray-300 px-4 py-3 rounded text-sm text-gray-600">
                            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Verifying you are not a robot...</span>
                        </div>
                    </div>
                </div>
            )}

            {showCrushExplosion && !isPrankActive && (
                <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className="absolute animate-float-heart" style={{ left: `${Math.random() * 100}vw`, top: `${100 + Math.random() * 20}vh`, animationDelay: `${Math.random() * 5}s`, fontSize: `${1 + Math.random() * 2}rem` }}>
                            {heartVariants[Math.floor(Math.random() * heartVariants.length)]}
                        </div>
                    ))}
                </div>
            )}

            {showKisses && !isPrankActive && (
                <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
                    {Array.from({ length: 60 }).map((_, i) => (
                        <div key={i} className="absolute animate-kiss" style={{
                            left: `${Math.random() * 100}vw`,
                            top: `${Math.random() * 100}vh`,
                            animationDelay: `${Math.random() * 1}s`,
                            fontSize: `${3 + Math.random() * 4}rem`,
                            filter: 'drop-shadow(0 5px 15px rgba(224,10,95,0.3))'
                        }}>
                            {kissVariants[Math.floor(Math.random() * kissVariants.length)]}
                        </div>
                    ))}
                </div>
            )}

            {/* FIXED BACKGROUND */}
            <div className="fixed inset-0 z-0 flex items-start justify-center pointer-events-none">
                <div className="relative w-full aspect-video bg-black rounded-b-[3rem] md:rounded-b-[5rem] border-b-[3px] md:border-b-4 border-gray-700 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] overflow-hidden">
                    <div className="w-full h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover">
                        <ProfileVisScroll profile={currentProfile} />
                    </div>
                </div>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="relative z-10 flex flex-col items-center">

                {/* HERO TITLES */}
                <section className="h-screen flex flex-col items-center justify-center pt-20 pointer-events-none px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white text-center font-cinzel drop-shadow-2xl mix-blend-overlay leading-tight">
                        To whom you are <br /> giving this <span className="text-[#FDE047] drop-shadow-[0_0_30px_rgba(253,224,71,0.9)]">rose?</span>
                    </h1>
                </section>

                <section className="h-screen flex flex-col items-center justify-center pointer-events-none">
                    <h2 className="text-7xl md:text-9xl font-bold text-white/90 text-center font-cinzel drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] animate-pulse">Is it me?</h2>
                </section>

                <section className="h-[20vh] pointer-events-none" />

                {/* --- MAIN CARD FLOOR --- */}
                <div className="w-full bg-[#E00A5F] rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] pb-20 mt-10 overflow-hidden">
                    <div className="max-w-6xl mx-auto py-16 space-y-24">

                        {/* 1. PROFILE & BIO */}
                        <div className="space-y-16">
                            {/* A. My Photos */}
                            <div className="space-y-10">
                                <div className="flex justify-center">
                                    <div className="p-[3px] rounded-full bg-gradient-to-r from-[#FDE047] via-[#FDE047] to-[#E00A5F] shadow-[0_0_25px_rgba(253,224,71,0.4)]">
                                        <div className="bg-[#a60042]/60 backdrop-blur-md px-10 py-3 rounded-full flex items-center justify-center">
                                            <span className="text-white font-cinzel font-bold text-xl tracking-[0.25em] uppercase drop-shadow-sm">My Profile</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full overflow-hidden relative group py-4">
                                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#E00A5F] via-[#E00A5F]/80 to-transparent z-10" />
                                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#E00A5F] via-[#E00A5F]/80 to-transparent z-10" />
                                    <div className="flex gap-8 animate-infinite-scroll pl-6">
                                        {[...myPhotos, ...myPhotos].map((src, index) => (
                                            <div key={index} className="relative w-64 h-80 flex-shrink-0 rounded-[2.5rem] overflow-hidden shadow-[0_0_0_4px_rgba(255,255,255,0.15),_0_0_20px_rgba(253,224,71,0.2),_0_15px_30px_rgba(0,0,0,0.3)] transform transition-all hover:scale-105 duration-500">
                                                <Image src={src} alt={`Profile ${index}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* B. Stats */}
                            <div className="w-full max-w-4xl mx-auto px-6">
                                <div className="bg-white/95 backdrop-blur-sm rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden border border-white/50">

                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDE047] rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E00A5F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                                    <div className="flex items-center gap-6 mb-10 pb-6 border-b-2 border-dashed border-gray-100">
                                        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-4xl shadow-inner animate-bounce">🧐</div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-gray-800 font-cinzel">Reality Check</h3>
                                            <p className="text-gray-400 font-sans">Hover bars to test accuracy</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        {bioStats.map((stat, idx) => (
                                            <div key={idx} className="group cursor-pointer hover-wobble">
                                                <div className="flex justify-between items-end mb-3 px-2">
                                                    <span className="font-bold text-gray-700 text-xl tracking-wide">{stat.label}</span>
                                                    <span className="font-mono font-bold text-xl text-gray-300 group-hover:text-[#E00A5F] transition-colors duration-200">
                                                        <span className="group-hover:hidden">?</span>
                                                        <span className="hidden group-hover:inline">{stat.value}%</span>
                                                    </span>
                                                </div>
                                                <div className="h-8 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner relative ring-2 ring-transparent group-hover:ring-pink-200 transition-all">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-[#FDE047] via-orange-400 to-[#E00A5F] shadow-[0_2px_15px_rgba(224,10,95,0.4)] transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] w-[10%] group-hover:w-[var(--target-width)]"
                                                        style={{ '--target-width': `${stat.value}%` } as React.CSSProperties}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* C. MY STORY SECTION */}
                            <div className="space-y-6 w-full px-2 md:px-6">

                                <div className="flex flex-col items-center gap-6">
                                    <div className="p-[3px] rounded-full bg-gradient-to-r from-[#FDE047] via-[#FDE047] to-[#E00A5F] shadow-[0_0_25px_rgba(253,224,71,0.4)]">
                                        <div className="bg-[#a60042]/60 backdrop-blur-md px-10 py-3 rounded-full flex items-center justify-center">
                                            <span className="text-white font-cinzel font-bold text-xl tracking-[0.25em] uppercase drop-shadow-sm">My Story</span>
                                        </div>
                                    </div>

                                    {/* --- ENHANCED NOTE SECTION --- */}
                                    <div className="w-full max-w-2xl text-center transform hover:scale-105 transition-transform duration-300">
                                        <div className="bg-yellow-300 border-4 border-red-600 shadow-[0_10px_0_rgba(220,38,38,1)] rounded-xl px-6 py-4 animate-[pulse_3s_infinite]">
                                            <p className="text-2xl md:text-3xl font-black text-red-600 uppercase tracking-widest drop-shadow-sm">
                                                ⚠️ INTERACTIVE MODE ⚠️
                                            </p>
                                            <p className="text-red-800 font-bold mt-1 text-lg">
                                                Hover over hidden words to reveal magic!
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-16 w-1 bg-gradient-to-b from-[#FDE047] to-white/20 rounded-full"></div>
                                </div>

                                {/* Story Card */}
                                <div className="w-full">
                                    <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-20 shadow-2xl border border-white/40 relative min-h-[400px] flex flex-col items-center">
                                        <div className="mt-8 text-center w-full max-w-4xl mx-auto space-y-12">

                                            <p className="text-3xl md:text-4xl text-gray-700 font-cinzel leading-relaxed">
                                                &quot;Before I entered this college, I think I was a{' '}
                                                <span className="relative inline-block cursor-pointer text-[#E00A5F] font-bold hover:scale-110 transition-transform duration-200" onMouseEnter={() => playAudio('kid', 0.6)}>kid</span>.&quot;
                                            </p>
                                            <p className="text-3xl md:text-4xl text-gray-600 font-cinzel leading-relaxed">
                                                &quot;I did not talk to girls and <span className="italic text-gray-400">here is no girls</span> to talk.&quot;
                                            </p>
                                            <p className="text-3xl md:text-4xl text-gray-700 font-cinzel leading-relaxed">
                                                &quot;Oh, I just forgot to tell you about <span className="text-[#E00A5F] font-bold">society girls</span>.&quot;
                                            </p>

                                            {/* Photos Interaction */}
                                            <div className="flex flex-col items-center gap-8 pt-8 pb-8 border-b-4 border-gray-200 w-full">
                                                <p className="text-2xl md:text-3xl text-gray-800 font-cinzel font-bold">
                                                    &quot;Here are some of the most beautiful girls...&quot;
                                                </p>

                                                <div className="relative flex flex-col items-center w-full max-w-2xl mt-4">
                                                    <button
                                                        onClick={handleRevealGirls}
                                                        disabled={isRevealing || revealStep === 5}
                                                        className={`relative z-20 px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm transition-all duration-300 ${isRevealing ? 'bg-gray-800 text-white animate-pulse cursor-wait' : (revealStep === 5 ? 'bg-gray-200 text-gray-400 cursor-default' : 'bg-gradient-to-r from-[#FDE047] to-[#E00A5F] text-white shadow-xl hover:shadow-2xl hover:scale-105 cursor-pointer')}`}
                                                    >
                                                        {isRevealing ? 'Wait for it... 🫣' : (revealStep === 5 ? 'Revealed!' : 'Reveal Photos')}
                                                    </button>

                                                    {revealStep > 0 && (
                                                        <div className="mt-12 w-full min-h-[160px] flex items-center justify-center">
                                                            {revealStep < 5 ? (
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <div className="w-12 h-12 border-4 border-[#E00A5F] border-t-transparent rounded-full animate-spin"></div>
                                                                    <p className="text-[#E00A5F] font-bold animate-bounce">Accessing Archives...</p>
                                                                </div>
                                                            ) : (
                                                                <div className="flex justify-center gap-4 md:gap-8 animate-zoom-in">
                                                                    {societyGirls.map((img, index) => (
                                                                        <div key={index} className="relative w-28 h-28 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg transition-all duration-500 hover:scale-110 hover:z-10 hover:rotate-3">
                                                                            <Image src={img} alt="Girl" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" onError={(e) => { const target = e.target as HTMLImageElement; target.src = "https://placehold.co/400x400/E00A5F/white?text=Img+Err"; }} />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-3xl md:text-4xl text-gray-700 font-cinzel leading-relaxed pt-4">
                                                &quot;I know these are beautiful, so once I decided to talk to one of them but suddenly senior{' '}
                                                <span className="inline-block cursor-help text-red-600 font-bold underline decoration-red-300 hover:animate-shake hover:text-red-700 transition-colors" onMouseEnter={() => playAudio('senior', 0.8)}>calls</span>.&quot;
                                            </p>

                                            <div className="pt-4">
                                                <p className="text-3xl md:text-4xl text-gray-700 font-cinzel leading-relaxed flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
                                                    <span>&quot;Then I found instagram (in love its insta) my second&quot;</span>
                                                    <span onClick={triggerCrushExplosion} className="relative cursor-pointer inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-[#FDE047] text-white font-bold tracking-wider uppercase shadow-[0_4px_15px_rgba(236,72,153,0.4)] border-2 border-white/50 hover:scale-110 hover:-rotate-2 hover:shadow-[0_0_30px_rgba(253,224,71,0.6)] active:scale-95 transition-all duration-300 ease-out group">
                                                        <span>Crush</span><span className="text-xl group-hover:animate-bounce">💖</span>
                                                    </span>
                                                </p>
                                            </div>

                                            <p className="text-3xl md:text-4xl text-gray-700 font-cinzel leading-relaxed animate-fade-in-up">&quot;After some months I spend hours with insta we have a <span className="text-[#E00A5F] font-bold">great bonding</span>.&quot;</p>
                                            <p className="text-3xl md:text-4xl text-gray-600 font-cinzel leading-relaxed">&quot;I keep watching her.&quot;</p>
                                            <p className="text-3xl md:text-4xl text-gray-700 font-cinzel leading-relaxed italic border-l-[6px] border-[#FDE047] pl-8 py-4 bg-yellow-50/50 rounded-r-2xl shadow-sm">&quot;Oh can&#39;t scroll without me, this is genuine problem every girl face.&quot;</p>

                                            {/* HEART LOCKET */}
                                            <div className="py-20 flex justify-center w-full min-h-[300px]">
                                                <div className="relative w-64 h-64 flex items-center justify-center cursor-pointer" onClick={handleHeartBoxClick}>
                                                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${isHeartBroken ? 'zoom-reveal' : 'opacity-0 scale-0'}`}>
                                                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#FDE047] shadow-[0_0_50px_rgba(253,224,71,0.8)] bg-white z-10">
                                                            <Image src="/girls/3.jpg" alt="Reveal" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                                                        </div>
                                                    </div>
                                                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(224,10,95,0.6)] overflow-visible">
                                                        <defs>
                                                            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                                <stop offset="0%" stopColor="#ef4444" /><stop offset="50%" stopColor="#E00A5F" /><stop offset="100%" stopColor="#db2777" />
                                                            </linearGradient>
                                                        </defs>
                                                        <path d="M50 85 C10 60, -10 35, 10 15 A18 18 0 0 1 50 25 Z" fill="url(#heartGrad)" stroke="white" strokeWidth="1" className={`origin-center transition-all duration-1000 ease-in-out ${isHeartBroken ? 'break-left' : ''}`} />
                                                        <path d="M50 85 C90 60, 110 35, 90 15 A18 18 0 0 0 50 25 Z" fill="url(#heartGrad)" stroke="white" strokeWidth="1" className={`origin-center transition-all duration-1000 ease-in-out ${isHeartBroken ? 'break-right' : ''}`} />
                                                    </svg>
                                                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none transition-opacity duration-500 ${isHeartBroken ? 'opacity-0' : 'opacity-100'}`}>
                                                        <p className="text-white font-cinzel font-bold text-lg leading-tight drop-shadow-md px-6 animate-pulse">Click to see <br /> inside your heart</p>
                                                        <div className="mt-2 text-2xl animate-bounce">👇</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* --- CHEMISTRY CHECK SECTION --- */}
                                            <div className="w-full border-t border-gray-200 pt-16 mt-10">
                                                <div className="flex flex-col items-center space-y-10 animate-fade-in">

                                                    <div className="bg-gradient-to-r from-pink-50 to-yellow-50 px-8 py-4 rounded-full border border-pink-100 shadow-sm">
                                                        <p className="text-xl text-[#E00A5F] font-cinzel font-medium text-center">
                                                            &quot;Oh you look interested in me, lets find if our chemistry works&quot;
                                                        </p>
                                                    </div>

                                                    <h3 className="text-3xl md:text-5xl text-gray-800 font-cinzel font-bold text-center leading-tight drop-shadow-sm">
                                                        &quot;Do you believe in <br /> <span className="text-[#E00A5F]">love at first sight?</span>&quot;
                                                    </h3>

                                                    {/* Choice Buttons */}
                                                    {chemistryResult === 'idle' && (
                                                        <div className="flex flex-col sm:flex-row gap-6 mt-6 relative h-24 sm:h-auto w-full justify-center items-center">
                                                            <button
                                                                onClick={() => handleChemistryChoice('yes')}
                                                                className="z-10 px-12 py-5 rounded-2xl bg-gradient-to-tr from-[#E00A5F] to-[#f94c8e] text-white font-cinzel font-bold text-2xl shadow-[0_10px_30px_rgba(224,10,95,0.4)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(224,10,95,0.6)] transition-all duration-300"
                                                            >
                                                                YES! 💘
                                                            </button>

                                                            {/* RUNAWAY BUTTON */}
                                                            <div
                                                                className="absolute sm:relative transition-all duration-100 ease-out"
                                                                style={{ transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)` }}
                                                                onMouseEnter={handleNoBtnHover}
                                                                onClick={handleNoBtnHover}
                                                            >
                                                                <button
                                                                    className="px-12 py-5 rounded-2xl bg-white text-gray-500 font-cinzel font-bold text-xl border-2 border-gray-200 shadow-md whitespace-nowrap"
                                                                >
                                                                    No...
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Results & Actions */}
                                                    {chemistryResult !== 'idle' && (
                                                        <div className="flex flex-col items-center space-y-12 animate-zoom-in w-full">

                                                            <div className="text-center py-6">
                                                                <h4 className={`text-6xl md:text-8xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r drop-shadow-sm animate-scale-in ${chemistryResult === 'yes' ? 'from-[#E00A5F] to-[#FDE047]' : 'from-gray-400 to-gray-600'}`}>
                                                                    {chemistryResult === 'yes' ? "100% MATCH" : "99% MATCH"}
                                                                </h4>
                                                                <p className="text-xl md:text-2xl text-gray-700 font-medium font-cinzel">
                                                                    {chemistryResult === 'yes' ? "We are made for each other! 💍" : "We may add 1% bio... 😉"}
                                                                </p>
                                                            </div>

                                                            {/* Final Buttons */}
                                                            <div className="flex flex-col gap-6 w-full max-w-md">
                                                                <button
                                                                    onClick={handleContactClick}
                                                                    className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg uppercase tracking-wider shadow-lg hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
                                                                >
                                                                    <span>📞 Contact me immediately</span>
                                                                </button>

                                                                {/* DOUBT BUTTON */}
                                                                <button
                                                                    onClick={handleDoubtClick}
                                                                    className="w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wider shadow-lg bg-gray-900 text-white hover:bg-black hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                                                                >
                                                                    🤔 I have still doubt in you
                                                                </button>
                                                            </div>

                                                            <div className="pt-6 w-full flex flex-col items-center">
                                                                <div className="relative">
                                                                    {proposalMessage && (
                                                                        <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-red-100 text-red-600 px-4 py-3 rounded-xl border border-red-200 text-sm font-bold text-center shadow-lg animate-bounce z-50">
                                                                            {proposalMessage}
                                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-red-200"></div>
                                                                        </div>
                                                                    )}
                                                                    <button
                                                                        onClick={handleProposalClick}
                                                                        className="group relative px-10 py-4 bg-gradient-to-r from-pink-400 to-[#E00A5F] rounded-full text-white font-cinzel font-bold shadow-lg hover:shadow-[0_0_20px_rgba(224,10,95,0.5)] transition-all overflow-hidden border-2 border-white/30"
                                                                    >
                                                                        <span className="relative z-10 flex items-center gap-2 text-lg">
                                                                            💌 Relationship Proposal Box
                                                                        </span>
                                                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                            {/* --- END CHEMISTRY SECTION --- */}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* D. MEMBERSHIP OFFERS */}
                            <div className="w-full max-w-4xl mx-auto px-6 pt-10">
                                <div className="flex flex-col items-center gap-4 mb-10">
                                    <div className="p-[2px] rounded-full bg-gradient-to-r from-[#FDE047] to-[#E00A5F]">
                                        <div className="bg-white/90 backdrop-blur px-8 py-2 rounded-full">
                                            <h3 className="text-xl font-bold font-cinzel text-gray-800 uppercase tracking-widest">Premium Offers</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {membershipPlans.map((plan, idx) => (
                                        <div
                                            key={idx}
                                            className={`relative rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden group ${plan.color} bg-white flex flex-col justify-between`}
                                        >
                                            <div>
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                    <span className="text-6xl">💎</span>
                                                </div>
                                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{plan.title}</h4>
                                                <p className="text-lg md:text-xl font-bold font-cinzel text-gray-800 mb-4 leading-snug">{plan.text}</p>
                                                <p className="text-2xl font-black text-[#E00A5F] mb-4">{plan.price}</p>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-200/50">
                                                <button
                                                    onClick={(e) => handlePremiumClick(e, idx)}
                                                    className="w-full py-3 rounded-lg bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-[#E00A5F] active:scale-95 transition-all shadow-md"
                                                >
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* E. REVIEW SECTION */}
                            <div className="w-full max-w-2xl mx-auto px-6 pb-20">
                                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl relative overflow-hidden">
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold font-cinzel text-gray-800">Rate Your Experience</h3>
                                        <p className="text-gray-400 text-sm mt-1">We value your honest feedback (kind of)</p>
                                    </div>

                                    {/* 1. Rigged Star Rating */}
                                    <div className="flex justify-center gap-2 mb-8">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={handleStarClick}
                                                className={`text-5xl transition-all duration-300 transform hover:scale-125 focus:outline-none ${starRating >= star ? 'text-[#FDE047] drop-shadow-[0_0_10px_rgba(253,224,71,0.6)] scale-110' : 'text-gray-200 hover:text-yellow-200'}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>

                                    {/* 2. Instant-Review Box */}
                                    <div className="relative">
                                        <textarea
                                            className="w-full h-32 rounded-xl bg-gray-50 border border-gray-200 p-4 font-sans text-gray-700 focus:ring-2 focus:ring-[#E00A5F] focus:border-transparent outline-none resize-none transition-all shadow-inner"
                                            placeholder="Type your review here..."
                                            value={reviewText}
                                            onClick={handleReviewType}
                                            readOnly={true}
                                        />
                                        <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                                            {reviewText.length} / {TARGET_REVIEW_TEXT.length} chars
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}