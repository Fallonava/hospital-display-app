import React from 'react';

export default function Clock({ formattedTime, formattedDate, seconds }) {
    // Pisahkan jam dan menit untuk efek visual
    const [hours, minutes] = formattedTime.split(/[.:]/);
    const isEvenSecond = seconds % 2 === 0;

    return (
        <div className="flex flex-col items-center justify-center p-12 transition-all duration-700">
            <div className="flex items-center justify-center text-[18vw] font-bold leading-none tracking-tight text-white drop-shadow-2xl">
                <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                    {hours}
                </span>
                <span className={`mx-4 font-light text-blue-500 transition-opacity duration-500 ${isEvenSecond ? 'opacity-100' : 'opacity-30'}`}>
                    :
                </span>
                <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                    {minutes}
                </span>
            </div>

            <div className="mt-8 px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                <h2 className="text-[2.5vw] font-medium text-gray-300 tracking-wide uppercase">
                    {formattedDate}
                </h2>
            </div>
        </div>
    );
}
