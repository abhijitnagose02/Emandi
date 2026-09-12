import React, { useState } from 'react';
import LiveNegotiationChat from '../LiveNegotiationChat';
import BuyerDashboardOverview from './BuyerDashboardOverview';
import EMandiNetwork from '../profile/EMandiNetwork';
import { useEMandi } from '../../context/EMandiContext';
import { 
  Users, Search, Filter, MapPin, DollarSign, Package, 
  Clock, ArrowRight, CheckCircle2, AlertCircle, MessageSquare, 
  Truck, ShieldCheck, X, Sparkles, Layers, Zap
} from '../Icons';

export default function BuyerDashboard() {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    activeProfile,
    listings, 
    negotiation, 
    makeOffer, 
    sendBuyerCounter, 
    acceptOffer, 
    order, 
    chooseDeliveryMethod, 
    transportPool, 
    transporterJob, 
    acceptDeliveryByBuyer 
  } = useEMandi();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("ALL");
  const [selectedCropFilter, setSelectedCropFilter] = useState("ALL");
  
  // Modal for Listing Detail / Make Offer
  const [selectedListing, setSelectedListing] = useState(null);
  const [offerPriceInput, setOfferPriceInput] = useState("24");
  const [offerNoteInput, setOfferNoteInput] = useState("We can take the entire lot. Immediate dispatch preferred.");
  const [offerDeliveryPref, setOfferDeliveryPref] = useState("IMMEDIATE"); // "IMMEDIATE" or "POOL"
  const [offerDeliveryDeadline, setOfferDeliveryDeadline] = useState("");

  // Negotiation timeline counter input
  const [buyerCounterInput, setBuyerCounterInput] = useState("25");
  const [buyerCounterNote, setBuyerCounterNote] = useState("Fair compromise. Let's lock this order.");

  const filteredListings = listings.filter((item) => {
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === "ALL" || item.grade.includes(selectedGrade);
    const matchesCrop = selectedCropFilter === "ALL" || item.crop.toLowerCase().includes(selectedCropFilter.toLowerCase());
    return matchesSearch && matchesGrade && matchesCrop;
  });

  const handleMakeOfferSubmit = (e) => {
    e.preventDefault();
    if (!selectedListing || !offerPriceInput) return;
    makeOffer(selectedListing.id, Number(offerPriceInput), offerNoteInput, offerDeliveryPref, offerDeliveryDeadline);
    setSelectedListing(null);
    setActiveTab("negotiations");
  };

  const handleBuyerCounterSubmit = (e) => {
    e.preventDefault();
    if (!buyerCounterInput) return;
    sendBuyerCounter(Number(buyerCounterInput), buyerCounterNote);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      {activeTab === 'marketplace' && (
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
              <Users size={16} />
              <span>Wholesale Buyer Portal • {currentUser.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Direct Farm Produce Marketplace
            </h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              Source certified harvests directly from regional farmers. Bargain real-time prices and consolidate transportation for minimum landed cost.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("marketplace")}
              className="bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm cursor-pointer"
            >
              <Search size={18} />
              <span>Browse Active Lots</span>
            </button>
          </div>
        </div>

        {/* Quick Buyer Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-500/50 text-center sm:text-left">
          <div className="bg-emerald-900/30 p-3 rounded-2xl border border-emerald-400/30">
            <span className="text-xs text-emerald-200">Available Farm Lots</span>
            <div className="text-xl sm:text-2xl font-black mt-0.5">{listings.length} Lots</div>
          </div>
          <div className="bg-emerald-900/30 p-3 rounded-2xl border border-emerald-400/30">
            <span className="text-xs text-emerald-200">Active Negotiations</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {negotiation && negotiation.status !== "ACCEPTED" ? "1 Active" : "0"}
            </div>
          </div>
          <div className="bg-emerald-900/30 p-3 rounded-2xl border border-emerald-400/30">
            <span className="text-xs text-emerald-200">Confirmed Orders</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-200 mt-0.5">
              {order ? "1 In Dispatch" : "0"}
            </div>
          </div>
          <div className="bg-emerald-900/30 p-3 rounded-2xl border border-emerald-400/30">
            <span className="text-xs text-emerald-200">Transport Method</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-0.5">
              {order?.deliveryMethod === "CONSOLIDATED" ? "Pooled" : "Dedicated"}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* DASHBOARD OVERVIEW TAB */}
      {activeTab === "dashboard" && (
        <BuyerDashboardOverview setActiveTab={setActiveTab} />
      )}

      {/* MARKETPLACE TAB */}
      {activeTab === "marketplace" && (
        <div className="space-y-6">
          
          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops, mandi locations, or farmers..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto text-xs">
              <span className="text-gray-400 flex items-center gap-1 shrink-0 font-medium">
                <Filter size={14} /> Filter:
              </span>
              <select
                value={selectedCropFilter}
                onChange={(e) => setSelectedCropFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 cursor-pointer"
              >
                <option value="ALL">All Produce</option>
                <option value="Onion">Onion</option>
                <option value="Wheat">Wheat</option>
                <option value="Soybean">Soybean</option>
                <option value="Tomato">Tomato</option>
                <option value="Potato">Potato</option>
              </select>

              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 cursor-pointer"
              >
                <option value="ALL">All Grades</option>
                <option value="Grade A">Grade A</option>
                <option value="Grade B">Grade B</option>
              </select>
            </div>
          </div>

          {/* Produce Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 relative overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.crop} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs rounded-full text-xs font-bold text-gray-800 shadow-2xs">
                        {item.grade}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-bold">
                        {item.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-xs text-white rounded-lg text-xs font-semibold">
                      Harvest: {item.harvestDate}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {item.crop}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          <MapPin size={13} className="text-gray-400 shrink-0" />
                          <span className="truncate">{item.pickupLocation}</span>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-gray-400 font-medium">Asking</div>
                        <div className="text-xl font-black text-emerald-600">₹{item.expectedPrice}</div>
                        <span className="text-[10px] text-gray-400">per {item.unit}</span>
                      </div>
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-semibold">FARMER / FPO</span>
                        <span className="font-bold text-gray-800">{item.farmerName}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 block font-semibold">AVAILABLE LOT</span>
                        <span className="font-bold text-gray-800">{item.quantity} {item.unit}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mt-3 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setSelectedListing(item);
                      setOfferPriceInput((item.expectedPrice - 4).toString());
                    }}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <DollarSign size={16} />
                    <span>Make Offer / Negotiate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OFFERS & NEGOTIATIONS TAB */}
      {activeTab === "negotiations" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Live Price Negotiation Timeline</h2>
            <p className="text-xs text-gray-500">Transparent counter-bargaining connected directly with Farmer</p>
          </div>
          <LiveNegotiationChat />
        </div>
      )}
      {/* ORDERS & DELIVERY SELECTION TAB */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order Management & Delivery Logistics</h2>
            <p className="text-xs text-gray-500">Compare Immediate vs Consolidated Transport and track real-time delivery</p>
          </div>

          {order ? (
            <div className="space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      ORDER #{order.orderId}
                    </span>
                    <h3 className="text-xl font-extrabold text-gray-900 mt-1">
                      {order.quantity} {order.unit} {order.crop} @ ₹{order.agreedPrice}/{order.unit}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block font-semibold">TOTAL PRODUCE VALUE</span>
                    <span className="text-2xl font-black text-emerald-600">₹{order.totalProduceValue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold">FARMER SOURCE</span>
                    <span className="font-semibold text-gray-800">{order.farmer}</span>
                    <span className="text-gray-500 block text-[11px]">{order.pickupLocation}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold">DROP DESTINATION</span>
                    <span className="font-semibold text-gray-800">{order.buyer}</span>
                    <span className="text-gray-500 block text-[11px]">{order.dropLocation}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold">ORDER STATUS</span>
                    <span className="inline-block mt-0.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* TWO DELIVERY OPTIONS SECTION */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Select Delivery Method</h3>
                    <p className="text-xs text-gray-500">Choose dedicated immediate dispatch or pooled shared transport</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Decision Support Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* OPTION 1: IMMEDIATE DELIVERY */}
                  <div className={`rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                    order.deliveryMethod === "IMMEDIATE"
                      ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-400"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            <Zap size={18} />
                          </div>
                          <h4 className="font-extrabold text-base text-gray-900">Option 1: Immediate Delivery</h4>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                          Dedicated Vehicle
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 mt-2">
                        Immediate dedicated transport will be arranged. Dispatches within 3-4 hours directly from farm gate to your warehouse.
                      </p>

                      <div className="mt-4 p-3 bg-white rounded-xl border border-gray-200 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Dedicated Transport Cost:</span>
                          <span className="font-semibold text-gray-800">₹1,000</span>
                        </div>
                        <div className="flex justify-between items-center py-2 text-xs font-bold text-gray-800 border-t border-gray-100">
                          <span>Delivery Requirement:</span>
                          <span>{order.deliveryMethod === "IMMEDIATE" ? "Immediate Dispatch" : "Consolidated Pool"}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-gray-100 text-sm font-black text-gray-900">
                          <span>Payable Transport Share:</span>
                          <span className="text-emerald-600">₹750</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => chooseDeliveryMethod("IMMEDIATE")}
                      className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                        order.deliveryMethod === "IMMEDIATE"
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      {order.deliveryMethod === "IMMEDIATE" ? "✓ Immediate Delivery Selected" : "Select Immediate Delivery (₹750)"}
                    </button>
                  </div>

                  {/* OPTION 2: CONSOLIDATED DELIVERY (RECOMMENDED) */}
                  <div className={`rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                    order.deliveryMethod === "CONSOLIDATED"
                      ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-400"
                      : "border-emerald-200 bg-emerald-50/20 hover:border-emerald-300"
                  }`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            <Layers size={18} />
                          </div>
                          <h4 className="font-extrabold text-base text-gray-900">Option 2: Consolidated Delivery</h4>
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 bg-emerald-600 text-white rounded-full flex items-center gap-1">
                          <Sparkles size={12} /> RECOMMENDED
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 mt-2">
                        Shares route with compatible farm orders heading to Nagpur Central Yard. Saves money, reduces empty runs.
                      </p>

                      <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-200 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Transport Pool:</span>
                          <span className="font-bold text-emerald-700">#TP-104 (Nagpur Corridor)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Matched Orders:</span>
                          <span className="font-semibold text-gray-800">3 Orders (Total: 1,500 kg)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Vehicle Assigned:</span>
                          <span className="font-semibold text-gray-800">Eicher 2.5T Capacity</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total Pool Freight:</span>
                          <span className="font-semibold text-gray-800">₹2,000 (Split 3 ways)</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-emerald-100 text-sm font-black text-emerald-800">
                          <span>Your Transparent Share:</span>
                          <span className="text-emerald-700">₹800 (Saves ₹200 vs Dedicated!)</span>
                        </div>
                      </div>

                      {/* Decision Support Badges */}
                      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-white border border-emerald-200 text-emerald-800 font-medium">✓ Same destination (Nagpur)</span>
                        <span className="px-2 py-0.5 rounded bg-white border border-emerald-200 text-emerald-800 font-medium">✓ Nearby Katol route</span>
                        <span className="px-2 py-0.5 rounded bg-white border border-emerald-200 text-emerald-800 font-medium">✓ Capacity available (1.5T/2.5T)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => chooseDeliveryMethod("CONSOLIDATED")}
                      className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                        order.deliveryMethod === "CONSOLIDATED"
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white"
                      }`}
                    >
                      {order.deliveryMethod === "CONSOLIDATED" ? "✓ Consolidated Delivery Active (₹800)" : "Select Consolidated Delivery (₹800)"}
                    </button>
                  </div>
                </div>

                {/* DETAILED TRANSPORT POOL BREAKDOWN (When Consolidated is picked) */}
                {order.deliveryMethod === "CONSOLIDATED" && (
                  <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Truck className="text-emerald-700" size={18} />
                        <h4 className="font-bold text-sm text-gray-900">Transport Pool #{transportPool.id} — Transparent Cost Split</h4>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Total Load: 1,500 kg / 2,000 kg Capacity</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {transportPool.orders.map((po, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-gray-900">{po.pickupStop}</span>
                            <span className="text-gray-500 block text-[11px]">{po.farmer} • {po.quantity} kg {po.crop}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] text-gray-400 block">Base Share + Route Adj.</span>
                            <span className="font-extrabold text-emerald-700">₹{po.totalShare}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* LIVE TRIP & DELIVERY TRACKING */}
              {order.deliveryMethod && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Logistics & Dropoff Tracking</h3>
                      <p className="text-xs text-gray-500">Real-time driver location and pickup status</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      Driver: {transporterJob.transporterName}
                    </span>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/2 p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">Assigned Vehicle:</span>
                        <span className="font-bold text-gray-900">{transporterJob.vehicleNumber}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">Trip Status:</span>
                        <span className="font-extrabold text-emerald-700">{transporterJob.status}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">Stops Progress:</span>
                        <span>
                          {transporterJob.pickupStops.filter(s => s.pickedUp).length} of {transporterJob.pickupStops.length} Farms Picked Up
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="font-semibold text-gray-700 mb-2">Live GPS Details:</div>
                        <div className="space-y-1.5 text-gray-600">
                          <div className="flex justify-between">
                            <span>Current Speed:</span>
                            <span className="font-medium">42 km/h</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Updated:</span>
                            <span className="font-medium">Just now</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-1/2 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative min-h-[200px]">
                      <img src="/route_map.jpg" alt="Live Route Map" className="w-full h-full object-cover absolute inset-0" />
                      <div className="absolute top-2 left-2 right-2 flex justify-between gap-2 pointer-events-none">
                        <span className="bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                          Tracking Active
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm p-2 rounded-lg border border-gray-200 shadow-lg flex justify-between items-center text-[10px] font-bold text-gray-900">
                        <span className="flex items-center gap-1"><MapPin size={12} className="text-emerald-600"/> Arriving at Central Yard</span>
                        <span className="text-emerald-700">ETA: 45 mins</span>
                      </div>
                    </div>
                  </div>

                  {/* Buyer Delivery Acceptance */}
                  {transporterJob.status === "DELIVERED" && order.status !== "COMPLETED" && (
                    <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-emerald-900 text-sm">Produce Arrived at Central Wholesale Yard!</div>
                        <p className="text-xs text-emerald-700 mt-0.5">Please inspect the 500 kg Red Onion lot and release escrow settlement.</p>
                      </div>
                      <button
                        onClick={acceptDeliveryByBuyer}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md transition-colors whitespace-nowrap"
                      >
                        ✓ Inspect & Accept Delivery
                      </button>
                    </div>
                  )}

                  {order.status === "COMPLETED" && (
                    <div className="p-4 bg-emerald-100 border border-emerald-400 rounded-xl text-emerald-900 font-bold text-xs flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-emerald-700" />
                      <span>Delivery Successfully Accepted! Payment settled to Suresh Patil and Ramesh Transports.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 text-sm">No confirmed orders. Finalize a price in the Negotiation tab to initiate delivery.</p>
            </div>
          )}
        </div>
      )}

      {/* SETTLEMENTS TAB */}
      {activeTab === "settlement" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Buyer Invoicing & Escrow Settlement</h2>
            <p className="text-xs text-gray-500">Transparent ledger breakdown of produce price and allocated freight</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold">Agreed Produce Cost</span>
                <div className="text-2xl font-extrabold text-emerald-900 mt-1">
                  {order ? `₹${order.totalProduceValue.toLocaleString()}` : "₹12,500"}
                </div>
                <span className="text-[11px] text-emerald-700 mt-0.5 block">500 kg @ ₹25/kg</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold">Allocated Transport Charge</span>
                <div className="text-2xl font-extrabold text-emerald-900 mt-1">
                  {order?.deliveryMethod === "IMMEDIATE" ? "₹750" : "₹800"}
                </div>
                <span className="text-[11px] text-emerald-700 mt-0.5 block">
                  {order?.deliveryMethod === "IMMEDIATE" ? "Immediate Dispatch" : "Consolidated Pool"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold">Total Landed Procurement Cost</span>
                <div className="text-2xl font-extrabold text-emerald-900 mt-1">
                  {order ? `₹${(order.totalProduceValue + (order.customerTransportShare || 800)).toLocaleString()}` : "₹13,300"}
                </div>
                <span className="text-[11px] text-emerald-700 mt-0.5 block">GST Invoiced & Escrow Protected</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>
                Demonstration Mock Billing: 100% digital trace. Direct farm payment eliminates 3 tiers of traditional mandi commission agents (arhatiyas).
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MAKE OFFER MODAL */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <DollarSign className="text-emerald-600" size={22} />
                <h3 className="font-bold text-lg text-gray-900">Make Price Offer</h3>
              </div>
              <button
                onClick={() => setSelectedListing(null)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleMakeOfferSubmit} className="space-y-4 mt-4 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
                <img src={selectedListing.image} alt={selectedListing.crop} className="w-14 h-14 rounded-lg object-cover" />
                <div>
                  <div className="font-bold text-gray-900 text-sm">{selectedListing.crop}</div>
                  <div className="text-gray-500 text-[11px]">
                    Lot: {selectedListing.quantity} {selectedListing.unit} • Grade: {selectedListing.grade}
                  </div>
                  <div className="text-emerald-700 font-bold mt-0.5">
                    Farmer Asking: ₹{selectedListing.expectedPrice}/{selectedListing.unit}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Your Offered Price (₹/kg)</label>
                <input
                  type="number"
                  value={offerPriceInput}
                  onChange={(e) => setOfferPriceInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Note to Farmer</label>
                <textarea
                  value={offerNoteInput}
                  onChange={(e) => setOfferNoteInput(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Transport & Delivery Requirement</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`border rounded-xl p-2.5 cursor-pointer flex flex-col gap-1 transition-colors ${offerDeliveryPref === "IMMEDIATE" ? "bg-emerald-50 border-emerald-500" : "bg-white border-gray-200"}`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="deliveryPref" value="IMMEDIATE" checked={offerDeliveryPref === "IMMEDIATE"} onChange={() => setOfferDeliveryPref("IMMEDIATE")} className="text-emerald-600 focus:ring-emerald-500" />
                      <span className="font-bold text-gray-900">Right Now (Urgent)</span>
                    </div>
                    <span className="text-[10px] text-gray-500 pl-5">Immediate dispatch.</span>
                  </label>
                  <label className={`border rounded-xl p-2.5 cursor-pointer flex flex-col gap-1 transition-colors ${offerDeliveryPref === "POOL" ? "bg-emerald-50 border-emerald-500" : "bg-white border-gray-200"}`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="deliveryPref" value="POOL" checked={offerDeliveryPref === "POOL"} onChange={() => setOfferDeliveryPref("POOL")} className="text-emerald-600 focus:ring-emerald-500" />
                      <span className="font-bold text-gray-900">I Can Wait</span>
                    </div>
                    <span className="text-[10px] text-gray-500 pl-5">Consolidated pooling. Saves money but takes time.</span>
                  </label>
                </div>
                {offerDeliveryPref === "POOL" && (
                  <div className="mt-3">
                    <label className="block text-gray-700 font-semibold mb-1 text-xs">Latest Acceptable Delivery Date</label>
                    <input 
                      type="date"
                      value={offerDeliveryDeadline}
                      onChange={(e) => setOfferDeliveryDeadline(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500"
                      required={offerDeliveryPref === "POOL"}
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedListing(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md transition-colors"
                >
                  Submit Offer & Open Negotiation
                </button>
              </div>
            </form>
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
