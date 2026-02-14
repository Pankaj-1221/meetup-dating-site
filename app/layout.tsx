import type { Metadata } from 'next';
import { Cinzel, Lato } from 'next/font/google';
import './globals.css';
import { clsx } from 'clsx';
import Navbar from '@/components/Navbar'; // <--- ADDED THIS IMPORT

const cinzel = Cinzel({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-cinzel',
    display: 'swap',
});

const lato = Lato({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    variable: '--font-lato',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Meetup | Love in Motion',
    description: 'A premium dating experience for those who believe love is an art form.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={clsx(
                cinzel.variable,
                lato.variable,
                // We keep the Blinkit Pink background here
                'bg-[#E00A5F] text-white font-lato antialiased selection:bg-rose-blood selection:text-white'
            )}>
                <Navbar />  {/* <--- ADDED THIS SO THE BUTTON COMES BACK */}
                {children}
            </body>
        </html>
    );
}