"use client";
import { motion } from "framer-motion";
import { ProfileArchetype } from "@/data/profiles";

export default function DeliveryPromise({ profile }: { profile: ProfileArchetype }) {
    const { deliveryPromise } = profile;

    return (
        <section className="w-full py-24 px-6 bg-gradient-to-b from-black to-[#1a0505]">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-6 mx-auto w-16 h-1 bg-rose-blood" />
                    <h3 className="text-3xl md:text-4xl font-cinzel text-white mb-6">
                        {deliveryPromise.title}
                    </h3>
                    <p className="text-xl text-gray-300 font-lato">
                        {deliveryPromise.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
