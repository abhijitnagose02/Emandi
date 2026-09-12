import React from 'react';
import { ShieldCheck, MapPin, Package, MessageSquare, Star, ArrowRight } from '../Icons';
import { useEMandi } from '../../context/EMandiContext';

export default function BuyerProfile({ profile }) {
  const { currentUser, setActiveTab, setActiveProfile } = useEMandi();

  const handleAction = () => {
    setActiveProfile(null);
    if (currentUser.role === 'Farmer') {
      setActiveTab('negotiations');
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative">
        {/* Cover Photo */}
        <div className="h-32 sm:h-48 w-full bg-emerald-800 relative">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80" alt="Buyer Cover" className="w-full h-full object-cover opacity-80" />
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
              {currentUser.role === 'Farmer' ? (
                <>
                  <button onClick={handleAction} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-bold shadow-sm transition-colors cursor-pointer">
                    View Active Orders
                  </button>
                  <button className="px-5 py-2 bg-white border-2 border-emerald-600 hover:bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                    <MessageSquare size={16} /> Contact
                  </button>
                </>
              ) : currentUser.role === 'Buyer' ? (
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
              <span className="text-sm font-bold text-gray-500 hidden sm:block">({profile.businessName})</span>
              {profile.isVerified && <ShieldCheck size={22} className="text-blue-500" />}
            </div>
            <span className="text-sm font-bold text-gray-500 block sm:hidden mb-2">({profile.businessName})</span>
            
            <p className="text-sm font-medium text-gray-800 max-w-2xl leading-relaxed mb-3">
              {profile.about}
            </p>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-500 mb-5">
              <span className="flex items-center gap-1"><MapPin size={14} /> {profile.location}</span>
              <span className="flex items-center gap-1 font-semibold text-gray-700"><Star size={14} className="text-amber-400 fill-current" /> {profile.rating} ({profile.reviewsCount} reviews)</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded font-semibold text-gray-700">{profile.buyerType}</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded font-semibold text-gray-700">{profile.businessType}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {profile.productsPurchased.map(product => (
                <span key={product} className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[11px] font-bold">
                  {product}
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
              <div className="text-xs text-gray-500 font-semibold mb-1">Qty Purchased</div>
              <div className="text-xl font-black text-emerald-600 mt-1">{profile.stats.quantityPurchased}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-semibold mb-1">Total Spending</div>
              <div className="text-xl font-black text-emerald-600 mt-1">{profile.stats.totalSpending}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-semibold mb-1">Deliveries Recv.</div>
              <div className="text-2xl font-black text-gray-900">{profile.stats.successfulDeliveries}</div>
            </div>
          </div>

          {/* Recent Purchases List */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Recent Purchase History</h3>
            <div className="space-y-3 text-sm">
              {profile.recentPurchases.map((purchase, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 gap-3">
                  <div>
                    <div className="font-bold text-gray-900 flex items-center gap-1"><Package size={14} className="text-emerald-600"/> {purchase.product}</div>
                    <div className="text-xs text-gray-500 mt-0.5">From Farmer: {purchase.farmer}</div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <div className="text-right">
                      <div className="text-gray-900">{purchase.quantity}</div>
                      <div className="text-gray-400">@ {purchase.price}</div>
                    </div>
                    <div className={`px-2 py-1 rounded font-bold ${purchase.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {purchase.status}
                    </div>
                  </div>
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
                <span className="text-gray-600">Business Verified</span>
                {profile.verification.business ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Contact Verified</span>
                {profile.verification.contact ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Purchase History</span>
                {profile.verification.purchaseHistory ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Payment History</span>
                {profile.verification.paymentHistory ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
