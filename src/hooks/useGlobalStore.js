import { useState, useEffect } from 'react';

// Default state yang akan dibagikan antar tab
const DEFAULT_STATE = {
    isEmergencyActive: false,
    emergencyMessage: '',
    forceRestMode: false,
    isSystemError: false,
    systemErrorMessage: '',
    isNetworkOffline: !navigator.onLine,
};

export function useGlobalStore() {
    const [store, setStore] = useState(() => {
        try {
            const item = localStorage.getItem('hospital_display_store');
            return item ? { ...JSON.parse(item), isNetworkOffline: !navigator.onLine } : DEFAULT_STATE;
        } catch (error) {
            console.warn('Error reading localStorage', error);
            return DEFAULT_STATE;
        }
    });

    // Listener untuk perubahan dari tab lain (Layar Admin memicu update di Layar TV)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'hospital_display_store' && e.newValue) {
                setStore(prev => ({ ...JSON.parse(e.newValue), isNetworkOffline: prev.isNetworkOffline }));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Listener otomatis untuk status koneksi internet browser
    useEffect(() => {
        const handleOnline = () => setStore(prev => ({ ...prev, isNetworkOffline: false }));
        const handleOffline = () => setStore(prev => ({ ...prev, isNetworkOffline: true }));

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Fungsi untuk Admin memperbarui state (akan otomatis ter-sync ke tab lain)
    const updateStore = (updates) => {
        const newStore = { ...store, ...updates };
        setStore(newStore);
        localStorage.setItem('hospital_display_store', JSON.stringify(newStore));
    };

    return { store, updateStore };
}
