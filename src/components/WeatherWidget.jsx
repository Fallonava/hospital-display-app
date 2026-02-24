import React from 'react';
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSun, Snowflake, Sun } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import { useGlobalStore } from '../hooks/useGlobalStore';

const IconMap = {
    'sun': Sun,
    'cloud-sun': CloudSun,
    'cloud': Cloud,
    'cloud-fog': CloudFog,
    'cloud-drizzle': CloudDrizzle,
    'cloud-rain': CloudRain,
    'snowflake': Snowflake,
    'cloud-lightning': CloudLightning,
};

export default function WeatherWidget() {
    const { store } = useGlobalStore();
    const { temperature, description, icon, isLoading, error } = useWeather(store.latitude, store.longitude);

    const IconComponent = IconMap[icon] || Cloud;

    return (
        <div className="flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl transition-all duration-500 hover:bg-white/10 w-full min-w-[280px]">
            <h3 className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-4 w-full text-center border-b border-white/10 pb-3 block">
                Cuaca • {store.city}
            </h3>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-6 h-[120px]">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-500 border-t-white animate-spin"></div>
                    <p className="text-slate-400 mt-4 text-sm font-medium">Memuat Cuaca...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-6 h-[120px]">
                    <Cloud className="w-12 h-12 text-slate-500/50 mb-3" />
                    <p className="text-red-400/80 text-sm font-medium">Data Tidak Tersedia</p>
                </div>
            ) : (
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/20 text-blue-400">
                        <IconComponent size={42} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-5xl font-black text-white tracking-tighter drop-shadow-md flex items-start">
                            {temperature}<span className="text-2xl mt-1 text-white/50">°C</span>
                        </span>
                        <span className="text-xl font-medium text-slate-300 capitalize tracking-wide mt-1">
                            {description}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
