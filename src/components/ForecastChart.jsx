import React, { useState } from 'react';
import { ArrowRight } from './Icons';

export default function ForecastChart() {
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [timeframe, setTimeframe] = useState("WEEKLY"); // WEEKLY, MONTHLY, YEARLY

  // Mock data scaled for different timeframes
  const dataStore = {
    Tomato: {
      WEEKLY: { min: 1400, max: 2200, points: "M0,90 Q20,80 40,50 T80,20 L100,10" },
      MONTHLY: { min: 1200, max: 2500, points: "M0,80 Q20,60 40,70 T80,30 L100,20" },
      YEARLY: { min: 800, max: 3000, points: "M0,50 Q20,20 40,90 T80,40 L100,60" }
    },
    Potato: {
      WEEKLY: { min: 900, max: 1500, points: "M0,50 Q30,60 50,40 T90,70 L100,60" },
      MONTHLY: { min: 800, max: 1800, points: "M0,60 Q30,40 50,80 T90,30 L100,20" },
      YEARLY: { min: 500, max: 2200, points: "M0,80 Q30,20 50,90 T90,10 L100,40" }
    },
    Soybean: {
      WEEKLY: { min: 3800, max: 4600, points: "M0,20 Q25,30 50,10 T80,40 L100,25" },
      MONTHLY: { min: 3500, max: 5000, points: "M0,30 Q25,10 50,50 T80,20 L100,40" },
      YEARLY: { min: 3000, max: 6000, points: "M0,40 Q25,80 50,20 T80,70 L100,30" }
    },
    Cotton: {
      WEEKLY: { min: 6200, max: 7000, points: "M0,80 Q20,60 40,70 T80,30 L100,20" },
      MONTHLY: { min: 6000, max: 7500, points: "M0,70 Q20,30 40,80 T80,20 L100,10" },
      YEARLY: { min: 5500, max: 8000, points: "M0,50 Q20,90 40,10 T80,80 L100,40" }
    }
  };

  const currentData = dataStore[selectedCrop][timeframe];

  const getLabels = () => {
    if (timeframe === "WEEKLY") return ["Mon", "Wed", "Fri", "Sun", "Next Tue"];
    if (timeframe === "MONTHLY") return ["Week 1", "Week 2", "Week 3", "Week 4", "Next M"];
    return ["Jan", "Apr", "Jul", "Oct", "Dec"];
  };

  const labels = getLabels();

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 text-gray-900">
          <ArrowRight size={18} className="transform -rotate-45 text-emerald-600" />
          <h3 className="font-bold">Market Price Forecast</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Timeframe Toggles */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {["WEEKLY", "MONTHLY", "YEARLY"].map(tf => (
              <button 
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`text-[10px] font-bold px-2 py-1 rounded cursor-pointer transition-colors ${
                  timeframe === tf ? "bg-white shadow-sm text-emerald-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tf.charAt(0) + tf.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <select 
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {Object.keys(dataStore).map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Mock Chart Area */}
      <div className="relative h-48 w-full mb-4 border-l border-b border-gray-200 mt-6">
        {/* Y Axis Labels */}
        <div className="absolute -left-8 bottom-0 text-[10px] text-gray-400">{currentData.min}</div>
        <div className="absolute -left-8 bottom-1/4 text-[10px] text-gray-400">{Math.round(currentData.min + (currentData.max - currentData.min) * 0.25)}</div>
        <div className="absolute -left-8 bottom-2/4 text-[10px] text-gray-400">{Math.round(currentData.min + (currentData.max - currentData.min) * 0.5)}</div>
        <div className="absolute -left-8 bottom-3/4 text-[10px] text-gray-400">{Math.round(currentData.min + (currentData.max - currentData.min) * 0.75)}</div>
        <div className="absolute -left-8 top-0 text-[10px] text-gray-400">{currentData.max}</div>

        {/* Grid lines */}
        <div className="absolute w-full h-px bg-gray-100 bottom-1/4"></div>
        <div className="absolute w-full h-px bg-gray-100 bottom-2/4"></div>
        <div className="absolute w-full h-px bg-gray-100 bottom-3/4"></div>
        <div className="absolute w-full h-px bg-gray-100 top-0"></div>

        {/* X Axis Labels */}
        <div className="absolute -bottom-5 left-[5%] text-[10px] text-gray-400">{labels[0]}</div>
        <div className="absolute -bottom-5 left-[25%] text-[10px] text-gray-400">{labels[1]}</div>
        <div className="absolute -bottom-5 left-[50%] text-[10px] text-gray-400">{labels[2]}</div>
        <div className="absolute -bottom-5 left-[75%] text-[10px] text-gray-400">{labels[3]}</div>
        <div className="absolute -bottom-5 right-0 text-[10px] text-gray-400">{labels[4]}</div>

        {/* SVG Mock Line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path 
            d={currentData.points} 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="2.5" 
            vectorEffect="non-scaling-stroke" 
          />
          {/* Subtle Area Fill under the line */}
          <path 
            d={`${currentData.points} L100,100 L0,100 Z`} 
            fill="url(#grad)" 
            stroke="none" 
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <button className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1 mt-6 cursor-pointer">
        View Detailed AI Report <ArrowRight size={12} />
      </button>
    </div>
  );
}
