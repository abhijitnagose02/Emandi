import React from 'react';
import { Sparkles, DollarSign, Package, ArrowRight, ShieldCheck, Users } from '../Icons';
import ForecastChart from '../ForecastChart';

export default function FarmerDashboardOverview({ setActiveTab, setShowCreateModal }) {

  return (
    <div className="space-y-6">
      {/* Ticker */}
      <div className="bg-emerald-600 text-white py-2 px-4 rounded-xl overflow-hidden flex items-center relative shadow-sm">
        <div className="bg-emerald-700 px-3 py-1 rounded text-xs font-bold mr-4 z-10 whitespace-nowrap flex items-center gap-1.5 shrink-0">
          <Sparkles size={14} /> FarmLink Updates
        </div>
        <div className="overflow-hidden flex-1 relative h-5">
          <div className="animate-ticker text-sm whitespace-nowrap absolute left-0 top-0">
            Favorable monsoon forecasts boost crop yield predictions across central India. &nbsp;&nbsp;&nbsp;&nbsp; Global demand for soybean oil expected to surge. &nbsp;&nbsp;&nbsp;&nbsp; New logistics subsidies announced for FPOs in Maharashtra. &nbsp;&nbsp;&nbsp;&nbsp; Onion prices stabilize ahead of the upcoming Kharif season.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: DSS & Market Snapshot */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* DSS Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-emerald-800 mb-2">
                <div className="bg-emerald-100 p-1.5 rounded-lg">
                  <Sparkles size={24} />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight">FarmLink DSS</h2>
              </div>
              <p className="text-gray-500 italic text-sm mb-4">"India's first Produce Pricing & Logistics Engine"</p>
              <p className="text-gray-700 text-sm max-w-md mb-6 leading-relaxed">
                Get intelligent recommendations that translate complex market data, transit costs, and demand metrics into a simple action.
              </p>
              
              <div className="flex items-end justify-between mt-8">
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Demand Score</div>
                  <div className="text-5xl font-black text-emerald-500">82</div>
                </div>
                <button 
                  onClick={() => setActiveTab("negotiations")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Open DSS
                </button>
              </div>
            </div>
          </div>

          {/* Market Snapshot */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-600" />
              <h3 className="font-bold text-gray-900">Market Snapshot</h3>
            </div>
            <div className="flex flex-col md:flex-row">
              {/* Key Prices */}
              <div className="md:w-1/2 p-0 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="px-6 py-3 bg-gray-50/50 text-xs font-semibold text-gray-500 text-center border-b border-gray-100">
                  Key Prices
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-800 text-sm">Soybean</span>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600 text-sm">₹4,250 <span className="text-[10px]">↗1.2%</span></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-800 text-sm">Mustard Seed</span>
                    <div className="text-right">
                      <div className="font-bold text-red-500 text-sm">₹5,800 <span className="text-[10px]">↘0.6%</span></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-800 text-sm">Red Onion</span>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600 text-sm">₹2,800 <span className="text-[10px]">↗2.4%</span></div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 text-xs">
                  <span className="text-emerald-600 font-semibold hover:underline cursor-pointer">View Charts ®</span>
                </div>
              </div>

              {/* Gainers / Losers */}
              <div className="md:w-1/2 p-0">
                <div className="flex border-b border-gray-100">
                  <div className="w-1/2 text-center py-3 border-b-2 border-emerald-500 text-emerald-700 font-bold text-xs bg-white">
                    Top Gainers
                  </div>
                  <div className="w-1/2 text-center py-3 text-gray-500 font-semibold text-xs hover:bg-gray-50 cursor-pointer">
                    Top Losers
                  </div>
                </div>
                <div className="p-4 bg-gray-50/30">
                   <div className="flex bg-gray-100 p-1 rounded-lg mb-4 text-xs font-semibold">
                     <div className="w-1/2 text-center py-1.5 bg-white shadow-sm rounded text-gray-800">✓ Spot</div>
                     <div className="w-1/2 text-center py-1.5 text-gray-500">Futures</div>
                   </div>

                   <table className="w-full text-xs">
                     <thead>
                       <tr className="text-gray-400 text-left">
                         <th className="font-medium pb-2">Crop</th>
                         <th className="font-medium pb-2 text-right">LTP</th>
                         <th className="font-medium pb-2 text-right">Change(%)</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                       <tr>
                         <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Tomato - Nashik</td>
                         <td className="py-2.5 text-right font-medium">1850.00</td>
                         <td className="py-2.5 text-right font-bold text-emerald-600">+1.51</td>
                       </tr>
                       <tr>
                         <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Potato - Agra</td>
                         <td className="py-2.5 text-right font-medium">1254.00</td>
                         <td className="py-2.5 text-right font-bold text-emerald-600">+0.77</td>
                       </tr>
                       <tr>
                         <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Soybean - Indore</td>
                         <td className="py-2.5 text-right font-medium">4395.00</td>
                         <td className="py-2.5 text-right font-bold text-emerald-600">+0.67</td>
                       </tr>
                       <tr>
                         <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Cotton - Rajkot</td>
                         <td className="py-2.5 text-right font-medium">6532.00</td>
                         <td className="py-2.5 text-right font-bold text-emerald-600">+0.17</td>
                       </tr>
                     </tbody>
                   </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chart & Buttons */}
        <div className="space-y-6">
          
          {/* 7-Day Forecast Chart Card */}
          <ForecastChart />

          {/* Large Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-transform hover:scale-[1.02] cursor-pointer shadow-sm min-h-[140px]"
            >
              <div className="p-2 border-2 border-emerald-400 rounded-lg">
                <ShieldCheck size={28} className="text-white" />
              </div>
              <span className="font-bold text-base">List Produce</span>
            </button>
            
            <button 
              onClick={() => setActiveTab("negotiations")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-transform hover:scale-[1.02] cursor-pointer shadow-sm min-h-[140px]"
            >
              <div className="p-2 border-2 border-emerald-300 rounded-lg">
                <Users size={28} className="text-white" />
              </div>
              <span className="font-bold text-base text-center leading-tight">Market Hub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
