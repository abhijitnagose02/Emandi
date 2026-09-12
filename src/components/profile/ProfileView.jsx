import React from 'react';
import { useEMandi } from '../../context/EMandiContext';
import { X, ShieldCheck } from '../Icons';
import FarmerProfile from './FarmerProfile';
import BuyerProfile from './BuyerProfile';
import TransporterProfile from './TransporterProfile';

export default function ProfileView() {
  const { activeProfile, setActiveProfile } = useEMandi();

  if (!activeProfile) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gray-50 overflow-y-auto">
      {/* Floating Close Button */}
      <button 
        onClick={() => setActiveProfile(null)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] p-2.5 bg-white/60 hover:bg-white backdrop-blur-md border border-gray-200 shadow-sm rounded-full text-gray-700 transition-all cursor-pointer hover:shadow-md hover:scale-105"
        title="Close Profile"
      >
        <X size={20} />
      </button>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 pt-4 sm:pb-12 sm:pt-6">
        {activeProfile.role === 'Farmer' && <FarmerProfile profile={activeProfile} />}
        {activeProfile.role === 'Buyer' && <BuyerProfile profile={activeProfile} />}
        {activeProfile.role === 'Transporter' && <TransporterProfile profile={activeProfile} />}
      </div>
    </div>
  );
}
