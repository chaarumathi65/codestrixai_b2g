import React from 'react';

const Scaling: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">Future Scaling & Integration</h2>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
              <span className="p-1 bg-cyan-900 rounded text-cyan-400">01</span>
              Satellite Data Ingestion (Copernicus/MODIS)
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transition from manual input to automated ingestion via the <span className="text-white italic">Copernicus Marine Environment Monitoring Service (CMEMS)</span>. 
              Python-based scripts using <code className="text-cyan-400">motu-client</code> will fetch daily NetCDF files, which are processed into tabular features for the RandomForest model.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
              <span className="p-1 bg-cyan-900 rounded text-cyan-400">02</span>
              SMS Alert Infrastructure
            </h3>
            <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-xl font-mono text-xs">
              <p className="text-slate-500 mb-2">// SMS Alert Logic Example (Twilio/AWS SNS)</p>
              <p className="text-cyan-300">if (prediction.risk == "SEVERE"):</p>
              <p className="pl-4 text-slate-300">client.messages.create(</p>
              <p className="pl-8 text-slate-300">to="+123456789",</p>
              <p className="pl-8 text-slate-300">from_="CodeStrixAI",</p>
              {/* Fix: Escaped the curly braces to treat {analysis} as literal text in the code snippet */}
              <p className="pl-8 text-slate-300">body=f"HYPOXIA ALERT: SEVERE risk detected. {'{analysis}'}"</p>
              <p className="pl-4 text-slate-300">)</p>
            </div>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Integrating Twilio API allows the system to push critical warnings to aquaculture farm managers and coastal authorities in under 5 seconds from detection.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
              <span className="p-1 bg-cyan-900 rounded text-cyan-400">03</span>
              Hybrid Modeling
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enhancing the system with <span className="text-white">LSTMs (Long Short-Term Memory)</span> for temporal sequence prediction and <span className="text-white">Physics-Informed Neural Networks (PINNs)</span> to incorporate oceanographic fluid dynamics for better spatial extrapolation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Scaling;