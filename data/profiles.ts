export interface ProfileArchetype {
    id: string;
    name: string;
    tagline: string;
    membershipPrice: string;
    shortDesc: string;
    folderPath: string; // Path to image sequence
    themeColor: string;
    gradient: string;
    traits: string[];
    stats: { label: string; val: string }[];
    // Scrollytelling Text Sections (Overlaid on the Rose animation)
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    // Specific Dating Sections
    bioSection: { title: string; description: string; imageAlt: string };
    freshnessSection: { title: string; description: string };
    deliveryPromise: { title: string; description: string };
    buyNowSection: {
        price: string;
        planName: string;
        features: string[];
        cta: string;
        returnPolicy: string;
    };
}

export const profiles: ProfileArchetype[] = [
    {
        id: "eternal-rose",
        name: "The Eternal Romantic",
        tagline: "Love that flows.",
        membershipPrice: "₹999/mo",
        shortDesc: "Passionate - Fluid - Deep",
        folderPath: "/images/rose-sequence", // User has the zip file for this
        themeColor: "#D32F2F",
        gradient: "linear-gradient(to bottom, #000000 0%, #1a0505 100%)",
        traits: ["Deep Empathy", "Fluid Connection", "Unfiltered Passion"],
        stats: [
            { label: "Passion", val: "100%" },
            { label: "Games", val: "0%" },
            { label: "Depth", val: "Max" },
        ],

        // These texts appear while scrolling over the spinning rose
        section1: {
            title: "Beauty in Motion.",
            subtitle: "Attraction shouldn't be static.",
        },
        section2: {
            title: "A Splash of Reality.",
            subtitle: "Dive into a pool of verified, genuine singles.",
        },
        section3: {
            title: "Fluid Conversations.",
            subtitle: "No rigid scripts. Just natural, flowing chemistry.",
        },
        section4: { title: "Bloom Together.", subtitle: "" },

        bioSection: {
            title: "The Rose Archetype",
            description:
                "For those who believe love is an art form. Like the petals of a rose, we reveal layers of compatibility slowly and beautifully. This tier is for serious partners looking for a connection that survives the storm.",
            imageAlt: "Rose Details",
        },
        freshnessSection: {
            title: "Organic Chemistry",
            description:
                "Just as a flower needs fresh water, relationships need presence. Our 'Active Bloom' algorithm ensures you only match with people active in the last 24 hours. No withered profiles.",
        },
        deliveryPromise: {
            title: "The Current of Love",
            description:
                "We don't leave you drifting. Our algorithm acts as a current, guiding you directly to matches that share your emotional wavelength. Swift, direct, and refreshing.",
        },
        buyNowSection: {
            price: "₹999",
            planName: "The Crimson Tier",
            features: [
                "Unlimited Likes",
                "Rose Gold Profile Badge",
                "Priority Flow",
            ],
            cta: "Let Love Bloom",
            returnPolicy:
                "The 'Thorn-Free' Guarantee: Safety is paramount. If a match feels prickly or unsafe, our instant-block and report shield protects your peace immediately.",
        },
    },
];
