"use client";
import { motion } from "framer-motion";
import { ProfileArchetype } from "@/data/profiles";

export default function FreshnessSection({ profile }: { profile: ProfileArchetype }) {
    const { freshnessSection } = profile;

    return (
        <section className="relative w-full py-24 px-6 bg-void-black border-t border-rose-blood/10">
            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-2 md:order-1"
                >
                    <h3 className="text-3xl font-cinzel text-white mb-6 border-l-4 border-rose-blood pl-6">
                        {freshnessSection.title}
                    </h3>
                    <p className="text-gray-300 font-lato text-lg pl-6">
                        {freshnessSection.description}
                    </p>
                </motion.div>

                {/* Visual Side (Abstract Representation) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-1 md:order-2 flex justify-center"
                >
                    <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-rose-900 to-black p-1 animate-spin-slow shadow-[0_0_50px_rgba(211,47,47,0.2)]">
                        <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
                            <span className="text-4xl">💧</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
