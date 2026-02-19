
import React from 'react';

const Deployment: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-20">
      <div className="ocean-glow p-8 rounded-3xl">
        <h2 className="text-3xl font-black mb-6 text-white tracking-tight flex items-center gap-3">
          <span className="p-2 bg-cyan-600 rounded-xl text-white text-xl">🚀</span>
          Deployment Strategy
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-black/20 p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center text-xs">1</span>
              Frontend (Static)
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Best for hackathon demos. Host as a static site on Netlify or Vercel.
            </p>
            <ul className="text-[11px] space-y-2 text-slate-500 font-mono">
              <li>- Push to GitHub</li>
              <li>- Connect to Vercel</li>
              <li>- Set API_KEY environment variable</li>
            </ul>
          </section>

          <section className="bg-black/20 p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-900/50 flex items-center justify-center text-xs">2</span>
              Backend (FastAPI)
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Required for real-time model serving and satellite data scraping.
            </p>
            <ul className="text-[11px] space-y-2 text-slate-500 font-mono">
              <li>- Use Docker container</li>
              <li>- Deploy to AWS App Runner / Cloud Run</li>
              <li>- Expose POST /predict endpoint</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-2xl">
          <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">Production Data Pipeline</h4>
          <div className="space-y-4 text-sm text-slate-400">
            <div className="flex gap-4">
              <div className="flex-none text-cyan-500">🛰️</div>
              <p><strong className="text-white">Ingestion:</strong> Python scripts fetch NetCDF files from Copernicus Marine Service every 24 hours.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex-none text-cyan-500">🧠</div>
              <p><strong className="text-white">Processing:</strong> Xarray library extracts SST/Chl values for specific coordinates and calculates rolling averages.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex-none text-cyan-500">🔔</div>
              <p><strong className="text-white">Alerting:</strong> If <code className="text-rose-400">risk == SEVERE</code>, trigger Twilio SMS API to notify registered harbor masters.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deployment;
