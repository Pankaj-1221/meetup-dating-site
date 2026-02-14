export default function Footer() {
    return (
        <footer className="w-full py-12 border-t bg-black border-white/5">
            <div className="container px-6 mx-auto">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-2">
                        <span className="text-rose-blood">🌹</span>
                        <span className="text-lg font-bold tracking-widest text-white font-cinzel">MEETUP</span>
                    </div>

                    <div className="flex gap-8 text-sm text-gray-400">
                        <a href="#" className="hover:text-rose-pink transition-colors">Safety</a>
                        <a href="#" className="hover:text-rose-pink transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-rose-pink transition-colors">Contact Us</a>
                    </div>

                    <div className="text-xs text-gray-600">
                        &copy; {new Date().getFullYear()} Meetup Premium. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
