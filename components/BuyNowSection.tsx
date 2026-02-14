"use client";
import { motion } from "framer-motion";
import { ProfileArchetype } from "@/data/profiles";

export default function BuyNowSection({ profile }: { profile: ProfileArchetype }) {
    const { buyNowSection } = profile;

    return (
        <section className="w-full py-24 px-6 bg-[#0a0202]">
            <div className="max-w-lg mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-white/5 backdrop-blur-sm border border-rose-blood/30 p-8 rounded-lg shadow-2xl overflow-hidden"
                >
                    {/* Decorative shine */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-rose-blood blur-[100px] opacity-20" />

                    <div className="text-center mb-8">
                        <span className="text-rose-pink font-bold tracking-widest uppercase text-sm">
                            {buyNowSection.planName}
                        </span>
                        <div className="mt-4 flex items-baseline justify-center gap-1">
                            <span className="text-5xl font-cinzel text-white">{buyNowSection.price}</span>
                            <span className="text-gray-400">/mo</span>
                        </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                        {buyNowSection.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-200">
                                <span className="text-rose-blood">✔</span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button className="w-full py-4 bg-rose-blood hover:bg-red-700 text-white font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(211,47,47,0.4)] hover:shadow-[0_0_30px_rgba(211,47,47,0.6)]">
                        {buyNowSection.cta}
                    </button>

                    <p className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
                        {buyNowSection.returnPolicy}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
