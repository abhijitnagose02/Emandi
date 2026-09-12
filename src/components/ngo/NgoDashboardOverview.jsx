import React from 'react';
import { Users, TrendingUp, AlertCircle, Tractor, ChevronRight, CheckCircle2 } from '../Icons';

export default function NgoDashboardOverview() {
  const metrics = [
    { label: "Farmers Assisted", value: "2,450", trend: "+12% this month", icon: Users, color: "emerald" },
    { label: "Active Clusters", value: "18", trend: "3 new formed", icon: Tractor, color: "blue" },
    { label: "Produce Sold (Tons)", value: "850", trend: "+45T this week", icon: TrendingUp, color: "emerald" },
  ];

  const farmersNeedingHelp = [
    { id: 1, name: "Ramesh Kumar", village: "Pipli", issue: "Needs help pricing Wheat", urgency: "High" },
    { id: 2, name: "Suresh Singh", village: "Kheri", issue: "Quality dispute with buyer", urgency: "Medium" },
    { id: 3, name: "Anita Devi", village: "Sonipat", issue: "Looking for transport pool", urgency: "Low" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-emerald-100 text-xs font-semibold mb-4 backdrop-blur-sm border border-white/10">
            <Users size={14} /> NGO Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
            Empowering Farmer Clusters
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-xl leading-relaxed">
            Monitor cluster performance, assist farmers with digital literacy on e-Mandi, and help negotiate bulk deals for better market rates.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-white/5 transform rotate-12">
          <Users size={250} />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((m, idx) => {
          const IconC = m.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl bg-${m.color}-50 text-${m.color}-600 group-hover:scale-110 transition-transform`}>
                  <IconC size={20} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-600`}>
                  {m.trend}
                </span>
              </div>
              <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{m.label}</h3>
              <p className="text-2xl font-black text-gray-900 tracking-tight">{m.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farmers Needing Assistance */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-gray-900 tracking-tight">Farmer Support Queue</h2>
              <p className="text-xs text-gray-500 mt-1">Farmers in your region requesting assistance.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {farmersNeedingHelp.map(farmer => (
              <div key={farmer.id} className="p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 bg-gray-50/50 hover:bg-emerald-50/30 transition-all cursor-pointer group flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertCircle size={18} className={farmer.urgency === 'High' ? 'text-red-500' : farmer.urgency === 'Medium' ? 'text-amber-500' : 'text-emerald-500'} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">{farmer.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{farmer.village} • {farmer.issue}</p>
                  </div>
                </div>
                <button className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  Assist <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Market Trends (Mock) */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-gray-900 tracking-tight">Market Intelligence</h2>
              <p className="text-xs text-gray-500 mt-1">Advise farmers based on real-time mandi prices.</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Trend Item */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Wheat (Lokwan)</h4>
                <p className="text-xs text-gray-500 mt-0.5">High demand in Pune Mandi</p>
              </div>
              <div className="text-right">
                <div className="font-black text-emerald-600">₹2,850/Qtl</div>
                <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 justify-end">
                  <TrendingUp size={10} /> +₹120 today
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Soybean (Yellow)</h4>
                <p className="text-xs text-gray-500 mt-0.5">Stable in Latur Mandi</p>
              </div>
              <div className="text-right">
                <div className="font-black text-gray-700">₹4,200/Qtl</div>
                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1 justify-end">
                  No change
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-2">
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Onion (Red)</h4>
                <p className="text-xs text-gray-500 mt-0.5">Price dropping in Nashik</p>
              </div>
              <div className="text-right">
                <div className="font-black text-red-600">₹1,200/Qtl</div>
                <div className="text-[10px] text-red-600 font-bold flex items-center gap-1 justify-end">
                  -₹300 today
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
