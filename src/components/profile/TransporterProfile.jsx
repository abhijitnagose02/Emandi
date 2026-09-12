import React from 'react';
import { ShieldCheck, MapPin, Truck, MessageSquare, Star, ArrowRight, Info } from '../Icons';
import { useEMandi } from '../../context/EMandiContext';

export default function TransporterProfile({ profile }) {
  const { currentUser, setActiveTab, setActiveProfile, sharedTrips } = useEMandi();

  const handleAction = () => {
    setActiveProfile(null);
    if (currentUser.role === 'Farmer') {
      setActiveTab('transport');
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative">
        {/* Cover Photo */}
        <div className="h-32 sm:h-48 w-full bg-slate-800 relative">
          <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&auto=format&fit=crop&q=80" alt="Transporter Cover" className="w-full h-full object-cover opacity-80" />
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
                    Book Transport
                  </button>
                  <button className="px-5 py-2 bg-white border-2 border-emerald-600 hover:bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                    <MessageSquare size={16} /> Contact
                  </button>
                </>
              ) : currentUser.role === 'Transporter' ? (
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
              <span className="text-sm font-bold text-gray-500 hidden sm:block">({profile.driverName})</span>
              {profile.isVerified && <ShieldCheck size={22} className="text-blue-500" />}
            </div>
            <span className="text-sm font-bold text-gray-500 block sm:hidden mb-2">({profile.driverName})</span>
            
            <p className="text-sm font-medium text-gray-800 max-w-2xl leading-relaxed mb-3">
              {profile.about}
            </p>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-500 mb-5">
              <span className="flex items-center gap-1"><MapPin size={14} /> {profile.location}</span>
              <span className="flex items-center gap-1 font-semibold text-gray-700"><Star size={14} className="text-amber-400 fill-current" /> {profile.rating} ({profile.reviewsCount} reviews)</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded font-semibold text-gray-700">{profile.experience} Exp.</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded font-semibold text-gray-700">Fleet: {profile.fleetSize}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {profile.operatingRoutes.map((route, i) => (
                <span key={i} className="px-3 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded-full text-[11px] font-bold">
                  {route}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-semibold mb-1">Total Trips</div>
              <div className="text-2xl font-black text-gray-900">{profile.stats.totalTrips}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-semibold mb-1">Total Capacity Moved</div>
              <div className="text-xl font-black text-emerald-600 mt-1">{profile.stats.capacityDelivered}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-semibold mb-1">On-Time Delivery</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">{profile.stats.onTimeDelivery}</div>
            </div>
          </div>

          {/* Active Trips for Shared Logistics Model */}
          {currentUser.role === 'Farmer' && (
            <div className="bg-white rounded-2xl p-6 border border-emerald-500/30 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">e-Mandi Shared Logistics</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-lg">
                <Truck className="text-emerald-600" size={20} /> Available Transport Trips
              </h3>
              <p className="text-xs text-gray-500 mb-6 max-w-lg">Transparent shared loading. Split the fare with other farmers on the same route based on your loaded weight.</p>
              
              <div className="space-y-4">
                {profile.availableTrips.map((trip, idx) => {
                  const currentSharedLoad = 600; // Mock current load
                  const maxCapacity = 1000;
                  return (
                    <div key={idx} className="border-2 border-gray-100 rounded-xl p-5 hover:border-emerald-300 transition-colors bg-gray-50/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gray-200 gap-4">
                        <div>
                          <div className="font-black text-gray-900 text-lg tracking-tight">{trip.route}</div>
                          <div className="text-xs font-semibold text-gray-500 mt-1 flex items-center gap-2">
                            <span>Vehicle: <span className="text-gray-800">{trip.vehicle}</span></span>
                            <span>•</span>
                            <span>Status: <span className="text-emerald-600">{trip.status}</span></span>
                          </div>
                        </div>
                        <div className="text-right sm:text-right">
                          <div className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Trip Fare (Total Cost)</div>
                          <div className="text-2xl font-black text-gray-900">₹{trip.estimatedFare.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-gray-600">Departure:</span>
                            <span className="font-bold text-gray-900">{trip.departure}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-gray-600">Booking Closes:</span>
                            <span className="font-bold text-red-600">{trip.bookingCloses}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-gray-600">Current Farmers:</span>
                            <span className="font-bold text-gray-900">{trip.currentFarmers}</span>
                          </div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm relative">
                          <div className="text-xs font-semibold text-gray-500 mb-2 flex justify-between">
                            <span>Current Shared Load:</span>
                            <span className="text-gray-900 font-bold">{currentSharedLoad} / {maxCapacity} KG</span>
                          </div>
                          
                          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3 overflow-hidden">
                            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${(currentSharedLoad/maxCapacity)*100}%` }}></div>
                          </div>
                          
                          <div className="flex items-start gap-2 text-[10px] text-gray-600 bg-emerald-50 p-2 rounded">
                            <Info size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-emerald-800 block mb-0.5">Estimated Farmer Share: Based on booked quantity.</span>
                              Your final share depends on the total confirmed load. Maximum possible cost if you are the only farmer: ₹{trip.estimatedFare.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex justify-end gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          View Trip Details
                        </button>
                        <button onClick={handleAction} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2">
                          Join Trip <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
                <span className="text-gray-600">Vehicle Verified</span>
                {profile.verification.vehicle ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Route History</span>
                {profile.verification.routeHistory ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Delivery History</span>
                {profile.verification.deliveryHistory ? <ShieldCheck size={18} className="text-blue-500" /> : <span className="text-gray-300">-</span>}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
