"use client";

import { useTransform, motion, MotionValue } from "framer-motion";
import { ProfileArchetype } from "@/data/profiles";

interface ProfileTextOverlaysProps {
    profile: ProfileArchetype;
    scrollYProgress: MotionValue<number>;
}

export default function ProfileTextOverlays({ profile, scrollYProgress }: ProfileTextOverlaysProps) {
    // Define time ranges for each section (0 to 1 is the full scroll)
    // We divide the scroll into 4 sections roughly.

    return (
        <>
            <OverlaySection
                title={profile.section1.title}
                subtitle={profile.section1.subtitle}
                progress={scrollYProgress}
                range={[0.05, 0.20, 0.25, 0.30]}
            />
            <OverlaySection
                title={profile.section2.title}
                subtitle={profile.section2.subtitle}
                progress={scrollYProgress}
                range={[0.30, 0.45, 0.50, 0.55]}
            />
            <OverlaySection
                title={profile.section3.title}
                subtitle={profile.section3.subtitle}
                progress={scrollYProgress}
                range={[0.55, 0.70, 0.75, 0.80]}
            />
            <OverlaySection
                title={profile.section4.title}
                subtitle={profile.section4.subtitle}
                progress={scrollYProgress}
                range={[0.80, 0.90, 0.95, 1.0]}
            />
        </>
    );
}

function OverlaySection({
    title,
    subtitle,
    progress,
    range,
}: {
    title: string;
    subtitle: string;
    progress: MotionValue<number>;
    range: [number, number, number, number];
}) {
    const opacity = useTransform(progress, range, [0, 1, 1, 0]);
    const y = useTransform(progress, range, [50, 0, 0, -50]);
    const scale = useTransform(progress, range, [0.95, 1, 1, 1.05]);

    return (
        <motion.div
            style={{ opacity, y, scale }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4 text-center"
        >
            <h2 className="text-5xl md:text-7xl font-bold font-cinzel text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-4 tracking-wide">
                {title}
            </h2>
            <p className="text-xl md:text-3xl font-lato text-rose-pink/90 font-light drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                {subtitle}
            </p>
        </motion.div>
    );
}
