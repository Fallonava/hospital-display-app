import React, { useState } from 'react';
import { useGlobalStore } from '../hooks/useGlobalStore';
import { AlertTriangle, Clock, ShieldAlert, MonitorPlay, Save, WifiOff, MapPin } from 'lucide-react';

export default function Admin() {
    const { store, updateStore } = useGlobalStore();

    // Local state untuk input sebelum di-save/broadcast ke seluruh layar
    const [localMessage, setLocalMessage] = useState(store.emergencyMessage);
    const [localErrorMessage, setLocalErrorMessage] = useState(store.systemErrorMessage);

    // Local state untuk Pengaturan Lokasi
    const [localCity, setLocalCity] = useState(store.city);
    const [localLat, setLocalLat] = useState(store.latitude);
    const [localLng, setLocalLng] = useState(store.longitude);

    const handleToggleRest = () => {
        updateStore({ forceRestMode: !store.forceRestMode });
    };

    const handleToggleError = () => {
        updateStore({
            isSystemError: !store.isSystemError,
            systemErrorMessage: localErrorMessage
        });
    };

    const handleToggleEmergency = () => {
        // Jika tidak aktif, maka aktifkan dengan pesan saat ini
        updateStore({
            isEmergencyActive: !store.isEmergencyActive,
            emergencyMessage: localMessage
        });
    };

    const handleUpdateMessage = () => {
        updateStore({ emergencyMessage: localMessage });
    };

    const handleUpdateErrorMessage = () => {
        updateStore({ systemErrorMessage: localErrorMessage });
    };

    const handleUpdateLocation = () => {
        updateStore({
            city: localCity,
            latitude: parseFloat(localLat),
            longitude: parseFloat(localLng)
        });
        alert(`Lokasi diperbarui ke: ${localCity}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3 text-slate-800">
                            <MonitorPlay className="text-blue-600" size={28} />
                            Hospital Display Control Center
                        </h1>
                        <p className="text-slate-500 mt-1">Panel Kendali Layar Pendaftaran Pasien</p>
                    </div>
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Sistem Aktif
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Panel Pengaturan Lokasi (Widget Cuaca & Sholat) */}
                    <div className="md:col-span-2 p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row gap-8 items-stretch mb-2">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">Pengaturan Lokasi (Cuaca & Sholat)</h2>
                                    <p className="text-sm text-slate-500">Sesuaikan dengan lokasi Cabang Rumah Sakit</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl">
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Perubahan ini akan otomatis memperbarui data <strong>Cuaca</strong> dan <strong>Jadwal Sholat</strong> di layar utama. Gunakan format desimal untuk koordinat.
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Kota</label>
                                <input
                                    type="text"
                                    value={localCity}
                                    onChange={(e) => setLocalCity(e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Latitude (Garis Lintang)</label>
                                    <input
                                        type="number"
                                        step="0.000001"
                                        value={localLat}
                                        onChange={(e) => setLocalLat(e.target.value)}
                                        className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Longitude (Garis Bujur)</label>
                                    <input
                                        type="number"
                                        step="0.000001"
                                        value={localLng}
                                        onChange={(e) => setLocalLng(e.target.value)}
                                        className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex mt-auto pt-2">
                                <button
                                    onClick={handleUpdateLocation}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-200"
                                >
                                    <Save size={20} /> Simpan Lokasi Baru
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Panel Kontrol Darurat */}
                    <div className={`p-8 rounded-3xl border-2 transition-colors duration-300 ${store.isEmergencyActive ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-3 rounded-xl ${store.isEmergencyActive ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600'}`}>
                                <ShieldAlert size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Sistem Peringatan Darurat</h2>
                                <p className="text-sm text-slate-500">Mengesampingkan semua tampilan</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Pesan Darurat Kustom</label>
                                <textarea
                                    value={localMessage}
                                    onChange={(e) => setLocalMessage(e.target.value)}
                                    placeholder="Contoh: KODE BIRU DI RUANG MELATI, HARAP BERI JALAN."
                                    className="w-full border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all uppercase"
                                    rows={3}
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleUpdateMessage}
                                    disabled={!store.isEmergencyActive}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save size={18} /> Update Teks
                                </button>
                                <button
                                    onClick={handleToggleEmergency}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white transition-all shadow-lg ${store.isEmergencyActive
                                        ? 'bg-slate-500 hover:bg-slate-600 shadow-slate-200'
                                        : 'bg-red-600 hover:bg-red-700 shadow-red-200 animate-pulse'
                                        }`}
                                >
                                    <AlertTriangle size={20} />
                                    {store.isEmergencyActive ? 'MATIKAN SIRINE' : 'PICU DARURAT!'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Panel Kontrol Layanan */}
                    <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-3 rounded-xl ${store.forceRestMode ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-600'}`}>
                                <Clock size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Kontrol Mode Istirahat</h2>
                                <p className="text-sm text-slate-500">Ambil alih jam otomatis</p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <div className="bg-slate-50 p-6 rounded-2xl mb-6">
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Secara standar, layar masuk mode istirahat otomatis setiap jam 12, 15, 18, dan 19 (selama 45 menit).
                                    Gunakan tombol di bawah ini jika Anda perlu <strong>menutup sementara</strong> atau <strong>memperpanjang</strong> waktu istirahat secara manual.
                                </p>
                            </div>

                            <button
                                onClick={handleToggleRest}
                                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white transition-all shadow-lg ${store.forceRestMode
                                    ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-200'
                                    : 'bg-teal-600 hover:bg-teal-700 shadow-teal-200'
                                    }`}
                            >
                                {store.forceRestMode ? 'Batalkan Paksaan Istirahat (Kembali ke Normal)' : 'Paksa Layar Masuk Mode Istirahat Sekarang'}
                            </button>
                        </div>
                    </div>

                    {/* Panel Simulasi Gangguan Sistem */}
                    <div className="md:col-span-2 p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row gap-8 items-stretch">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-3 rounded-xl ${store.isSystemError ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-600'}`}>
                                    <WifiOff size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">Simulasi Gangguan Server/Jaringan</h2>
                                    <p className="text-sm text-slate-500">Tampilan error aman untuk pasien</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl">
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    <strong>Otomatis:</strong> Jika internet PC ini mati, layar otomatis masuk mode ini.<br />
                                    <strong>Manual:</strong> Gunakan panel ini jika internet hidup, tapi antrean BPJS/Sistem RS sedang bermasalah.
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Pesan Gangguan Kustom (Opsional)</label>
                                <textarea
                                    value={localErrorMessage}
                                    onChange={(e) => setLocalErrorMessage(e.target.value)}
                                    placeholder="Contoh: KONEKSI KE SERVER BPJS SEDANG GANGGUAN. MOHON BERSABAR."
                                    className="w-full border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all uppercase"
                                    rows={2}
                                />
                            </div>

                            <div className="flex gap-3 mt-auto">
                                <button
                                    onClick={handleUpdateErrorMessage}
                                    disabled={!store.isSystemError}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save size={18} /> Update
                                </button>
                                <button
                                    onClick={handleToggleError}
                                    className={`flex-[2] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white transition-all shadow-lg ${store.isSystemError
                                        ? 'bg-slate-500 hover:bg-slate-600 shadow-slate-200'
                                        : 'bg-amber-500 hover:bg-amber-600 shadow-amber-200'
                                        }`}
                                >
                                    <WifiOff size={20} />
                                    {store.isSystemError ? 'Matikan Mode Gangguan' : 'Aktifkan Mode Gangguan!'}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
