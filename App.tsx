
import React, { useState, useEffect } from 'react';
import { 
  RiskLevel, 
  Language, 
  AppView, 
  PredictionResult, 
  SatelliteData,
  User
} from './types';
import { predictHypoxia } from './services/predictor';
import { getScientificAnalysis } from './services/geminiService';
import { translations, getAdvisory } from './services/i18n';
import { fetchSatelliteData } from './services/satelliteMock';
import Architecture from './components/Architecture';
import RiskMap from './components/RiskMap';
import ExplainableAI from './components/ExplainableAI';
import HistoricalArchive from './components/HistoricalArchive';
import RiskTrendGraph from './components/RiskTrendGraph';
import Deployment from './components/Deployment';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language | null>(null);
  const [view, setView] = useState<AppView>('splash');
  const [loadingMsg, setLoadingMsg] = useState('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [currentData, setCurrentData] = useState<SatelliteData | null>(null);
  const [time, setTime] = useState(new Date());
  
  // Login states
  const [userData, setUserData] = useState<User>({ name: '', phone: '' });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedLang = localStorage.getItem('codestrix_lang') as Language;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const t = translations[lang || 'en'];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.phone) {
      setError('');
      setView('otp');
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      setError('');
      setView('splash');
    } else {
      setError('Invalid OTP. Please use 123456.');
    }
  };

  const selectLanguage = (l: Language) => {
    setLang(l);
    localStorage.setItem('codestrix_lang', l);
    setView('login');
  };

  const startDetection = async () => {
    const lat = 13.0827;
    const lng = 80.2707;

    setLoadingMsg(t.detecting);
    setView('detecting');

    try {
      setLoadingMsg(t.fetching);
      const data = await fetchSatelliteData(lat, lng);
      setCurrentData(data);

      setLoadingMsg(t.analyzing);
      const prediction = predictHypoxia({
        sst: data.sst,
        chlorophyll: data.chlorophyll,
        sst_3day_avg: data.sst_3day_avg,
        sst_7day_avg: data.sst_7day_avg,
        chlorophyll_3day_avg: data.chlorophyll_3day_avg,
        chlorophyll_7day_avg: data.chlorophyll_7day_avg
      });

      const analysis = await getScientificAnalysis({
        sst: data.sst,
        chlorophyll: data.chlorophyll,
        sst_3day_avg: data.sst_3day_avg,
        sst_7day_avg: data.sst_7day_avg,
        chlorophyll_3day_avg: data.chlorophyll_3day_avg,
        chlorophyll_7day_avg: data.chlorophyll_7day_avg
      }, prediction);

      setResult({
        ...prediction,
        advisory: getAdvisory(lang || 'en', prediction.risk),
        analysis
      });
      setView('result');
    } catch (err) {
      console.error(err);
      setView('splash');
    }
  };

  const getRiskColor = (risk: RiskLevel | string) => {
    switch(risk) {
      case RiskLevel.SAFE: return 'text-green-400';
      case RiskLevel.WARNING: return 'text-yellow-400';
      case RiskLevel.SEVERE: return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <button onClick={() => setView('splash')} className="text-2xl font-bold text-cyan-400 hover:opacity-80 transition-opacity">
          🌊 {t.appTitle}
        </button>
        <div className="flex items-center gap-6">
          <div className="text-sm text-gray-400 hidden sm:block">
            {t.tagline}
          </div>
          {lang && (
            <div className="flex gap-2">
              {['en', 'ta', 'hi'].map((l) => (
                <button 
                  key={l}
                  onClick={() => selectLanguage(l as Language)}
                  className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${lang === l ? 'bg-cyan-500 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="wave-divider"></div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-6 md:p-10">
        
        {view === 'splash' && (
          <div className="fade-in">
            <section className="text-center py-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                {t.heroTitle}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                {t.heroDesc}
              </p>
            </section>

            <div className="flex flex-col items-center gap-6 mt-8">
              {!lang ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl">
                  {(['en', 'ta', 'hi'] as Language[]).map(l => (
                    <button 
                      key={l}
                      onClick={() => selectLanguage(l)}
                      className="ocean-glow py-4 rounded-xl font-bold hover:border-cyan-400 transition-all text-gray-300"
                    >
                      {l === 'en' ? 'English' : l === 'ta' ? 'தமிழ்' : 'हिन्दी'}
                    </button>
                  ))}
                </div>
              ) : (
                <button 
                  onClick={startDetection}
                  className="px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl transition-all active:scale-95"
                >
                  {t.scanBtn}
                </button>
              )}
            </div>
          </div>
        )}

        {view === 'login' && (
          <div className="max-w-md mx-auto fade-in">
            <div className="ocean-glow rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-white">{t.loginTitle}</h2>
              {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <input 
                  type="text" 
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-cyan-400 outline-none"
                  placeholder={t.nameLabel}
                  required
                />
                <input 
                  type="tel" 
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-cyan-400 outline-none"
                  placeholder={t.phoneLabel}
                  required
                />
                <button 
                  type="submit"
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold uppercase tracking-widest text-sm transition-all"
                >
                  {t.sendOtp}
                </button>
              </form>
            </div>
          </div>
        )}

        {view === 'otp' && (
          <div className="max-w-md mx-auto fade-in">
            <div className="ocean-glow rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-2 text-white">{t.otpTitle}</h2>
              <p className="text-gray-400 text-xs mb-6 italic">{t.otpSent} +91 {userData.phone}</p>
              {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
              <form onSubmit={handleOtpVerify} className="space-y-4">
                <input 
                  type="text" 
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-2xl font-mono text-center tracking-[0.5em] focus:border-cyan-400 outline-none"
                  placeholder="000000"
                  required
                />
                <button 
                  type="submit"
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold uppercase tracking-widest text-sm transition-all"
                >
                  {t.verifyBtn}
                </button>
                <p className="text-[10px] text-gray-500 uppercase mt-4">{t.bypassCode}</p>
              </form>
            </div>
          </div>
        )}

        {view === 'detecting' && (
          <div className="flex flex-col items-center justify-center py-20 fade-in">
             <div className="relative w-24 h-24 mb-10">
                <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
                <div className="absolute inset-4 bg-cyan-400/20 rounded-full animate-pulse"></div>
             </div>
             <p className="text-2xl font-bold text-cyan-400 animate-pulse uppercase tracking-wider">{loadingMsg}</p>
          </div>
        )}

        {view === 'result' && result && currentData && (
          <div className="space-y-6 fade-in pb-20">
            {/* Live Status Panel */}
            <section className="ocean-glow rounded-2xl p-8 shadow-lg">
              <div className="flex flex-wrap justify-between items-center gap-6 mb-10 pb-6 border-b border-white/5">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">📅 {t.date}</p>
                  <p className="font-semibold text-lg">{time.toLocaleDateString(lang === 'en' ? 'en-IN' : lang === 'ta' ? 'ta-IN' : 'hi-IN')}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">⏰ {t.time}</p>
                  <p className="font-semibold text-lg">{time.toLocaleTimeString(lang === 'en' ? 'en-IN' : lang === 'ta' ? 'ta-IN' : 'hi-IN')} IST</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">📍 {t.zone}</p>
                  <p className="font-semibold text-cyan-400 text-lg">{t.chennaiZone}</p>
                </div>
                {userData.name && (
                   <div className="hidden sm:block">
                     <p className="text-gray-400 text-xs uppercase tracking-widest">👤 {t.operator}</p>
                     <p className="font-semibold text-white text-lg">{userData.name}</p>
                   </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-sm text-gray-400 uppercase tracking-[0.3em]">
                  {t.riskTitle}
                </h3>
                <h1 className={`text-7xl font-black mt-4 tracking-tighter uppercase ${getRiskColor(result.risk)}`}>
                  {result.risk}
                </h1>
                <p className="mt-6 text-gray-300 text-xl font-medium max-w-xl mx-auto leading-relaxed">
                  {result.advisory}
                </p>
              </div>

              {result.analysis && (
                <div className="mt-10 pt-6 border-t border-white/5 text-left">
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-3">{t.aiReasoning}</p>
                  <p className="text-gray-400 text-sm leading-relaxed italic">"{result.analysis}"</p>
                </div>
              )}
            </section>

            {/* Main Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (8 units) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RiskMap t={t} />
                  <ExplainableAI t={t} features={{
                    sst: currentData.sst,
                    chlorophyll: currentData.chlorophyll,
                    sst_3day_avg: currentData.sst_3day_avg,
                    sst_7day_avg: currentData.sst_7day_avg,
                    chlorophyll_3day_avg: currentData.chlorophyll_3day_avg,
                    chlorophyll_7day_avg: currentData.chlorophyll_7day_avg
                  }} />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="ocean-glow p-6 rounded-2xl">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t.currentSst}</p>
                    <p className="text-2xl font-bold mono">{currentData.sst}°C</p>
                  </div>
                  <div className="ocean-glow p-6 rounded-2xl">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t.chlLevel}</p>
                    <p className="text-2xl font-bold mono">{currentData.chlorophyll}</p>
                  </div>
                  <div className="ocean-glow p-6 rounded-2xl">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t.sst7d}</p>
                    <p className="text-2xl font-bold mono">{currentData.sst_7day_avg}°C</p>
                  </div>
                  <div className="ocean-glow p-6 rounded-2xl">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t.chl7d}</p>
                    <p className="text-2xl font-bold mono">{currentData.chlorophyll_7day_avg}</p>
                  </div>
                </div>
              </div>

              {/* Right Column (4 units) */}
              <div className="lg:col-span-4 space-y-6">
                <RiskTrendGraph t={t} />
                <HistoricalArchive t={t} />
              </div>
            </div>

            <div className="flex justify-center pt-10">
              <button 
                onClick={() => setView('splash')}
                className="px-10 py-4 border border-slate-700 hover:bg-slate-800 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
              >
                ← {t.returnBtn}
              </button>
            </div>
          </div>
        )}

        {view === 'admin' && <Architecture />}
        {view === 'deployment' && <Deployment />}
      </main>

      <footer className="p-10 text-center border-t border-white/5">
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm">{t.poweredBy}</p>
          <button 
            onClick={() => setView('deployment')}
            className="text-[10px] text-cyan-500 font-black uppercase tracking-widest hover:text-cyan-400 transition-colors"
          >
            {t.deployLink}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
