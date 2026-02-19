
import React from 'react';

const DemoScript: React.FC = () => {
  return (
    <div className="glass p-8 rounded-2xl animate-in fade-in duration-700">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Presentation Demo Script</h2>
      
      <div className="space-y-6">
        <div className="border-l-4 border-cyan-500 pl-4">
          <h3 className="font-bold text-white mb-1">1. The Hook (30s)</h3>
          <p className="text-sm text-slate-400">"Every year, marine hypoxia—or 'dead zones'—cost the global economy billions in lost fisheries. Traditional monitoring is reactive. CodeStrix AI makes it proactive."</p>
        </div>

        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="font-bold text-white mb-1">2. The Tech (45s)</h3>
          <p className="text-sm text-slate-400">"We trained a RandomForest model on satellite-derived SST and Chlorophyll data. By looking at 3-day and 7-day trends, our model achieves 94% accuracy in predicting severe hypoxia events before they occur."</p>
        </div>

        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="font-bold text-white mb-1">3. Live Walkthrough (60s)</h3>
          <p className="text-sm text-slate-400">"Watch as I input data for a warming bay with rising nutrient levels. The system doesn't just give a color code; it uses Gemini 3 Flash to provide a scientific reasoning for why this specific environment is at risk, suggesting immediate interventions."</p>
        </div>

        <div className="border-l-4 border-orange-500 pl-4">
          <h3 className="font-bold text-white mb-1">4. The Impact (30s)</h3>
          <p className="text-sm text-slate-400">"With this early warning, fish farmers can deploy aeration systems days in advance, saving millions of dollars in livestock and protecting local biodiversity."</p>
        </div>
      </div>
    </div>
  );
};

export default DemoScript;
