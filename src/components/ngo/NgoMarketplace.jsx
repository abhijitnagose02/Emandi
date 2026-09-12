import React from 'react';
import { Package, MapPin, Tractor, Search, Filter, ArrowRight } from '../Icons';

export default function NgoMarketplace() {
  const clusterListings = [
    {
      id: 1,
      crop: "Wheat (Lokwan)",
      quantity: "500",
      unit: "Quintals",
      price: "2,850",
      farmersCount: 12,
      location: "Pipli Cluster",
      status: "Open for Bids",
      tags: ["Grade-A", "Ready to Dispatch"]
    },
    {
      id: 2,
      crop: "Soybean (Yellow)",
      quantity: "200",
      unit: "Quintals",
      price: "4,100",
      farmersCount: 5,
      location: "Kheri Cluster",
      status: "Negotiating",
      tags: ["High Oil Content"]
    },
    {
      id: 3,
      crop: "Onion (Red)",
      quantity: "150",
      unit: "Quintals",
      price: "1,250",
      farmersCount: 8,
      location: "Sonipat Cluster",
      status: "Open for Bids",
      tags: ["Export Quality"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Cluster Produce</h1>
          <p className="text-sm text-gray-500 mt-1">Manage bulk listings aggregated from farmers in your NGO network.</p>
        </div>
        
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2">
          <Package size={16} />
          <span>Create Bulk Listing</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by crop, cluster, or ID..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shrink-0">
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {clusterListings.map(listing => (
          <div key={listing.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all group flex flex-col h-full">
            <div className="p-5 flex-1 border-b border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-100">
                  <Package size={12} /> {listing.status}
                </div>
                <div className="text-xs font-bold text-gray-400">#{listing.id}</div>
              </div>
              
              <h3 className="text-xl font-black text-gray-900 tracking-tight mb-1">{listing.crop}</h3>
              
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 font-medium">
                <MapPin size={12} className="text-gray-400" />
                {listing.location}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {listing.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">Aggregated Qty</div>
                  <div className="font-bold text-gray-900">{listing.quantity} <span className="text-xs text-gray-500 font-medium">{listing.unit}</span></div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">Target Price</div>
                  <div className="font-black text-emerald-600">₹{listing.price}<span className="text-xs text-gray-500 font-medium">/{listing.unit}</span></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50/50 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                <Tractor size={14} className="text-emerald-500" />
                {listing.farmersCount} Farmers in Pool
              </div>
              <button className="text-emerald-600 font-bold text-xs hover:text-emerald-700 flex items-center gap-1 cursor-pointer">
                Manage <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
