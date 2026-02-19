
import React from 'react';
import { PredictionFeatures } from '../types';

interface Props {
  features: PredictionFeatures;
  t: any;
}

const ExplainableAI: React.FC<Props> = ({ features, t }) => {
  const factors = [
    {
      label: t.xaiSst,
      status: features.sst > 31 ? t.xaiCritical : (features.sst > 28 ? t.xaiElevated : t.xaiNormal),
      desc: `${t.currentSst} ${features.sst}°C.`,
      color: features.sst > 31 ? "text-red-500" : (features.sst > 28 ? "text-yellow-400" : "text-green-400")
    },
    {
      label: t.xaiChl,
      status: features.chlorophyll > 15 ? t.xaiHigh : (features.chlorophyll > 8 ? t.xaiMod : t.xaiLow),
      desc: `${t.chlLevel}: ${features.chlorophyll} mg/m³.`,
      color: features.chlorophyll > 15 ? "text-red-500" : (features.chlorophyll > 8 ? "text-yellow-400" : "text-green-400")
    },
    {
      label: t.xaiTrend,
      status: features.sst > features.sst_7day_avg ? t.xaiWarming : t.xaiCooling,
      desc: features.sst > features.sst_7day_avg 
        ? `${t.currentSst} > ${t.sst7d} (${features.sst_7day_avg}°C).`
        : "Stable / Cooling Trend.",
      color: features.sst > features.sst_7day_avg ? "text-orange-500" : "text-cyan-400"
    }
  ];

  return (
    <div className="ocean-glow p-6 rounded-2xl space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
        <span>🧠</span> {t.xaiTitle}
      </h3>
      <div className="space-y-4">
        {factors.map((f, i) => (
          <div key={i} className="border-l-2 border-white/10 pl-4 py-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-300 uppercase">{f.label}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded bg-black/40 ${f.color}`}>
                {f.status}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-tight">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="pt-2 text-[9px] text-gray-600 italic">
        {t.xaiWeights}
      </div>
    </div>
  );
};

export default ExplainableAI;
