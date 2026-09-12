import React, { useState } from 'react';
import { useEMandi } from '../../context/EMandiContext';
import { 
  X, ShieldCheck, MapPin, Edit3, Settings, 
  Bell, Globe, Lock, User, Trash2, Power, 
  CheckCircle2, AlertCircle, ChevronDown, ChevronRight
} from '../Icons';

export default function MyProfileSettings() {
  const { 
    currentUser, 
    MOCK_PROFILES, 
    showSettings, 
    setShowSettings,
    userPreferences,
    setUserPreferences 
  } = useEMandi();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [localToast, setLocalToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setLocalToast({ message, type });
    setTimeout(() => setLocalToast(null), 3000);
  };


  // Use the mock profile matching the current role to get photo/details
  const profile = MOCK_PROFILES?.find(p => p.role === currentUser.role) || currentUser;
  
  // Local state for the Edit Form
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    phone: currentUser.phone || "+91 98765 43210",
    email: "user@example.com",
    location: currentUser.location || "Maharashtra",
  });

  console.log('showSettings:', showSettings);
  if (!showSettings) return null;

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setShowEditModal(false);
    // In a real app we would update currentUser context
  };

  const handleTogglePref = (category, key) => {
    setUserPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };

  const handlePrivacyChange = (visibility) => {
    setUserPreferences(prev => ({
      ...prev,
      privacy: { ...prev.privacy, profileVisibility: visibility }
    }));
  };

  const handleLanguageChange = (e) => {
    setUserPreferences(prev => ({
      ...prev,
      language: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-50 overflow-y-auto">
      {/* Floating Close Button */}
      <button 
        onClick={() => setShowSettings(false)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] p-2.5 bg-white/60 hover:bg-white backdrop-blur-md border border-gray-200 shadow-sm rounded-full text-gray-700 transition-all cursor-pointer hover:shadow-md hover:scale-105"
        title="Close Settings"
      >
        <X size={20} />
      </button>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
          <p className="text-gray-500 mt-1">Manage your private profile, security, and application preferences.</p>
        </div>

        {/* 1. MY PROFILE CARD */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6">
            <button 
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold transition-colors cursor-pointer"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative">
              <img src={profile.photo || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop"} alt="Profile" className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-sm border border-gray-100" />
              <div className="absolute -bottom-3 -right-3 bg-white p-1 rounded-full shadow-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <ShieldCheck size={18} />
                </div>
              </div>
            </div>

            <div className="flex-1 mt-2 sm:mt-0">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{editForm.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-600 mb-4">
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs uppercase tracking-wider">{currentUser.role}</span>
                <span className="flex items-center gap-1 text-blue-600"><ShieldCheck size={16}/> Verified Account</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-6">
                <div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Mobile Number</div>
                  <div className="font-semibold text-gray-800">{editForm.phone}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Email Address</div>
                  <div className="font-semibold text-gray-800">{editForm.email}</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Location</div>
                  <div className="font-semibold text-gray-800 flex items-center gap-1"><MapPin size={14} className="text-gray-400"/> {editForm.location}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOCAL TOAST NOTIFICATION */}
        {localToast && (
          <div className={`fixed bottom-6 right-6 z-[200] px-6 py-3 rounded-xl shadow-xl font-bold flex items-center gap-2 transform transition-all translate-y-0 ${localToast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
            {localToast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            {localToast.message}
          </div>
        )}

        {/* 2. ROLE-SPECIFIC INFO CARD */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User size={20} className="text-emerald-600"/> {currentUser.role} Information
          </h3>
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            {currentUser.role === 'Farmer' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div><div className="text-xs text-gray-500 mb-1">Farm Size</div><div className="font-bold text-gray-800">{profile.farmSize || '3.5 Acres'}</div></div>
                <div><div className="text-xs text-gray-500 mb-1">Experience</div><div className="font-bold text-gray-800">{profile.experience || '8 Years'}</div></div>
                <div className="col-span-2"><div className="text-xs text-gray-500 mb-1">Main Crops</div><div className="font-bold text-gray-800">{profile.crops?.join(', ') || 'Onion, Tomato, Cotton'}</div></div>
              </div>
            )}
            {currentUser.role === 'Buyer' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2"><div className="text-xs text-gray-500 mb-1">Business Name</div><div className="font-bold text-gray-800">{profile.businessName || 'FreshDirect Procurement'}</div></div>
                <div className="col-span-2"><div className="text-xs text-gray-500 mb-1">Business Type</div><div className="font-bold text-gray-800">{profile.businessType || 'Wholesaler / Retail Chain'}</div></div>
              </div>
            )}
            {currentUser.role === 'Transporter' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2"><div className="text-xs text-gray-500 mb-1">Fleet Size</div><div className="font-bold text-gray-800">{profile.fleetSize || '5 Vehicles'}</div></div>
                <div className="col-span-2"><div className="text-xs text-gray-500 mb-1">Experience</div><div className="font-bold text-gray-800">{profile.experience || '12 Years'}</div></div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
            <AlertCircle size={12}/> This information is visible on your public e-Mandi Network profile.
          </p>
        </section>

        {/* 3. VERIFICATION & TRUST */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-600"/> Verification & Trust
            </h3>
            <div className="text-right">
              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">e-Mandi Trust Score</div>
              <div className="text-2xl font-black text-gray-900">{profile.trustScore || 92} <span className="text-sm font-medium text-gray-400">/ 100</span></div>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div>
                <div className="font-bold text-emerald-900">Mobile Number</div>
                <div className="text-xs text-emerald-600">{editForm.phone}</div>
              </div>
              <CheckCircle2 className="text-emerald-500" size={24} />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div>
                <div className="font-bold text-emerald-900">Email Address</div>
                <div className="text-xs text-emerald-600">{editForm.email}</div>
              </div>
              <CheckCircle2 className="text-emerald-500" size={24} />
            </div>

            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div>
                <div className="font-bold text-emerald-900">Identity (Aadhaar/KYC)</div>
                <div className="text-xs text-emerald-600">Verified on Jan 2026</div>
              </div>
              <CheckCircle2 className="text-emerald-500" size={24} />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div>
                <div className="font-bold text-gray-800">Bank Account</div>
                <div className="text-xs text-amber-600 flex items-center gap-1"><AlertCircle size={12}/> Pending Verification</div>
              </div>
              <button 
                onClick={() => setShowVerifyModal(true)}
                className="px-3 py-1 bg-white border border-gray-200 text-xs font-bold rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                Verify Now
              </button>
            </div>
          </div>
        </section>

        {/* 4. PREFERENCES (Language & Notifications) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Settings size={20} className="text-emerald-600"/> Language & Preferences
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <div>
                <div className="font-bold text-gray-800 flex items-center gap-2"><Globe size={16}/> Application Language</div>
                <div className="text-xs text-gray-500 mt-1">Select your preferred language for the UI</div>
              </div>
              <select 
                value={userPreferences.language}
                onChange={handleLanguageChange}
                className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 font-semibold cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी (Hindi)</option>
                <option value="Marathi">मराठी (Marathi)</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="font-bold text-gray-800 flex items-center gap-2"><Bell size={16}/> Push Notifications</div>
              
              {Object.entries(userPreferences.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <button 
                    onClick={() => handleTogglePref('notifications', key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${value ? 'bg-emerald-500' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PRIVACY & SECURITY */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock size={20} className="text-emerald-600"/> Privacy & Security
          </h3>

          <div className="space-y-6">
            <div>
              <div className="font-bold text-gray-800 mb-3">Profile Visibility</div>
              <div className="flex flex-wrap gap-3">
                {['Public', 'e-Mandi Users Only', 'Private'].map(vis => (
                  <button 
                    key={vis}
                    onClick={() => handlePrivacyChange(vis)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors cursor-pointer ${
                      userPreferences.privacy.profileVisibility === vis 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {vis}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Controls who can see your e-Mandi Network profile.</p>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="font-bold text-gray-800 mb-3">Contact Information Visibility</div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={userPreferences.privacy.showMobile} onChange={() => handleTogglePref('privacy', 'showMobile')} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">Show mobile number on public profile</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={userPreferences.privacy.showEmail} onChange={() => handleTogglePref('privacy', 'showEmail')} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">Show email address on public profile</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={userPreferences.privacy.showLocation} onChange={() => handleTogglePref('privacy', 'showLocation')} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">Show location on public profile</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-2"
              >
                Change Password <ChevronRight size={16} />
              </button>
              <button 
                onClick={() => setShowTwoFactorModal(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-2"
              >
                Manage Two-Factor Authentication <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* 6. ACCOUNT ACTIONS */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => showToast("Successfully logged out from 3 other active devices.", "success")}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              <Power size={18} /> Log out from all devices
            </button>
            <button 
              onClick={() => setShowDeactivateModal(true)}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 text-red-600 rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              <AlertCircle size={18} /> Deactivate Account
            </button>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-red-50 hover:bg-red-600 border border-red-100 hover:border-red-600 text-red-700 hover:text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              <Trash2 size={18} /> Delete Account
            </button>
          </div>
        </section>

        {/* SPACER FOR BOTTOM */}
        <div className="h-12"></div>
      </div>

      {/* EDIT MODAL OVERLAY */}
      {showEditModal && (
        <div className="fixed inset-0 z-[120] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Edit Personal Info</h3>
              <button onClick={() => setShowEditModal(false)} className="p-1.5 hover:bg-gray-200 rounded-full text-gray-500 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number</label>
                <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
                <input type="text" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium" />
              </div>
              
              <div className="pt-4 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-5 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VERIFY MODAL OVERLAY (MOCK) */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-[120] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Bank Account</h3>
            <p className="text-sm text-gray-500 mb-6">In a real app, this would open a secure KYC flow or OTP verification.</p>
            <button 
              onClick={() => {
                setShowVerifyModal(false);
                showToast("Bank account successfully verified (Mock)!", "success");
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer transition-colors"
            >
              Simulate Success
            </button>
          </div>
        </div>
      )}

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[120] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="p-1.5 hover:bg-gray-200 rounded-full text-gray-500 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium" />
              </div>
              <button 
                onClick={() => {
                  setShowPasswordModal(false);
                  showToast("Password updated successfully.", "success");
                }}
                className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA MODAL */}
      {showTwoFactorModal && (
        <div className="fixed inset-0 z-[120] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck size={24} className="text-blue-500"/> 2FA Settings
              </h3>
              <button onClick={() => setShowTwoFactorModal(false)} className="text-gray-400 hover:text-gray-700"><X size={20}/></button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Secure your account by requiring an extra authentication step.</p>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setShowTwoFactorModal(false);
                  showToast("SMS Authentication enabled.", "success");
                }}
                className="w-full px-4 py-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-xl text-sm font-bold text-gray-800 text-left cursor-pointer transition-colors"
              >
                Enable SMS Authentication
              </button>
              <button 
                onClick={() => {
                  setShowTwoFactorModal(false);
                  showToast("Authenticator App enabled.", "success");
                }}
                className="w-full px-4 py-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-xl text-sm font-bold text-gray-800 text-left cursor-pointer transition-colors"
              >
                Use Authenticator App
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEACTIVATE MODAL */}
      {showDeactivateModal && (
        <div className="fixed inset-0 z-[120] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Deactivate Account?</h3>
            <p className="text-sm text-gray-500 mb-6">Your profile and listings will be hidden, but you can reactivate at any time by logging in again.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeactivateModal(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold cursor-pointer transition-colors">Cancel</button>
              <button 
                onClick={() => {
                  setShowDeactivateModal(false);
                  showToast("Account deactivated successfully.", "success");
                }}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold cursor-pointer transition-colors"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[120] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account?</h3>
            <p className="text-sm text-gray-500 mb-6">This action is <span className="font-bold text-gray-800">permanent</span> and cannot be undone. All your data will be erased.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold cursor-pointer transition-colors">Cancel</button>
              <button 
                onClick={() => {
                  setShowDeleteModal(false);
                  showToast("Account deletion initiated.", "error");
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold cursor-pointer transition-colors"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
