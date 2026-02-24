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
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 pb-20
        ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', WebkitBackdropFilter: 'blur(24px)', backdropFilter: 'blur(24px)' }}
        >
            <div className="relative flex flex-col items-center max-w-5xl text-center px-12 py-20 rounded-[3rem] border shadow-2xl overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>

                {/* Glow Effects (Pakai inline WebkitFilter untuk Chrome Jadul) */}
                <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full" style={{ backgroundColor: 'rgba(20, 184, 166, 0.3)', WebkitFilter: 'blur(100px)', filter: 'blur(100px)' }}></div>
                <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', WebkitFilter: 'blur(100px)', filter: 'blur(100px)' }}></div>

                <div className="relative z-10">
                    <div className="mb-8 inline-flex items-center justify-center p-6 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(20, 184, 166, 0.2)' }}>
                        {/* Ikon Jam/Waktu Istirahat (Teal) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    {/* Tambahkan style warna baku (teal-400 fallback) karena bg-clip-text sering error di Chrome jadul membuat text malah tembus pandang/hilang */}
                    <h1 className="text-[6.5vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300 leading-tight mb-6 drop-shadow-lg"
                        style={{ color: '#2dd4bf', WebkitTextFillColor: 'transparent' }}>
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
