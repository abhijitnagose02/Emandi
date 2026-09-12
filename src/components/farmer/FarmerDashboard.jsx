import React, { useState } from 'react';
import LiveNegotiationChat from '../LiveNegotiationChat';
import FarmerTransport from './FarmerTransport';
import AIWeatherForecast from './AIWeatherForecast';
import EMandiNetwork from '../profile/EMandiNetwork';
import { useEMandi } from '../../context/EMandiContext';
import FarmerDashboardOverview from './FarmerDashboardOverview';
import GuidedTour from '../education/GuidedTour';
import HelpButton from '../education/HelpButton';
import { 
  Tractor, Plus, DollarSign, Package, Clock, MapPin, 
  ArrowRight, CheckCircle2, AlertCircle, MessageSquare, 
  Truck, ShieldCheck, X, Sparkles, Zap, Layers
} from '../Icons';

export default function FarmerDashboard() {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    activeProfile,
    listings, 
    createListing, 
    negotiation, 
    sendFarmerCounter, 
    acceptOffer, 
    order, 
    transporterJob, 
    confirmPickupStop,
    chooseDeliveryMethod
  } = useEMandi();

  const transportPool = {
    id: "TP-104",
    orders: [
      { pickupStop: "Katol Farm A", farmer: "Your Farm", quantity: 500, crop: "Onions", totalShare: 800 },
      { pickupStop: "Katol Farm B", farmer: "Ramesh", quantity: 600, crop: "Tomatoes", totalShare: 700 },
      { pickupStop: "Saoner Farm C", farmer: "Suresh", quantity: 400, crop: "Potatoes", totalShare: 500 }
    ]
  };

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCrop, setNewCrop] = useState("Potato (बटाटा)");
  const [newQuantity, setNewQuantity] = useState("1500");
  const [newGrade, setNewGrade] = useState("Grade A");
  const [newPrice, setNewPrice] = useState("18");
  const [newLocation, setNewLocation] = useState("Sanwer Belt, Indore, Madhya Pradesh");
  const [newHarvestDate, setNewHarvestDate] = useState("12 Sep 2026");
  const [newDescription, setNewDescription] = useState("No chemical sprays, cold-chain ready, uniform medium-large size.");

  // Negotiation input state
  const [counterPriceInput, setCounterPriceInput] = useState("26");
  const [counterNoteInput, setCounterNoteInput] = useState("");

  const [searchCrop, setSearchCrop] = useState("Potato (बटाटा)");
  const [showCropDropdown, setShowCropDropdown] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80");

  const MAJOR_CROPS = [
    "White Onion (पांढरा कांदा)",
    "Potato (बटाटा)",
    "Green Chilli (हिरवी मिरची)",
    "Wheat (गहू)",
    "Rice/Paddy (तांदूळ)",
    "Cotton (कापूस)",
    "Soybean (सोयाबीन)",
    "Turmeric (हळद)",
    "Ginger (आले)",
    "Garlic (लसूण)",
    "Sugarcane (ऊस)",
    "Pomegranate (डाळिंब)",
    "Grapes (द्राक्षे)",
    "Mango (आंबा)"
  ];
  
  const filteredCrops = MAJOR_CROPS.filter(c => c.toLowerCase().includes(searchCrop.toLowerCase()));

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createListing({
      crop: newCrop,
      quantity: newQuantity,
      unit: "kg",
      grade: newGrade,
      expectedPrice: newPrice,
      pickupLocation: newLocation,
      harvestDate: newHarvestDate,
      description: newDescription,
      image: photoPreview
    });
    setShowCreateModal(false);
    setActiveTab("listings");
  };

  const handleCounterSubmit = (e) => {
    e.preventDefault();
    if (!counterPriceInput) return;
    sendFarmerCounter(Number(counterPriceInput), counterNoteInput);
    setCounterNoteInput("");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      {activeTab === 'listings' && (
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
              <Tractor size={16} />
              <span>Farmer Producer Portal • {currentUser.location}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good Morning, {currentUser.name}!
            </h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              Connect directly with verified wholesale buyers, negotiate transparent prices, and dispatch via pooled transport routes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <GuidedTour />
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-emerald-400 hover:bg-emerald-300 text-gray-900 font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm cursor-pointer"
            >
              <Plus size={18} />
              <span>List New Produce</span>
            </button>
          </div>
        </div>

        {/* Dashboard Stat Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-emerald-600/60 text-center sm:text-left">
          <div className="bg-emerald-900/40 p-3 rounded-2xl border border-emerald-500/30">
            <span className="text-xs text-emerald-200">Active Listings</span>
            <div className="text-xl sm:text-2xl font-black mt-0.5">{listings.length}</div>
          </div>
          <div className="bg-emerald-900/40 p-3 rounded-2xl border border-emerald-500/30">
            <span className="text-xs text-emerald-200">Pending Offers</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-0.5">
              {negotiation && negotiation.status !== "ACCEPTED" ? "1" : "0"}
            </div>
          </div>
          <div className="bg-emerald-900/40 p-3 rounded-2xl border border-emerald-500/30">
            <span className="text-xs text-emerald-200">Active Orders</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-200 mt-0.5">
              {order ? "1" : "0"}
            </div>
          </div>
          <div className="bg-emerald-900/40 p-3 rounded-2xl border border-emerald-500/30">
            <span className="text-xs text-emerald-200">Awaiting Pickup</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-200 mt-0.5">
              {transporterJob.pickupStops[0].pickedUp ? "0" : (order ? "1" : "0")}
            </div>
          </div>
          <div className="bg-emerald-900/40 p-3 rounded-2xl border border-emerald-500/30 col-span-2 sm:col-span-1">
            <span className="text-xs text-emerald-200">Pending Settlement</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {order ? `₹${(order.totalProduceValue - order.customerTransportShare).toLocaleString()}` : "₹0"}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Main Tab Switcher Content */}
      {activeTab === "dashboard" && (
        <FarmerDashboardOverview 
          setActiveTab={setActiveTab} 
          setShowCreateModal={setShowCreateModal}
        />
      )}

      {/* MY LISTINGS FULL TAB */}
      {activeTab === "listings" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">My Produce Listings</h2>
                <p className="text-xs text-gray-500">Live harvests available to regional wholesale buyers</p>
              </div>
              <HelpButton tutorialId="farmer_guide" />
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={16} />
              <span>Create Listing</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="h-40 relative overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.crop} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2.5 py-1 bg-white/95 backdrop-blur-xs rounded-full text-xs font-bold text-emerald-800 shadow-2xs">
                    {item.grade}
                  </span>
                  <span className="absolute top-2 right-2 px-2.5 py-1 bg-emerald-600 text-white rounded-full text-[11px] font-bold">
                    {item.status}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{item.crop}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={13} className="text-gray-400" />
                        <span>{item.pickupLocation}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-lg text-emerald-700">₹{item.expectedPrice}</div>
                      <span className="text-xs text-gray-400">per {item.unit}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">{item.description}</p>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px]">TOTAL QUANTITY</span>
                      <span className="font-bold text-gray-800">{item.quantity} {item.unit}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">HARVEST DATE</span>
                      <span className="font-medium text-gray-800">{item.harvestDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEGOTIATIONS & OFFERS TAB */}
      {activeTab === "negotiations" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Live Price Negotiation</h2>
            <p className="text-xs text-gray-500">Transparent bargaining directly between Farmer and Wholesale Buyer</p>
          </div>
          <LiveNegotiationChat />
        </div>
      )}
      {/* ORDERS & DELIVERY TAB */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Orders & Farm Pickup Dispatch</h2>
            <p className="text-xs text-gray-500">Track transporter assignment, farm gate loading, and route progress</p>
          </div>

          {order ? (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="p-6 bg-gradient-to-r from-slate-900 to-emerald-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Order #{order.orderId}
                    </span>
                    <span className="text-xs text-gray-300">• Confirmed Lot</span>
                  </div>
                  <h3 className="text-xl font-extrabold mt-1">
                    {order.quantity} {order.unit} {order.crop} @ ₹{order.agreedPrice}/{order.unit}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Buyer: <span className="text-white font-semibold">{order.buyer}</span> • Total Value: <span className="font-bold text-emerald-400">₹{order.totalProduceValue.toLocaleString()}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-medium">LIFECYCLE STATUS</span>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Flow Timeline */}
              <div className="p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Delivery & Transporter Tracking</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs mb-6">
                  <div className={`p-3 rounded-xl border ${order.status ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-gray-50 border-gray-200"}`}>
                    <div className="font-bold">1. Order Confirmed</div>
                    <p className="text-[11px] text-gray-600 mt-0.5">Price ₹{order.agreedPrice}/kg accepted</p>
                  </div>
                  <div className={`p-3 rounded-xl border ${order.deliveryMethod ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-gray-50 border-gray-200"}`}>
                    <div className="font-bold">2. Delivery Chosen</div>
                    <p className="text-[11px] text-gray-600 mt-0.5">{order.deliveryMethod || "Pending choice"}</p>
                  </div>
                  <div className={`p-3 rounded-xl border ${transporterJob.status !== "AVAILABLE" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-gray-50 border-gray-200"}`}>
                    <div className="font-bold">3. Transporter Assigned</div>
                    <p className="text-[11px] text-gray-600 mt-0.5">{transporterJob.transporterName}</p>
                  </div>
                  <div className={`p-3 rounded-xl border ${order.status === "COMPLETED" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-gray-50 border-gray-200"}`}>
                    <div className="font-bold">4. Delivery & Settlement</div>
                    <p className="text-[11px] text-gray-600 mt-0.5">{order.status === "COMPLETED" ? "Settled" : "Awaiting drop"}</p>
                  </div>
                </div>

                {/* TWO DELIVERY OPTIONS SECTION */}
                {["ORDER_CONFIRMED", "DELIVERY_SELECTED"].includes(order.status) && (
                  <div className="mb-6 mt-6">
                    {!order.deliveryMethod ? (
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
                          <div className={`rounded-2xl p-5 border-2 transition-all flex flex-col justify-between border-gray-200 hover:border-gray-300 bg-white`}>
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
                                  <span>Immediate Dispatch</span>
                                </div>
                                <div className="flex justify-between pt-1 border-t border-gray-100 text-sm font-black text-gray-900">
                                  <span>Payable Transport Share:</span>
                                  <span className="text-emerald-600">₹750</span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => chooseDeliveryMethod("IMMEDIATE")}
                              className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-800`}
                            >
                              Select Immediate Delivery (₹750)
                            </button>
                          </div>

                          {/* OPTION 2: CONSOLIDATED DELIVERY (RECOMMENDED) */}
                          <div className={`rounded-2xl p-5 border-2 transition-all flex flex-col justify-between border-emerald-200 bg-emerald-50/20 hover:border-emerald-300`}>
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
                              className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-colors bg-emerald-600 hover:bg-emerald-700 text-white`}
                            >
                              Select Consolidated Delivery (₹800)
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-8 text-center shadow-xs">
                        <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center border border-emerald-200 shadow-sm mb-4">
                          <Truck className="text-emerald-600 animate-pulse" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-emerald-900 mb-2">Request Sent to Transporter!</h3>
                        <p className="text-sm text-emerald-700 max-w-md mx-auto">
                          You selected <strong>{order.deliveryMethod === "IMMEDIATE" ? "Immediate Dedicated" : "Consolidated Pool"}</strong> delivery. 
                          Waiting for the Transporter to review and accept the job request...
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Transporter Details Card */}
                {!["ORDER_CONFIRMED", "DELIVERY_SELECTED"].includes(order.status) && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck size={18} className="text-emerald-700" />
                      <span className="font-bold text-sm text-gray-900">Assigned Logistics Partner</span>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      Vehicle: {transporterJob.vehicleNumber}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px]">FARM PICKUP POINT</span>
                      <span className="font-semibold text-gray-800">{order.pickupLocation}</span>
                      <span className="text-[11px] text-gray-500 block mt-0.5">
                        Status: {transporterJob?.pickupStops?.[0]?.pickedUp ? "✅ Picked up from your farm" : "⏳ Transporter arriving"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">FINAL BUYER DESTINATION</span>
                      <span className="font-semibold text-gray-800">{order.dropLocation}</span>
                      <span className="text-[11px] text-gray-500 block mt-0.5">
                        Mode: {order.deliveryMethod === "CONSOLIDATED" ? "Shared Pool TP-104 (3 Stops)" : "Dedicated"}
                      </span>
                    </div>
                  </div>

                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 text-sm">No confirmed orders yet. Once an offer is finalized, order dispatch will appear here.</p>
            </div>
          )}
        </div>
      )}

      {/* TRANSPORT TAB */}
      {activeTab === "transport" && (
        <FarmerTransport />
      )}

      {/* SETTLEMENTS TAB */}
      {activeTab === "settlement" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Farmer Settlement & Escrow Payouts</h2>
            <p className="text-xs text-gray-500">Transparent payment accounting without hidden middlemen commissions</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold">Total Gross Produce Value</span>
                <div className="text-2xl font-extrabold text-emerald-900 mt-1">
                  {order ? `₹${order.totalProduceValue.toLocaleString()}` : "₹12,500"}
                </div>
                <span className="text-[11px] text-emerald-700 mt-0.5 block">500 boxes Alphonso Mango @ ₹800/box</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold">Allocated Transport Deduction</span>
                <div className="text-2xl font-extrabold text-emerald-900 mt-1">
                  {order?.deliveryMethod === "CONSOLIDATED" ? "₹800" : "₹0 (Buyer pays 75%)"}
                </div>
                <span className="text-[11px] text-emerald-700 mt-0.5 block">
                  {order?.deliveryMethod === "CONSOLIDATED" ? "Pool TP-104 weight share" : "Direct immediate shipment"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-semibold">Net Payout to Bank / KCC</span>
                <div className="text-2xl font-extrabold text-emerald-900 mt-1">
                  {order?.deliveryMethod === "CONSOLIDATED" ? "₹11,700" : "₹12,500"}
                </div>
                <span className="text-[11px] text-emerald-700 mt-0.5 block">Bank: SBI Agri Branch Nagpur</span>
              </div>
            </div>

            {/* Calculation Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
              <div className="bg-gray-50 px-4 py-3 font-bold text-gray-700 border-b border-gray-200">
                Transparent Settlement Statement
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Gross Produce Amount (500 kg × ₹25)</span>
                  <span className="font-semibold text-gray-900">₹12,500.00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Platform Quality Assure Fee</span>
                  <span className="font-semibold text-green-700">₹0.00 (Zero Commission)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Freight Allocation (Consolidated Route TP-104)</span>
                  <span className="font-semibold text-gray-900">
                    {order?.deliveryMethod === "CONSOLIDATED" ? "-₹800.00" : "₹0.00"}
                  </span>
                </div>
                <div className="flex justify-between py-2 pt-3 font-bold text-sm text-gray-900">
                  <span>Net Disbursed to Suresh Patil</span>
                  <span className="text-emerald-700">
                    {order?.deliveryMethod === "CONSOLIDATED" ? "₹11,700.00" : "₹12,500.00"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>
                Demonstration Mock Escrow: All funds are released within 30 minutes of wholesale recipient inspection.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CREATE LISTING MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Tractor className="text-emerald-600" size={22} />
                <h3 className="font-bold text-lg text-gray-900">Create Produce Listing</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 mt-4 text-xs">
              <div className="relative">
                <label className="block font-semibold text-gray-700 mb-1">Crop Name & Variety</label>
                <input
                  type="text"
                  value={searchCrop}
                  onChange={(e) => {
                    setSearchCrop(e.target.value);
                    setNewCrop(e.target.value);
                    setShowCropDropdown(true);
                  }}
                  onFocus={() => setShowCropDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCropDropdown(false), 200)}
                  placeholder="Search or enter crop name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500"
                  required
                />
                {showCropDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                    {filteredCrops.length > 0 ? filteredCrops.map(crop => (
                      <div 
                        key={crop}
                        className="px-3 py-2 hover:bg-emerald-50 text-xs text-gray-800 cursor-pointer"
                        onClick={() => {
                          setSearchCrop(crop);
                          setNewCrop(crop);
                          setShowCropDropdown(false);
                        }}
                      >
                        {crop}
                      </div>
                    )) : (
                      <div className="px-3 py-2 text-xs text-gray-500">No match found. Type to add custom crop.</div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Produce Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPhotoPreview(reader.result);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer" 
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Upload a clear photo of the harvested crop.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Quality Grade</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 bg-white"
                  >
                    <option value="Grade A">Grade A (Premium Export)</option>
                    <option value="Grade B+">Grade B+ (Standard Mandi)</option>
                    <option value="Grade B">Grade B (Processing)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Expected Price (₹/kg)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 font-bold focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Harvest Date</label>
                  <input
                    type="text"
                    value={newHarvestDate}
                    onChange={(e) => setNewHarvestDate(e.target.value)}
                    placeholder="e.g. 15 Sep 2026"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Farm Gate Pickup Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Katol Farm A, Nagpur, Maharashtra"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Harvest Notes / Details</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md transition-colors"
                >
                  Publish Listing to Marketplace
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
