"use client";
import { motion } from "framer-motion";
import { ProfileArchetype } from "@/data/profiles";

export default function BioSection({ profile }: { profile: ProfileArchetype }) {
    const { bioSection } = profile;

    return (
        <section className="relative w-full py-24 px-6 md:py-32 bg-void-black text-center overflow-hidden">
            {/* Background radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#330000_0%,_#000000_100%)] opacity-30" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-sm font-bold tracking-[0.2em] text-rose-blood uppercase mb-4 block">
                        The Archetype
                    </span>
                    <h2 className="text-4xl md:text-5xl font-cinzel text-white mb-8 drop-shadow-lg">
                        {bioSection.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 font-lato leading-relaxed">
                        {bioSection.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
