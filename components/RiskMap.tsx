
import React, { useEffect, useRef } from 'react';

declare const L: any; // Leaflet global

interface Props {
  t: any;
}

const RiskMap: React.FC<Props> = ({ t }) => {
  const mapRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);

  const zones = [
    {
      name: "Chennai North",
      risk: t.mapLegendSafe,
      coords: [[13.1, 80.2], [13.3, 80.3], [13.3, 80.5], [13.1, 80.5]],
      center: [13.2, 80.35],
      color: "#10b981" // Emerald
    },
    {
      name: "Palk Bay",
      risk: t.mapLegendSevere,
      coords: [[9.8, 79.0], [10.2, 79.3], [10.0, 79.7], [9.5, 79.3]],
      center: [9.85, 79.3],
      color: "#f43f5e" // Rose
    },
    {
      name: "Gulf of Mannar",
      risk: t.mapLegendWarn,
      coords: [[8.5, 78.1], [9.0, 78.5], [8.8, 78.8], [8.3, 78.4]],
      center: [8.65, 78.45],
      color: "#f59e0b" // Amber
    }
  ];

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('risk-map', {
        center: [10.5, 79.5],
        zoom: 7,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(mapRef.current);

      layerGroupRef.current = L.layerGroup().addTo(mapRef.current);
    }

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    zones.forEach(zone => {
      L.polygon(zone.coords, {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.3,
        weight: 2
      }).addTo(layerGroup).bindPopup(`<div class="text-slate-900 font-sans"><b>${zone.name}</b><br>${t.riskTitle}: ${zone.risk}</div>`);
    });

  }, [t]);

  const resetView = () => {
    if (mapRef.current) {
      mapRef.current.setView([10.5, 79.5], 7);
    }
  };

  return (
    <div className="ocean-glow p-6 rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
          <span>🌐</span> {t.mapTitle}
        </h3>
        <button 
          onClick={resetView}
          className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded hover:bg-white/10"
        >
          {t.mapReset}
        </button>
      </div>
      <div id="risk-map" className="shadow-2xl"></div>
      <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        <div className="flex gap-4">
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> {t.mapLegendSafe}</span>
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> {t.mapLegendWarn}</span>
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> {t.mapLegendSevere}</span>
        </div>
        <div className="text-cyan-400">{t.mapLive}</div>
      </div>
    </div>
  );
};

export default RiskMap;
