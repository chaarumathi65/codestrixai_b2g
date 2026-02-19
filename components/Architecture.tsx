
import React from 'react';

const Architecture: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h2 className="text-lg font-bold mb-4 text-cyan-400">Automated Data Flow</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-none w-8 h-8 rounded bg-cyan-900 flex items-center justify-center text-cyan-400 font-bold">1</div>
            <div>
              <h4 className="text-sm font-bold">GPS Zone Identification</h4>
              <p className="text-xs text-slate-500">Browser Geolocation API identifies the user's specific coastal grid coordinate.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-none w-8 h-8 rounded bg-blue-900 flex items-center justify-center text-blue-400 font-bold">2</div>
            <div>
              <h4 className="text-sm font-bold">Satellite Ingestion</h4>
              <p className="text-xs text-slate-500">FastAPI backend queries NOAA (Temperature) and MODIS (Chlorophyll) NetCDF data for the grid.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-none w-8 h-8 rounded bg-purple-900 flex items-center justify-center text-purple-400 font-bold">3</div>
            <div>
              <h4 className="text-sm font-bold">RandomForest Inference</h4>
              <p className="text-xs text-slate-500">Scikit-Learn model runs local inference using 7-day rolling averages to detect hypoxia trends.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-none w-8 h-8 rounded bg-emerald-900 flex items-center justify-center text-emerald-400 font-bold">4</div>
            <div>
              <h4 className="text-sm font-bold">Scientific i18n Output</h4>
              <p className="text-xs text-slate-500">Gemini 3 Flash converts probabilities into localized advisories for the fisher's language.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-sm font-bold text-white mb-3">Model Parameters (Automated)</h3>
        <ul className="text-[11px] space-y-2 text-slate-400 font-mono">
          <li>- SST (Daily Mean)</li>
          <li>- Chl-a (Euphotic Zone Mean)</li>
          <li>- SST_Rolling_3d / 7d</li>
          <li>- Chl_Rolling_3d / 7d</li>
        </ul>
      </div>
    </div>
  );
};

export default Architecture;
