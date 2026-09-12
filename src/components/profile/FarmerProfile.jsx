import React from 'react';
import { ShieldCheck, MapPin, Search, MessageSquare, Star, ArrowRight } from '../Icons';
import { useEMandi } from '../../context/EMandiContext';

export default function FarmerProfile({ profile }) {
  const { currentUser, setActiveTab, setActiveProfile } = useEMandi();

  const handleAction = () => {
    setActiveProfile(null);
    if (currentUser.role === 'Buyer') {
      setActiveTab('marketplace');
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative">
        {/* Cover Photo */}
        <div className="h-32 sm:h-48 w-full bg-emerald-700 relative">
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80" alt="Farm Cover" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <div className="-mt-12 sm:-mt-16 relative z-10 shrink-0">
              <img 
                src={profile.photo} 
                alt={profile.name} 
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-md bg-white" 
              />
            </div>
            
            {/* Dynamic Actions based on viewing user */}
            <div className="flex flex-wrap justify-end gap-2 mt-4 sm:mt-5">
              {currentUser.role === 'Buyer' ? (
                <>
                  <button onClick={handleAction} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-bold shadow-sm transition-colors cursor-pointer">
                    View Produce
                  </button>
                  <button className="px-5 py-2 bg-white border-2 border-emerald-600 hover:bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                    <MessageSquare size={16} /> Contact
                  </button>
                </>
              ) : currentUser.role === 'Farmer' ? (
                <button className="px-5 py-2 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 rounded-full text-sm font-bold shadow-sm transition-colors cursor-pointer">
                  Edit Profile
                </button>
              ) : (
                <button className="px-5 py-2 bg-white border-2 border-emerald-600 hover:bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <MessageSquare size={16} /> Contact
                </button>
              )}
            </div>
          </div>

          <div className="mt-1 sm:mt-2">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{profile.name}</h1>
              {profile.isVerified && <ShieldCheck size={22} className="text-blue-500" />}
            </div>
            
            <p className="text-sm font-medium text-gray-800 max-w-2xl leading-relaxed mb-3">
              {profile.about}
            </p>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-500 mb-5">
              <span className="flex items-center gap-1"><MapPin size={14} /> {profile.location}</span>
              <span className="flex items-center gap-1 font-semibold text-gray-700"><Star size={14} className="text-amber-400 fill-current" /> {profile.rating} ({profile.reviewsCount} reviews)</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded font-semibold text-gray-700">{profile.experience} Exp.</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded font-semibold text-gray-700">{profile.landArea}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {profile.mainCrops.map(crop => (
                <span key={crop} className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[11px] font-bold">
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-semibold mb-1">Total Orders</div>
              <div className="text-2xl font-black text-gray-900">{profile.stats.totalOrders}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-semibold mb-1">Quantity Sold</div>
              <div className="text-xl font-black text-emerald-600 mt-1">{profile.stats.quantitySold}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-semibold mb-1">Total Earnings</div>
              <div className="text-xl font-black text-emerald-600 mt-1">{profile.stats.totalEarnings}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-semibold mb-1">Deliveries</div>
              <div className="text-2xl font-black text-gray-900">{profile.stats.successfulDeliveries}</div>
            </div>
          </div>

          {/* Activity Pipeline */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Recent Activity Workflow</h3>
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-100 -z-10 -translate-y-1/2"></div>
              {['Listed', 'Buyer Ordered', 'Transport Selected', 'In Transit', 'Delivered'].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx === 4 ? 'bg-emerald-100 text-emerald-700 ring-4 ring-white' : 'bg-gray-100 text-gray-500'}`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[10px] font-bold text-center ${idx === 4 ? 'text-emerald-700' : 'text-gray-400'}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              Platform Reviews <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-semibold text-gray-500">{profile.reviews.length}</span>
            </h3>
            <div className="space-y-4">
              {profile.reviews.map((rev, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-gray-900">{rev.author}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < rev.rating ? "text-amber-400 fill-current" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">"{rev.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Trust & Verification</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Identity Verified</span>
                {profile.verification.identity ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Farm Details Verified</span>
                {profile.verification.farmDetails ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Product History</span>
                {profile.verification.productHistory ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Delivery History</span>
                {profile.verification.deliveryHistory ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-emerald-600">
              <Search size={20} />
            </div>
            <h4 className="font-bold text-emerald-900 mb-1">Looking for Produce?</h4>
            <p className="text-xs text-emerald-700 mb-4">Check {profile.name}'s active listings in the marketplace.</p>
            <button onClick={handleAction} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer">
              Browse Listings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
