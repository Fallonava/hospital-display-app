import { useState, useEffect } from 'react';

export function useTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();

    // Notifikasi istirahat muncul tepat di jam 12, 15, 18, dan 19
    // Ditampilkan selama 45 menit (misal: 12:00 - 12:44)
    const isRestHour = [12, 15, 18, 19].includes(hours);
    const isRestTime = isRestHour && minutes < 45;

    const formattedTime = time.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const formattedDate = time.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Untuk animasi blinking pemisah ':' jika diperlukan
    const seconds = time.getSeconds();

    return { time, formattedTime, formattedDate, isRestTime, seconds };
}
