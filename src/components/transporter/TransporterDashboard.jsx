import React, { useState } from 'react';
import { useEMandi } from '../../context/EMandiContext';
import EMandiNetwork from '../profile/EMandiNetwork';
import { 
  Truck, Package, MapPin, Clock, DollarSign, CheckCircle2, 
  AlertCircle, ArrowRight, ShieldCheck, Sparkles, Layers, Zap, Users, Plus
} from '../Icons';

export default function TransporterDashboard() {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    activeProfile,
    setActiveProfile,
    transporterJob, 
    acceptTransportJob, 
    confirmPickupStop, 
    confirmDeliveryAtDrop, 
    order,
    sharedTrips,
    createTransporterTrip,
    dedicatedRequests,
    acceptDedicatedTransport
  } = useEMandi();

  const [mockProofUploaded, setMockProofUploaded] = useState(false);
  const [newTripForm, setNewTripForm] = useState({
    route: "Chandrapur → Nagpur",
    vehicle: "Eicher Pro 2.5 Ton",
    capacity: 2000,
    departureDate: "16 Sep 2026",
    departureTime: "7:00 AM",
    bookingCloses: "15 Sep 2026, 9:00 PM",
    platformFare: 4500
  });

  const completedStops = transporterJob.pickupStops.filter(s => s.pickedUp).length;
  const totalStops = transporterJob.pickupStops.length;

  return (
    <div className="space-y-6">
      {/* Transporter Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
              <Truck size={16} />
              <span>Commercial Fleet Logistics • {transporterJob.vehicleNumber}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentUser.name}
            </h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              Maximize vehicle payload efficiency with smart multi-stop farm pickup routes and guaranteed prompt freight settlements.
            </p>
          </div>
          <div className="bg-emerald-800/40 p-3.5 rounded-2xl border border-emerald-400/30 text-right">
            <span className="text-xs text-emerald-200 block">Vehicle Specification</span>
            <span className="text-sm font-bold text-white">Eicher Pro 2.5 Ton (Payload 2,000 kg)</span>
          </div>
        </div>

        {/* Quick Transporter Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-700/50 text-center sm:text-left">
          <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/30">
            <span className="text-xs text-emerald-200">Open Requests</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-0.5">
              {transporterJob.status === "AVAILABLE" ? "1 High-Priority" : "0"}
            </div>
          </div>
          <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/30">
            <span className="text-xs text-emerald-200">Active Multi-Stop Trips</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {transporterJob.status !== "AVAILABLE" && transporterJob.status !== "COMPLETED" ? "1 Active" : "0"}
            </div>
          </div>
          <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/30">
            <span className="text-xs text-emerald-200">Farm Gate Pickups</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-0.5">
              {completedStops} / {totalStops} Done
            </div>
          </div>
          <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/30">
            <span className="text-xs text-emerald-200">Trip Earnings</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">
              ₹{transporterJob.payout.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Tab Navigation within Banner */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === "requests" ? "bg-white text-emerald-900" : "bg-emerald-800/60 text-emerald-100 hover:bg-emerald-700/60"}`}
          >
            Broker Requests
          </button>
          <button 
            onClick={() => setActiveTab("dedicated_requests")}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === "dedicated_requests" ? "bg-white text-emerald-900" : "bg-emerald-800/60 text-emerald-100 hover:bg-emerald-700/60"}`}
          >
            Dedicated Requests
          </button>
          <button 
            onClick={() => setActiveTab("trips")}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === "trips" ? "bg-white text-emerald-900" : "bg-emerald-800/60 text-emerald-100 hover:bg-emerald-700/60"}`}
          >
            Active Trips
          </button>
          <button 
            onClick={() => setActiveTab("shared")}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === "shared" ? "bg-white text-emerald-900" : "bg-emerald-800/60 text-emerald-100 hover:bg-emerald-700/60"}`}
          >
            <Users size={16} /> Shared Trips <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">NEW</span>
          </button>
          <button 
            onClick={() => setActiveTab("settlement")}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === "settlement" ? "bg-white text-emerald-900" : "bg-emerald-800/60 text-emerald-100 hover:bg-emerald-700/60"}`}
          >
            Settlements
          </button>
        </div>
      </div>

      {/* OPEN REQUESTS TAB */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Available Commercial Transport Requests</h2>
              <p className="text-xs text-gray-500">Automated freight dispatch matched to your route and vehicle capacity</p>
            </div>
          </div>
          {transporterJob.status === "AVAILABLE" && order?.deliveryMethod === "CONSOLIDATED" ? (
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="p-6 bg-gradient-to-r from-slate-900 to-emerald-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      REQUEST #{transporterJob.tripId}
                    </span>
                    <span className="text-xs font-bold bg-emerald-400 text-gray-900 px-2 py-0.5 rounded-full">
                      Consolidated 3-Farm Route
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold mt-1">
                    Nagpur Agri Corridor: 3 Pickups → Central Wholesale Market
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Payload: <strong className="text-white">1,500 boxes Alphonso Mango</strong> (Utilizes 75% of your 2,000 kg capacity)
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-semibold">GUARANTEED FREIGHT PAYOUT</span>
                  <span className="text-2xl font-black text-emerald-400">₹{transporterJob.payout.toLocaleString()}</span>
                </div>
              </div>

              {/* Stop By Stop Details */}
              <div className="p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Route Waypoints & Pickup Schedule</h4>
                <div className="space-y-2.5 text-xs">
                  {transporterJob.pickupStops.map((stop) => (
                    <div key={stop.stopIndex} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                          {stop.stopIndex}
                        </span>
                        <div>
                          <span className="font-bold text-gray-900">Stop {stop.stopIndex}: Nagpur Area Farm <span className="text-[10px] font-normal text-emerald-600 bg-emerald-50 px-1 rounded">(Hidden)</span></span>
                          <span className="text-gray-500 block text-[11px]">Load: {stop.produce}</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Ready at Farm Gate
                      </span>
                    </div>
                  ))}

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between font-bold text-emerald-900">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                        🏁
                      </span>
                      <span>Final Drop: Central Yard <span className="text-[10px] font-normal text-emerald-600 bg-emerald-100 px-1 rounded">(Hidden)</span></span>
                    </div>
                    <span>Recipient: FreshDirect Wholesale</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <ShieldCheck size={16} className="text-emerald-600" />
                    <span>Instant wallet disbursement guaranteed upon buyer electronic acceptance.</span>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      className="w-1/2 sm:w-auto px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => {
                        acceptTransportJob();
                        setActiveTab("trips");
                      }}
                      className="w-1/2 sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={16} />
                      <span>Accept Trip (Earn ₹{transporterJob.payout})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Trip Request Accepted & Active</h3>
              <p className="text-gray-500 text-xs mt-1">
                You have locked Trip #{transporterJob.tripId}. Go to "Active Trips" to manage multi-stop pickups.
              </p>
              <button
                onClick={() => setActiveTab("trips")}
                className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Go to Active Trip Screen →
              </button>
            </div>
          )}
        </div>
      )}

      {/* DEDICATED REQUESTS TAB */}
      {activeTab === "dedicated_requests" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Direct Farmer Dedicated Requests</h2>
              <p className="text-xs text-gray-500">Immediate dispatch requests directly from farmers needing dedicated vehicles</p>
            </div>
          </div>
          
          {transporterJob.status === "AVAILABLE" && order?.deliveryMethod === "IMMEDIATE" ? (
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow mb-4">
                <div className="p-6 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                        DEDICATED REQUEST
                      </span>
                      <span className="text-xs font-bold bg-blue-400 text-gray-900 px-2 py-0.5 rounded-full">
                        Direct Farm Route
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold mt-1 flex items-center gap-2">
                      {order.pickupLocation} → {order.dropLocation} <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">New Live Request</span>
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 flex flex-col gap-0.5">
                      <span>Payload: <strong className="text-white">{order.quantity} {order.unit} {order.crop}</strong> • Pick-up: <strong className="text-white text-emerald-300">{order.pickupLocation}</strong></span>
                      <span>Requested by: {order.farmer}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block font-semibold">GUARANTEED FREIGHT PAYOUT</span>
                    <span className="text-2xl font-black text-blue-400">₹{transporterJob.payout.toLocaleString()}</span>
                  </div>
                </div>
                <div className="p-4 bg-white flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => {
                      acceptTransportJob();
                      setActiveTab("trips");
                    }}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    <span>Accept Dedicated Trip</span>
                  </button>
                </div>
              </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 text-sm">No pending dedicated transport requests at the moment.</p>
            </div>
          )}
        </div>
      )}

      {/* ACTIVE TRIPS TAB (MULTI-STOP LOGISTICS) */}
      {activeTab === "trips" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Multi-Stop Consolidated Trip Execution</h2>
            <p className="text-xs text-gray-500">
              Trip #{transporterJob.tripId} • Status: <span className="font-bold text-emerald-700">{transporterJob.status}</span>
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-6">
            {/* Status Flow Indicator */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className={`p-3 rounded-xl border ${transporterJob.status !== "AVAILABLE" ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold" : "bg-gray-50 border-gray-200"}`}>
                <span>1. Trip Assigned</span>
                <p className="text-[10px] text-gray-500 font-normal">Vehicle dispatched</p>
              </div>
              <div className={`p-3 rounded-xl border ${completedStops > 0 ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold" : "bg-gray-50 border-gray-200"}`}>
                <span>2. Farm Pickups ({completedStops}/{totalStops})</span>
                <p className="text-[10px] text-gray-500 font-normal">Gate weighment verified</p>
              </div>
              <div className={`p-3 rounded-xl border ${transporterJob.status === "IN_TRANSIT" || transporterJob.status === "DELIVERED" || transporterJob.status === "COMPLETED" ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold" : "bg-gray-50 border-gray-200"}`}>
                <span>3. In Transit to Nagpur</span>
                <p className="text-[10px] text-gray-500 font-normal">Highway corridor</p>
              </div>
              <div className={`p-3 rounded-xl border ${transporterJob.status === "DELIVERED" || transporterJob.status === "COMPLETED" ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold" : "bg-gray-50 border-gray-200"}`}>
                <span>4. Delivered & Settled</span>
                <p className="text-[10px] text-gray-500 font-normal">Escrow released</p>
              </div>
            </div>

            {/* STOPS MANAGEMENT & LIVE MAP */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3 space-y-3">
                <h3 className="font-bold text-base text-gray-900">Farm Gate Loading Sequence</h3>
                {transporterJob.pickupStops.map((stop) => (
                  <div 
                    key={stop.stopIndex} 
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      stop.pickedUp ? "bg-emerald-50/60 border-emerald-200" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        stop.pickedUp ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {stop.pickedUp ? "✓" : stop.stopIndex}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">
                          Stop {stop.stopIndex}: {stop.location}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Cargo: <strong className="text-gray-800">{stop.produce}</strong>
                        </p>
                        {stop.pickedUp && (
                          <span className="text-[11px] text-emerald-700 font-medium">
                            ✓ Verified & loaded onto truck • Weight receipt logged
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      {!stop.pickedUp ? (
                        <button
                          onClick={() => confirmPickupStop(stop.stopIndex)}
                          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow-xs transition-colors whitespace-nowrap"
                        >
                          Confirm Farm Pickup
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                          Loaded
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* LIVE MAP */}
              <div className="lg:w-1/3 flex flex-col">
                <h3 className="font-bold text-base text-gray-900 mb-3">Live Navigation Route</h3>
                <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative min-h-[300px]">
                  <img src="/route_map.jpg" alt="Live Route Map" className="w-full h-full object-cover absolute inset-0" />
                  <div className="absolute top-2 left-2 right-2 flex justify-between gap-2 pointer-events-none">
                     <span className="bg-emerald-600/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                       <Sparkles size={12}/> Route Optimized
                     </span>
                     <span className="bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                       GPS Active
                     </span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-gray-200 shadow-lg flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-emerald-600"/> Next: Nagpur Yard</span>
                      <span className="text-emerald-700">12 km</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-medium mt-1">
                      <span>ETA: 45 mins</span>
                      <span>Traffic: Light</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CAPACITY & POOLING - WAITING PLAN */}
            {transporterJob.status !== "COMPLETED" && transporterJob.status !== "DELIVERED" && (
              <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                      <Layers size={18} className="text-emerald-600" />
                      Vehicle Capacity: 1,500 / 2,000 kg Used
                    </h4>
                    <p className="text-xs text-emerald-700 mt-1">
                      You have 500 kg of available payload space. Add smaller nearby loads along your route to maximize profit!
                    </p>
                  </div>
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer">
                    Scan Nearby Deals
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-xs">200 kg Tomatoes</div>
                      <div className="text-[10px] text-gray-500">Pick: Katol (+2km detour)</div>
                    </div>
                    <button className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded border border-emerald-200 cursor-pointer">
                      + Add (Earn ₹400)
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-xs">150 kg Potatoes</div>
                      <div className="text-[10px] text-gray-500">Pick: Kalmeshwar (On-route)</div>
                    </div>
                    <button className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded border border-emerald-200 cursor-pointer">
                      + Add (Earn ₹250)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* DESTINATION ARRIVAL & DROP CONFIRMATION */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Destination: {transporterJob.finalDrop}</h4>
                  <p className="text-xs text-gray-500">Recipient: FreshDirect Procurement Hub</p>
                </div>
                <span className="text-xs bg-gray-200 text-gray-800 font-bold px-2.5 py-1 rounded">
                  Consolidated Drop
                </span>
              </div>

              {completedStops === totalStops && transporterJob.status !== "DELIVERED" && transporterJob.status !== "COMPLETED" && (
                <div className="pt-2 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-gray-600">
                    All 3 farms loaded (1,500 kg total). Ready to confirm delivery at Nagpur Yard:
                  </div>
                  <button
                    onClick={confirmDeliveryAtDrop}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition-colors"
                  >
                    Confirm Delivery at Drop Location
                  </button>
                </div>
              )}

              {transporterJob.status === "DELIVERED" && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-xs flex items-center justify-between">
                  <span>Produce Delivered at Wholesale Yard! Awaiting Buyer Electronic Inspection.</span>
                  <span className="text-[11px] text-emerald-600 font-normal">Switch to Buyer role to complete</span>
                </div>
              )}

              {transporterJob.status === "COMPLETED" && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 font-bold text-xs flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-700" />
                  <span>Trip Successfully Completed! ₹{transporterJob.payout} credited to Transporter Account.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SHARED TRIPS TAB */}
      {activeTab === "shared" && (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Shared Transport Hub</h2>
              <p className="text-xs text-gray-500">Publish open trips on the marketplace and let farmers book available space.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Plus size={18} className="text-emerald-600" /> Publish New Trip
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Route</label>
                    <input type="text" value={newTripForm.route} onChange={e => setNewTripForm({...newTripForm, route: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Departure Date</label>
                      <input type="text" value={newTripForm.departureDate} onChange={e => setNewTripForm({...newTripForm, departureDate: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Departure Time</label>
                      <input type="text" value={newTripForm.departureTime} onChange={e => setNewTripForm({...newTripForm, departureTime: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Booking Deadline</label>
                    <input type="text" value={newTripForm.bookingCloses} onChange={e => setNewTripForm({...newTripForm, bookingCloses: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl mt-4">
                    <span className="text-xs text-emerald-800 font-bold flex justify-between items-center mb-1">
                      Platform Calculated Fare
                      <ShieldCheck size={14} className="text-emerald-600" />
                    </span>
                    <div className="text-2xl font-black text-emerald-900">₹{newTripForm.platformFare}</div>
                    <p className="text-[10px] text-emerald-700 mt-1">Based on base fare, distance, and standard loading/unloading rates. This is locked to ensure fairness.</p>
                  </div>

                  <button 
                    onClick={() => createTransporterTrip(newTripForm)}
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    Publish Trip
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Your Published Trips</h3>
              {sharedTrips.filter(t => t.transporterName === currentUser.name).length === 0 ? (
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
                  No shared trips published yet. Use the form to create one.
                </div>
              ) : (
                sharedTrips.filter(t => t.transporterName === currentUser.name).map(trip => {
                  const capacityPercent = Math.round((trip.currentLoad / trip.totalCapacity) * 100);
                  
                  return (
                    <div key={trip.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                      <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trip.status === "LOCKED" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"}`}>
                              {trip.status === "LOCKED" ? "🔒 Locked & Confirmed" : "Accepting Farmers"}
                            </span>
                          </div>
                          <h4 className="font-bold text-lg text-gray-900">{trip.route}</h4>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-4">
                            <span className="flex items-center gap-1"><Clock size={14}/> {trip.departureDate}, {trip.departureTime}</span>
                            <span className="flex items-center gap-1"><Truck size={14}/> {trip.vehicle} ({trip.totalCapacity}kg)</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 block font-semibold">Total Fare</span>
                          <span className="text-xl font-black text-emerald-700">₹{trip.totalFare}</span>
                        </div>
                      </div>
                      
                      <div className="p-5 bg-gray-50">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-sm font-bold text-gray-700">Capacity Utilization</span>
                          <span className="text-sm font-bold text-gray-900">{trip.currentLoad} / {trip.totalCapacity} kg</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-6">
                          <div className="bg-emerald-500 h-full" style={{width: `${capacityPercent}%`}}></div>
                        </div>

                        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Joined Farmers ({trip.farmers.length})</h5>
                        {trip.farmers.length === 0 ? (
                          <div className="text-sm text-gray-500 italic py-2">Waiting for farmers to join...</div>
                        ) : (
                          <div className="space-y-2">
                            {trip.farmers.map(f => (
                              <div key={f.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-emerald-100 shadow-sm relative overflow-hidden">
                                {f.id.startsWith("MOCK-") || f.id === "MY-ID" ? (
                                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl-lg animate-pulse">
                                    JUST JOINED
                                  </div>
                                ) : null}
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm border border-emerald-200">
                                    {f.name.charAt(0)}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-bold text-gray-900 text-sm">{f.name}</span>
                                    <span className="text-[10px] text-gray-500 flex items-center gap-1"><MapPin size={10} className="text-emerald-400" /> {f.location || "Nearby Farm"}</span>
                                  </div>
                                </div>
                                <div className="text-right mt-1 sm:mt-0">
                                  <span className="font-black text-emerald-800 text-sm bg-emerald-50 px-2 py-0.5 rounded">{f.loadAmount} kg</span>
                                  <span className="text-[10px] text-gray-500 block mt-0.5">Share: ₹{Math.round((f.loadAmount / trip.totalCapacity) * trip.totalFare)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* EARNINGS & SETTLEMENT TAB */}
      {activeTab === "settlement" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Transporter Freight Settlement</h2>
            <p className="text-xs text-gray-500">Automated payout ledger with zero broker deductions</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold">Contracted Trip Fee</span>
                <div className="text-2xl font-extrabold text-emerald-900 mt-1">₹{transporterJob.payout.toLocaleString()}</div>
                <span className="text-[11px] text-emerald-700 mt-0.5 block">Trip #{transporterJob.tripId} (3 Stops)</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold">Toll & Fuel Allowance</span>
                <div className="text-2xl font-extrabold text-emerald-900 mt-1">Included</div>
                <span className="text-[11px] text-emerald-700 mt-0.5 block">Zero deduction policy</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold">Disbursement Status</span>
                <div className="text-2xl font-extrabold text-emerald-900 mt-1">
                  {transporterJob.status === "COMPLETED" ? "Credited" : "Pending Drop"}
                </div>
                <span className="text-[11px] text-emerald-700 mt-0.5 block">Bank Transfer (HDFC Logistics A/C)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>
                Demonstration Mock Settlement: In production, GPS geofencing triggers direct bank IMPS/NEFT transfers upon QR verification at wholesale gate.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* NETWORK / DIRECTORY TAB */}
      {activeTab === "network" && (
        <EMandiNetwork />
      )}
    </div>
  );
}
