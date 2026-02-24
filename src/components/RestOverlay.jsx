import React, { useEffect, useState } from 'react';

export default function RestOverlay({ isVisible }) {
    // Gunakan state ini untuk mount/unmount agar CSS transition bisa berjalan mulus
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
        } else {
            // Tunggu animasi selesai baru di unmount (1000ms sesuai duration Tailwind)
            const timer = setTimeout(() => setShouldRender(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl transition-all duration-1000 pb-20
        ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
        >
            <div className="relative flex flex-col items-center max-w-5xl text-center px-12 py-20 rounded-[3rem] border border-white/10 bg-white/5 shadow-2xl overflow-hidden">

                {/* Glow Effects */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-teal-500/30 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]"></div>

                <div className="relative z-10">
                    <div className="mb-8 inline-flex items-center justify-center p-6 bg-teal-500/20 rounded-full animate-bounce">
                        {/* Ikon Jam/Waktu Istirahat (Teal) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h1 className="text-[6.5vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300 leading-tight mb-6 drop-shadow-lg">
                        Waktu Istirahat Pelayanan
                    </h1>

                    <p className="text-[2vw] text-gray-200 font-normal max-w-4xl leading-relaxed">
                        Petugas pendaftaran kami sedang beristirahat sejenak.
                        Pelayanan akan segera dilanjutkan kembali. <br />
                        <span className="text-teal-200 font-semibold mt-4 block">Terima kasih atas pengertian dan kesabaran Bapak/Ibu.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
