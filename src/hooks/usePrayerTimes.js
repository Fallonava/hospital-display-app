import { useState, useEffect } from 'react';

export function usePrayerTimes(latitude, longitude) {
    const [prayers, setPrayers] = useState({
        times: null,
        isLoading: true,
        error: false
    });

    useEffect(() => {
        if (!latitude || !longitude) return;

        let isMounted = true;

        const fetchPrayers = async () => {
            try {
                // Aladhan API for getting prayer times by coordinates for today
                const now = new Date();
                const month = now.getMonth() + 1;
                const year = now.getFullYear();

                // Using method 11 (Majlis Ugama Islam Singapura, or 20 for Kemenag Indonesia usually roughly similar)
                // Timings by Date: /v1/timings/:date?latitude=...
                const dateString = `${now.getDate()}-${month}-${year}`;
                const response = await fetch(`https://api.aladhan.com/v1/timings/${dateString}?latitude=${latitude}&longitude=${longitude}&method=11`);

                if (!response.ok) throw new Error('Failed to fetch prayer times');

                const data = await response.json();

                if (isMounted && data.code === 200) {
                    const timings = data.data.timings;
                    // Format output: Hapus timezone (e.g. "04:30 (WIB)" -> "04:30")
                    const cleanTime = (timeStr) => timeStr.split(' ')[0];

                    setPrayers({
                        times: {
                            Subuh: cleanTime(timings.Fajr),
                            Dzuhur: cleanTime(timings.Dhuhr),
                            Ashar: cleanTime(timings.Asr),
                            Maghrib: cleanTime(timings.Maghrib),
                            Isya: cleanTime(timings.Isha)
                        },
                        isLoading: false,
                        error: false
                    });
                }
            } catch (error) {
                console.error("Failed to fetch prayers:", error);
                if (isMounted) {
                    setPrayers(prev => ({ ...prev, isLoading: false, error: true }));
                }
            }
        };

        fetchPrayers();

        // Refresh at midnight to get new prayer times for the new day
        // Simplified: Refresh every 6 hours just to be safe
        const intervalId = setInterval(fetchPrayers, 6 * 60 * 60 * 1000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [latitude, longitude]);

    return prayers;
}
