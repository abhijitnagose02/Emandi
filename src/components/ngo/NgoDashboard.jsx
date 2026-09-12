import React from 'react';
import { useEMandi } from '../../context/EMandiContext';
import NgoDashboardOverview from './NgoDashboardOverview';
import NgoMarketplace from './NgoMarketplace';

export default function NgoDashboard() {
  const { activeTab } = useEMandi();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {activeTab === "dashboard" && <NgoDashboardOverview />}
      {activeTab === "marketplace" && <NgoMarketplace />}
    </div>
  );
}
