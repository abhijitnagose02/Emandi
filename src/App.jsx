import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import { FarmLinkProvider, useFarmLink } from './context/FarmLinkContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import FarmerDashboard from './components/farmer/FarmerDashboard';
import BuyerDashboard from './components/buyer/BuyerDashboard';
import TransporterDashboard from './components/transporter/TransporterDashboard';

function MainMarketplaceApp() {
  const { currentUser } = useFarmLink();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased selection:bg-emerald-500 selection:text-white pb-20">
      {/* Role-Aware Navigation Bar */}
      <Navbar />

      {/* Main Role-Specific Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentUser.role === 'Farmer' && <FarmerDashboard />}
        {currentUser.role === 'Buyer' && <BuyerDashboard />}
        {currentUser.role === 'Transporter' && <TransporterDashboard />}
        {currentUser.role === 'NGO' && <FarmerDashboard />}
      </main>

      {/* Floating Role-Aware Smart Assistant */}
      <Chatbot />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <FarmLinkProvider initialUser={user} onLogout={handleLogout}>
      <MainMarketplaceApp />
    </FarmLinkProvider>
  );
}
