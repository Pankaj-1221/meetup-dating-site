"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ProfileArchetype } from "@/data/profiles";

// 1. Removed ProfileTextOverlays import so old text doesn't load

interface ProfileVisScrollProps {
    profile: ProfileArchetype;
}

export default function ProfileVisScroll({ profile }: ProfileVisScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // We map the scroll of this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll 0..1 to image frames 1..200
    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 200]);

    // Preload Images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imageCount = 200;

            // Load logic
            for (let i = 1; i <= imageCount; i++) {
                const img = new Image();
                img.src = `/images/rose-sequence/${i}.webp`;
                loadedImages.push(img);
            }

            await Promise.all(loadedImages.map(img => new Promise(resolve => {
                if (img.complete) resolve(true);
                else {
                    img.onload = () => resolve(true);
                    img.onerror = () => resolve(true);
                }
            })));

            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, [profile.folderPath]);

    // Draw Function
    const render = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const frameIndex = Math.min(
            images.length - 1,
            Math.max(0, Math.floor(index) - 1)
        );
        const img = images[frameIndex];

        if (img && img.complete && img.naturalHeight !== 0) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;

            // Contain logic
            const ratio = Math.min(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                centerShift_x,
                centerShift_y,
                img.width * ratio,
                img.height * ratio
            );
        }
    };

    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (isLoaded) {
            requestAnimationFrame(() => render(latest));
        }
    });

    // Render first frame on load
    useEffect(() => {
        if (isLoaded) render(1);
    }, [isLoaded]);

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-void-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* The Source of Truth: The Rose Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-contain z-0"
                />

                {/* 2. REMOVED: <ProfileTextOverlays ... /> 
            This ensures "Beauty in Motion" etc. is gone. 
            The new text ("To whom you are giving...") is handled by page.tsx 
        */}

                {/* Loading Spinner */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-rose-blood border-t-transparent rounded-full animate-spin"></div>
                            <div className="text-white font-cinzel tracking-widest">LOADING EXPERIENCE</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}