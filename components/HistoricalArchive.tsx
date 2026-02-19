
import React from 'react';

interface Props {
  t: any;
}

const HistoricalArchive: React.FC<Props> = ({ t }) => {
  const events = [
    { start: "Jan 12, 2024", end: "Jan 15, 2024", duration: "3 Days", impact: "$1.2M", zone: "Palk Bay" },
    { start: "Nov 04, 2023", end: "Nov 09, 2023", duration: "5 Days", impact: "$2.8M", zone: "Gulf of Mannar" },
    { start: "Aug 19, 2023", end: "Aug 21, 2023", duration: "2 Days", impact: "$0.4M", zone: "Chennai North" }
  ];

  return (
    <div className="ocean-glow p-6 rounded-2xl">
      <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
        <span>📜</span> {t.archiveTitle}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-gray-500 border-b border-white/5 uppercase tracking-tighter">
              <th className="pb-2 font-black">{t.archivePeriod}</th>
              <th className="pb-2 font-black text-center">{t.archiveDur}</th>
              <th className="pb-2 font-black text-right">{t.archiveImpact}</th>
            </tr>
          </thead>
          <tbody className="text-[11px]">
            {events.map((e, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0">
                <td className="py-3 text-gray-300">
                  <span className="block font-bold">{e.start} — {e.end}</span>
                  <span className="text-[9px] text-gray-600">{e.zone}</span>
                </td>
                <td className="py-3 text-center text-gray-400">{e.duration}</td>
                <td className="py-3 text-right text-rose-400 font-mono font-bold">{e.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[9px] text-gray-600 uppercase tracking-widest text-center">
        {t.archiveSync}
      </p>
    </div>
  );
};

export default HistoricalArchive;
