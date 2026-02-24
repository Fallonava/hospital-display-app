import React from 'react';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { useGlobalStore } from '../hooks/useGlobalStore';

export default function PrayerTimesWidget() {
    const { store } = useGlobalStore();
    const { times, isLoading, error } = usePrayerTimes(store.latitude, store.longitude);

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl transition-all duration-500 hover:bg-white/10 w-full mt-6">
            <h3 className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-4 w-full text-center border-b border-white/10 pb-3 block">
                Jadwal Sholat ({store.city})
            </h3>

            {isLoading ? (
                <div className="flex justify-center py-6">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-500 border-t-white animate-spin"></div>
                </div>
            ) : error || !times ? (
                <div className="flex justify-center py-4">
                    <p className="text-red-400/80 text-sm font-medium">Jadwal Tidak Tersedia</p>
                </div>
            ) : (
                <div className="flex justify-between items-center px-2 gap-4">
                    {Object.entries(times).map(([name, time]) => (
                        <div key={name} className="flex flex-col items-center">
                            <span className="flex text-emerald-400/80 text-xs font-bold tracking-wider uppercase mb-2">
                                {name}
                            </span>
                            <span className="text-2xl font-black text-slate-100 tracking-tight bg-slate-900/40 px-4 py-2 rounded-xl border border-slate-800/50">
                                {time}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
