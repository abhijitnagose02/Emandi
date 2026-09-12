import React from 'react';
import { useEMandi } from '../../context/EMandiContext';
import { ShieldCheck, MapPin, Search, Tractor, Users, Truck, ArrowRight, X } from '../Icons';

export default function EMandiNetwork() {
  const { MOCK_PROFILES, setActiveProfile, currentUser, setShowSettings } = useEMandi();

  const getRoleIcon = (role) => {
    if (role === 'Farmer') return <Tractor size={14} className="text-emerald-700" />;
    if (role === 'Buyer') return <Users size={14} className="text-emerald-700" />;
    if (role === 'Transporter') return <Truck size={14} className="text-emerald-700" />;
    return <Users size={14} />;
  };

  const getRoleDetails = (p) => {
    if (p.role === 'Farmer') {
      return (
        <>
          <div className="text-xs text-gray-500 mb-2 flex flex-wrap gap-1">
            {p.mainCrops.map(c => <span key={c} className="bg-gray-100 px-1.5 py-0.5 rounded">🌾 {c}</span>)}
          </div>
          <div className="flex gap-4 text-xs font-semibold text-gray-700">
            <span>⭐ {p.rating}</span>
            <span>📦 {p.stats.totalOrders} Orders</span>
          </div>
        </>
      );
    }
    if (p.role === 'Buyer') {
      return (
        <>
          <div className="text-xs text-gray-500 mb-2 font-medium">{p.buyerType}</div>
          <div className="flex gap-4 text-xs font-semibold text-gray-700">
            <span>⭐ {p.rating}</span>
            <span>📦 {p.stats.totalOrders} Purchases</span>
          </div>
        </>
      );
    }
    if (p.role === 'Transporter') {
      return (
        <>
          <div className="text-xs text-gray-500 mb-2 font-medium">{p.fleetSize} ({p.experience})</div>
          <div className="flex gap-4 text-xs font-semibold text-gray-700">
            <span>⭐ {p.rating}</span>
            <span>🚚 {p.stats.totalTrips} Trips</span>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">People on e-Mandi</h1>
        <p className="text-emerald-100 max-w-xl text-sm">
          Discover and connect with verified Farmers, Buyers, and Transporters in our trusted agricultural ecosystem. 
          Your digital trust record guarantees safe commerce.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROFILES.map(profile => (
          <div key={profile.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group">
            <div className="p-5 flex gap-4">
              <img src={profile.photo} alt={profile.name} className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-white" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{profile.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5 mb-1">
                      {profile.isVerified && <ShieldCheck size={14} className="text-blue-500" />}
                      <span className="text-[11px] font-bold text-blue-600">Verified {profile.role}</span>
                    </div>
                  </div>
                  <div className="p-1.5 bg-emerald-50 rounded-lg">
                    {getRoleIcon(profile.role)}
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={12} /> {profile.location}
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50/50 border-t border-b border-gray-100">
              {getRoleDetails(profile)}
            </div>
            <div className="p-4">
              <button 
                onClick={() => {
                  if (profile.role === currentUser.role) {
                    setShowSettings(true);
                  } else {
                    setActiveProfile(profile);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 hover:border-emerald-500 hover:text-emerald-700 text-gray-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                View Profile <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
