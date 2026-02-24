import React, { useEffect, useState } from 'react';

export default function EmergencyOverlay({ isVisible, message }) {
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 500); // transisi lebih cepat
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-red-950/95 backdrop-blur-2xl transition-all duration-500
        ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
        >
            <div className="relative flex flex-col items-center justify-center w-full h-full text-center p-12 overflow-hidden">

                {/* Intense Blinking Glow Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/40 rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/30 rounded-full blur-[120px] animate-ping pointer-events-none" style={{ animationDuration: '2s' }}></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/30 rounded-full blur-[120px] animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }}></div>

                <div className="relative z-10 w-full max-w-7xl animate-pulse" style={{ animationDuration: '1s' }}>
                    <div className="mb-6 inline-flex items-center justify-center p-8 bg-red-500/20 rounded-full border-4 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.5)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <h1 className="text-[6vw] font-black text-white tracking-widest uppercase leading-tight mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                        PERINGATAN DARURAT
                    </h1>

                    <p className="text-[4.5vw] font-bold text-yellow-400 max-w-full leading-snug break-words uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-8 py-6 bg-black/40 rounded-3xl border border-yellow-500/30 backdrop-blur-md inline-block">
                        {message || "HARAP TENANG DAN IKUTI ARAHAN PETUGAS"}
                    </p>
                </div>
            </div>
        </div>
    );
}
