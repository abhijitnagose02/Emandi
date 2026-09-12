import React, { useState } from 'react';
import { useEMandi } from '../context/EMandiContext';
import { 
  Tractor, Users, Truck, Bell, LogOut, ChevronDown, 
  MapPin, ShieldCheck, CheckCircle2, MessageSquare, AlertCircle
} from './Icons';

export default function Navbar() {
  const { currentUser, switchRole, activeTab, setActiveTab, notifications, onLogout, MOCK_PROFILES, setShowSettings } = useEMandi();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const myProfile = MOCK_PROFILES?.find(p => p.role === currentUser.role);

  const roleNavigation = {
    Farmer: [
      { id: "dashboard", label: "Overview" },
      { id: "listings", label: "Add & Manage Produce" },
      { id: "negotiations", label: "Active Deals" },
      { id: "transport", label: "Arrange Transport" }
    ],
    Buyer: [
      { id: "dashboard", label: "Overview" },
      { id: "marketplace", label: "Marketplace" },
      { id: "negotiations", label: "Active Deals" },
      { id: "orders", label: "Track Purchases" }
    ],
    Transporter: [
      { id: "requests", label: "Find Deals" },
      { id: "trips", label: "Active Trips & Pooling" }
    ],
    NGO: [
      { id: "dashboard", label: "Overview" },
      { id: "marketplace", label: "Cluster Produce" }
    ]
  };

  const navItems = roleNavigation[currentUser.role] || roleNavigation.Farmer;

  const roleConfig = {
    Farmer: { icon: Tractor, color: "text-emerald-700 bg-emerald-100 border-emerald-300" },
    Buyer: { icon: Users, color: "text-emerald-700 bg-emerald-100 border-emerald-300" },
    Transporter: { icon: Truck, color: "text-emerald-700 bg-emerald-100 border-emerald-300" },
    NGO: { icon: Users, color: "text-emerald-700 bg-emerald-100 border-emerald-300" }
  };

  const CurrentRoleIcon = roleConfig[currentUser.role]?.icon || Tractor;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab(navItems[0].id)}>
              <img src="/logo.jpg" alt="e-mandi Logo" className="w-12 h-12 rounded-full object-cover shadow-sm border border-emerald-100" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-emerald-800">e-mandi</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">e-Mandi</span>
                </div>
                <p className="text-[11px] text-gray-500 hidden sm:block">Connecting Farmers to Better Markets</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? "bg-emerald-50 text-emerald-800 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-all shadow-2xs ${roleConfig[currentUser.role]?.color}`}
              >
                <CurrentRoleIcon size={16} />
                <span>{currentUser.role}: {(currentUser?.name || currentUser?.role || 'User').split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-left">
                  <div className="px-3 py-1.5 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Switch Active Role
                  </div>
                  <button
                    onClick={() => { switchRole("Farmer"); setShowRoleMenu(false); }}
                    className="w-full px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-gray-50 cursor-pointer text-gray-700"
                  >
                    <Tractor size={16} className="text-emerald-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">Farmer (Suresh Patil)</div>
                      <div className="text-[10px] text-gray-500">Katol Farm, Nagpur</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { switchRole("Buyer"); setShowRoleMenu(false); }}
                    className="w-full px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-gray-50 cursor-pointer text-gray-700"
                  >
                    <Users size={16} className="text-emerald-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">Buyer (FreshDirect)</div>
                      <div className="text-[10px] text-gray-500">Central Yard, Nagpur</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { switchRole("Transporter"); setShowRoleMenu(false); }}
                    className="w-full px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-gray-50 cursor-pointer text-gray-700"
                  >
                    <Truck size={16} className="text-emerald-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">Transporter (Ramesh Logix)</div>
                      <div className="text-[10px] text-gray-500">Eicher 2.5T (MH-31)</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* My Profile Button */}
            {myProfile && (
              <button
                onClick={() => setShowSettings(true)}
                className="w-8 h-8 rounded-full border-2 border-emerald-100 overflow-hidden hover:border-emerald-500 transition-colors cursor-pointer"
                title="View Settings & Profile"
              >
                <img src={myProfile.photo} alt="My Profile" className="w-full h-full object-cover" />
              </button>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 relative cursor-pointer"
                title="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 z-50 text-left">
                  <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-800">Activity & Alerts</span>
                    <span className="text-[11px] text-emerald-600 font-semibold">{notifications.length} updates</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                    {notifications.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => {
                          if (currentUser.role !== n.role) {
                            switchRole(n.role);
                          }
                          setActiveTab('negotiations');
                          setShowNotifs(false);
                        }}
                        className="p-3 hover:bg-emerald-50 cursor-pointer text-xs transition-colors"
                      >
                        <div className="font-semibold text-gray-800 flex items-center justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-gray-400">{n.time}</span>
                        </div>
                        <p className="text-gray-600 mt-0.5">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button (Returns to original Login Page) */}
            <button
              onClick={onLogout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
              title="Logout & Return to Login Screen"
            >
              <LogOut size={19} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-2 border-t border-gray-100 no-scrollbar">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer ${
                activeTab === item.id
                  ? "bg-emerald-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
