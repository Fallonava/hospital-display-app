import React, { useEffect } from 'react';
import { useTime } from '../hooks/useTime';
import { useGlobalStore } from '../hooks/useGlobalStore';
import Clock from '../components/Clock';
import RestOverlay from '../components/RestOverlay';
import EmergencyOverlay from '../components/EmergencyOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

export default function Display() {
    const { formattedTime, formattedDate, isRestTime, seconds } = useTime();
    const { store } = useGlobalStore();

    const { isEmergencyActive, emergencyMessage, forceRestMode, isSystemError, systemErrorMessage, isNetworkOffline } = store;

    // Mode istirahat aktif jika jam menunjukan waktu istirahat ATAU Admin memaksanya lewat dashboard
    const showRestOverlay = isRestTime || forceRestMode;

    // Tampilkan layar error jika admin memaksa error ATAU internet putus
    const showErrorOverlay = isSystemError || isNetworkOffline;

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-slate-950 flex items-center justify-center">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[150px]"></div>
            </div>

            {/* Main Clock UI */}
            <Clock
                formattedTime={formattedTime}
                formattedDate={formattedDate}
                seconds={seconds}
            />

            {/* Rest Time Overlay (Hospital Context Teal/Emerald) */}
            <RestOverlay isVisible={showRestOverlay} />

            {/* System Error Overlay (Amber) */}
            <ErrorOverlay
                isVisible={showErrorOverlay}
                message={systemErrorMessage}
                isOffline={isNetworkOffline}
            />

            {/* Emergency Warning Overlay (Highest Z-Index) */}
            <EmergencyOverlay isVisible={isEmergencyActive} message={emergencyMessage} />
        </div>
    );
}
