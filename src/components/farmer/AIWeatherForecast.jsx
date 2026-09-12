import React from 'react';
import { Sparkles } from '../Icons';

function CloudRain({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </svg>
  );
}

function Sun({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function Cloud({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

export default function AIWeatherForecast() {
  const forecast = [
    { day: 'Today', temp: '29°C', icon: <Sun size={20} className="text-amber-500" />, desc: 'Sunny & Clear', aiNote: 'Ideal for harvesting' },
    { day: 'Tomorrow', temp: '27°C', icon: <Cloud size={20} className="text-gray-400" />, desc: 'Partly Cloudy', aiNote: 'Good for spraying' },
    { day: 'Wed', temp: '24°C', icon: <CloudRain size={20} className="text-blue-500" />, desc: 'Expected Showers', aiNote: 'Halt outdoor processing' },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-50 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-900">
            <div className="bg-emerald-100 p-1.5 rounded-lg border border-emerald-200">
              <Sparkles size={18} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-lg">AI Weather & Yield Forecast</h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
            Nagpur Region
          </span>
        </div>

        <div className="mb-4 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong className="text-emerald-800">AI Prediction:</strong> Heavy rainfall expected on Wednesday. We recommend harvesting mature Soybean crops by tomorrow evening to prevent moisture damage and preserve Grade A pricing.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {forecast.map((f, i) => (
            <div key={i} className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex flex-col items-center text-center">
              <span className="text-[11px] font-semibold text-gray-500 mb-1.5">{f.day}</span>
              <div className="bg-white p-1.5 rounded-full mb-1.5 shadow-sm border border-gray-100">
                {f.icon}
              </div>
              <span className="text-xl font-black text-gray-900">{f.temp}</span>
              <span className="text-[10px] text-gray-500 font-medium mt-1">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
