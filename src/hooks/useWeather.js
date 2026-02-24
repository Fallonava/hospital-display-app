import { useState, useEffect } from 'react';

// Pemetaan WMO Weather Code ke Icon dan Deskripsi Bahasa Indonesia
const getWeatherInfo = (code) => {
    const codes = {
        0: { desc: 'Cerah', icon: 'sun' },
        1: { desc: 'Cerah Berawan', icon: 'cloud-sun' },
        2: { desc: 'Berawan Sebagian', icon: 'cloud-sun' },
        3: { desc: 'Mendung', icon: 'cloud' },
        45: { desc: 'Berkabut', icon: 'cloud-fog' },
        48: { desc: 'Kabut Embun', icon: 'cloud-fog' },
        51: { desc: 'Gerimis Ringan', icon: 'cloud-drizzle' },
        53: { desc: 'Gerimis Sedang', icon: 'cloud-drizzle' },
        55: { desc: 'Gerimis Lebat', icon: 'cloud-drizzle' },
        61: { desc: 'Hujan Ringan', icon: 'cloud-rain' },
        63: { desc: 'Hujan Sedang', icon: 'cloud-rain' },
        65: { desc: 'Hujan Lebat', icon: 'cloud-rain' },
        71: { desc: 'Salju Ringan', icon: 'snowflake' }, // Rare in Indo, but just in case
        80: { desc: 'Hujan Mengguyur', icon: 'cloud-rain' },
        81: { desc: 'Hujan Deras', icon: 'cloud-lightning' },
        82: { desc: 'Hujan Sangat Deras', icon: 'cloud-lightning' },
        95: { desc: 'Badai Petir', icon: 'cloud-lightning' },
        96: { desc: 'Badai Petir Ringan', icon: 'cloud-lightning' },
        99: { desc: 'Badai Petir Berat', icon: 'cloud-lightning' },
    };
    return codes[code] || { desc: 'Tidak Diketahui', icon: 'cloud' };
};

export function useWeather(latitude, longitude) {
    const [weather, setWeather] = useState({
        temperature: null,
        description: 'Memuat Cuaca...',
        icon: 'cloud',
        isLoading: true,
        error: false
    });

    useEffect(() => {
        if (!latitude || !longitude) return;

        let isMounted = true;

        const fetchWeather = async () => {
            try {
                // Open-Meteo is free and requires no API Key
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`);
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();

                if (isMounted) {
                    const current = data.current_weather;
                    const info = getWeatherInfo(current.weathercode);

                    setWeather({
                        temperature: Math.round(current.temperature),
                        description: info.desc,
                        icon: info.icon,
                        isLoading: false,
                        error: false
                    });
                }
            } catch (error) {
                console.error("Failed to fetch weather:", error);
                if (isMounted) {
                    setWeather(prev => ({ ...prev, isLoading: false, error: true, description: "Cuaca Gagal Dimuat" }));
                }
            }
        };

        fetchWeather();

        // Refresh weather data every 30 minutes
        const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [latitude, longitude]);

    return weather;
}
