
import React, { useEffect, useRef } from 'react';

declare const Chart: any;

interface Props {
  t: any;
}

const RiskTrendGraph: React.FC<Props> = ({ t }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Simulated data: Risk Score 0 (Safe), 1 (Warning), 2 (Severe)
    const data = [1.2, 1.8, 1.9, 1.1, 0.4];
    const labels = ['Now', 'D2', 'D3', 'D4', 'D5'];

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: t.trendTitle,
          data: data,
          borderColor: '#22d3ee',
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const {ctx, chartArea} = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(34, 211, 238, 0)');
            gradient.addColorStop(1, 'rgba(34, 211, 238, 0.2)');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#22d3ee',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            bodyFont: { size: 10 },
            titleFont: { size: 10 }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b', font: { size: 9, weight: 'bold' } }
          },
          y: {
            min: 0,
            max: 2,
            ticks: {
              stepSize: 1,
              callback: (value: number) => {
                if (value === 0) return t.mapLegendSafe.toUpperCase();
                if (value === 1) return t.mapLegendWarn.toUpperCase();
                if (value === 2) return t.mapLegendSevere.toUpperCase();
                return '';
              },
              color: '#64748b',
              font: { size: 8, weight: 'bold' }
            },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          }
        }
      }
    });

    return () => chart.destroy();
  }, [t]);

  return (
    <div className="ocean-glow p-6 rounded-2xl h-full flex flex-col">
      <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
        <span>📈</span> {t.trendTitle}
      </h3>
      <div className="flex-1 h-[130px] min-h-[130px]">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="mt-2 flex justify-between text-[8px] font-black uppercase text-gray-500 tracking-tighter">
        <span>{t.trendInference}</span>
        <span className="text-cyan-400">{t.trendForecast}</span>
      </div>
    </div>
  );
};

export default RiskTrendGraph;
