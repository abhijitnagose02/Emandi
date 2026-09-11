import React, { useState } from 'react';
import { useFarmLink } from '../../context/FarmLinkContext';
import { 
  Truck, Package, MapPin, Clock, DollarSign, CheckCircle2, 
  AlertCircle, ArrowRight, ShieldCheck, Sparkles, Layers, Zap
} from '../Icons';

export default function TransporterDashboard() {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    transporterJob, 
    acceptTransportJob, 
    confirmPickupStop, 
    confirmDeliveryAtDrop, 
    order 
  } = useFarmLink();

  const [mockProofUploaded, setMockProofUploaded] = useState(false);

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

          {transporterJob.status === "AVAILABLE" ? (
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
                    Payload: <strong className="text-white">1,500 kg Red Onion</strong> (Utilizes 75% of your 2,000 kg capacity)
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

            {/* STOPS MANAGEMENT LIST */}
            <div className="space-y-3">
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
    </div>
  );
}
