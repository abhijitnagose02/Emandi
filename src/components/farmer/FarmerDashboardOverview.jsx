import React, { useState } from 'react';
import { Sparkles, DollarSign, Package, ArrowRight, ShieldCheck, Users } from '../Icons';
import ForecastChart from '../ForecastChart';
import AIWeatherForecast from './AIWeatherForecast';
import HelpButton from '../education/HelpButton';

export default function FarmerDashboardOverview({ setActiveTab, setShowCreateModal }) {
  const [marketTab, setMarketTab] = useState("gainers");
  const [marketType, setMarketType] = useState("spot");

  return (
    <div className="space-y-6">
      {/* Ticker */}
      <div className="bg-emerald-600 text-white py-2 px-4 rounded-xl overflow-hidden flex items-center relative shadow-sm">
        <div className="bg-emerald-700 px-3 py-1 rounded text-xs font-bold mr-4 z-10 whitespace-nowrap flex items-center gap-1.5 shrink-0">
          <Sparkles size={14} /> e-Mandi Updates
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
                <h2 className="text-2xl font-extrabold tracking-tight">e-Mandi DSS</h2>
                <HelpButton tutorialId="ai_features" />
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
                  Open Market
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
                  <div 
                    onClick={() => setMarketTab("gainers")}
                    className={`w-1/2 text-center py-3 border-b-2 text-xs cursor-pointer ${marketTab === "gainers" ? "border-emerald-500 text-emerald-700 font-bold bg-white" : "border-transparent text-gray-500 font-semibold hover:bg-gray-50"}`}
                  >
                    Top Gainers
                  </div>
                  <div 
                    onClick={() => setMarketTab("losers")}
                    className={`w-1/2 text-center py-3 border-b-2 text-xs cursor-pointer ${marketTab === "losers" ? "border-emerald-500 text-emerald-700 font-bold bg-white" : "border-transparent text-gray-500 font-semibold hover:bg-gray-50"}`}
                  >
                    Top Losers
                  </div>
                </div>
                <div className="p-4 bg-gray-50/30">
                   <div className="flex bg-gray-100 p-1 rounded-lg mb-4 text-xs font-semibold cursor-pointer">
                     <div 
                       onClick={() => setMarketType("spot")}
                       className={`w-1/2 text-center py-1.5 rounded transition-all ${marketType === "spot" ? "bg-white shadow-sm text-gray-800" : "text-gray-500"}`}
                     >
                       {marketType === "spot" && "✓ "}Spot
                     </div>
                     <div 
                       onClick={() => setMarketType("futures")}
                       className={`w-1/2 text-center py-1.5 rounded transition-all ${marketType === "futures" ? "bg-white shadow-sm text-gray-800" : "text-gray-500"}`}
                     >
                       {marketType === "futures" && "✓ "}Futures
                     </div>
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
                       {marketTab === "gainers" && marketType === "spot" && (
                         <>
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
                         </>
                       )}
                       {marketTab === "gainers" && marketType === "futures" && (
                         <>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Guar Seed - NCDEX</td>
                             <td className="py-2.5 text-right font-medium">5400.00</td>
                             <td className="py-2.5 text-right font-bold text-emerald-600">+2.10</td>
                           </tr>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Chana - NCDEX</td>
                             <td className="py-2.5 text-right font-medium">4820.00</td>
                             <td className="py-2.5 text-right font-bold text-emerald-600">+1.25</td>
                           </tr>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> RM Seed - NCDEX</td>
                             <td className="py-2.5 text-right font-medium">6100.00</td>
                             <td className="py-2.5 text-right font-bold text-emerald-600">+0.88</td>
                           </tr>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Castor - NCDEX</td>
                             <td className="py-2.5 text-right font-medium">5890.00</td>
                             <td className="py-2.5 text-right font-bold text-emerald-600">+0.45</td>
                           </tr>
                         </>
                       )}
                       {marketTab === "losers" && marketType === "spot" && (
                         <>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Garlic - Mandsaur</td>
                             <td className="py-2.5 text-right font-medium">9200.00</td>
                             <td className="py-2.5 text-right font-bold text-red-500">-2.34</td>
                           </tr>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Mustard - Jaipur</td>
                             <td className="py-2.5 text-right font-medium">5750.00</td>
                             <td className="py-2.5 text-right font-bold text-red-500">-1.12</td>
                           </tr>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Wheat - Delhi</td>
                             <td className="py-2.5 text-right font-medium">2450.00</td>
                             <td className="py-2.5 text-right font-bold text-red-500">-0.85</td>
                           </tr>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Maize - Gulabbagh</td>
                             <td className="py-2.5 text-right font-medium">1890.00</td>
                             <td className="py-2.5 text-right font-bold text-red-500">-0.41</td>
                           </tr>
                         </>
                       )}
                       {marketTab === "losers" && marketType === "futures" && (
                         <>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Turmeric - NCDEX</td>
                             <td className="py-2.5 text-right font-medium">14200.00</td>
                             <td className="py-2.5 text-right font-bold text-red-500">-3.15</td>
                           </tr>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Coriander - NCDEX</td>
                             <td className="py-2.5 text-right font-medium">6800.00</td>
                             <td className="py-2.5 text-right font-bold text-red-500">-1.90</td>
                           </tr>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Jeera - NCDEX</td>
                             <td className="py-2.5 text-right font-medium">27500.00</td>
                             <td className="py-2.5 text-right font-bold text-red-500">-1.20</td>
                           </tr>
                           <tr>
                             <td className="py-2.5 font-semibold text-gray-700 flex items-center gap-1"><Package size={12}/> Mentha Oil - MCX</td>
                             <td className="py-2.5 text-right font-medium">925.00</td>
                             <td className="py-2.5 text-right font-bold text-red-500">-0.55</td>
                           </tr>
                         </>
                       )}
                     </tbody>
                   </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chart & Buttons */}
        <div className="space-y-6">
          
          {/* 7-Day Forecast Chart Card (Aligns with DSS) */}
          <ForecastChart />
          
          {/* AI Weather Forecast Widget (Aligns with Market Snapshot) */}
          <AIWeatherForecast />
        </div>
      </div>
    </div>
  );
}
