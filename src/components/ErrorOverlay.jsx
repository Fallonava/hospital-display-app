import React, { useEffect, useState } from 'react';

export default function ErrorOverlay({ isVisible, message, isOffline }) {
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!shouldRender) return null;

    const defaultMessage = isOffline
        ? "KONEKSI INTERNET/JARINGAN TERPUTUS. SEDANG MENCOBA MENGHUBUNGKAN KEMBALI..."
        : "MOHON MAAF, SEDANG TERJADI GANGGUAN SISTEM/SERVER. LAYANAN AKAN SEGERA DILANJUTKAN.";

    return (
        <div
            // Menggunakan z-index tinggi, tapi tepat di bawah Emergency (9999)
            className={`fixed inset-0 z-[9000] flex items-center justify-center bg-amber-950/95 backdrop-blur-xl transition-all duration-500
        ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
        >
            <div className="relative flex flex-col items-center justify-center w-full h-full text-center p-12 overflow-hidden">

                {/* Soft Amber Glow Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/30 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-5xl">
                    <div className="mb-8 inline-flex items-center justify-center p-8 bg-amber-500/20 rounded-full border-2 border-amber-500/30 shadow-lg relative">
                        {/* Indikator Titik Peringatan */}
                        <span className="absolute top-2 right-2 flex w-4 h-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full w-4 h-4 bg-orange-500"></span>
                        </span>

                        {isOffline ? (
                            // Icon Wifi Off
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 00-12.728 0M15.536 8.464a5 5 0 00-7.072 0M12 11.5v.01M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                            </svg>
                        ) : (
                            // Icon System Alert
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>

                    <h1 className="text-[5vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300 leading-tight mb-6 drop-shadow-md">
                        {isOffline ? "Gangguan Jaringan" : "Pemberitahuan Sistem"}
                    </h1>

                    <p className="text-[2.2vw] font-medium text-amber-100 max-w-4xl mx-auto leading-relaxed px-8 py-6 bg-black/30 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
                        {message || defaultMessage}
                        <br />
                        <span className="text-[1.5vw] text-amber-400/80 mt-4 block font-normal">
                            Harap tetap duduk manis di ruang tunggu Anda. Teknisi kami sedang menanganinya.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
