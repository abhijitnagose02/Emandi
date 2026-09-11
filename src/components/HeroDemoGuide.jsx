import React, { useState } from 'react';
import { useFarmLink } from '../context/FarmLinkContext';
import { Sparkles, ChevronDown, Check, ArrowRight, Tractor, Users, Truck } from './Icons';

export default function HeroDemoGuide() {
  const { currentUser, switchRole, negotiation, order, transporterJob, acceptOffer, chooseDeliveryMethod, acceptTransportJob, confirmPickupStop, confirmDeliveryAtDrop, acceptDeliveryByBuyer, resetDemo } = useFarmLink();
  const [isExpanded, setIsExpanded] = useState(true);

  // Compute current demo progress
  let currentStep = 1;
  if (transporterJob.status === "COMPLETED" || order?.status === "COMPLETED") {
    currentStep = 6;
  } else if (transporterJob.status === "DELIVERED" || order?.status === "DELIVERED") {
    currentStep = 5;
  } else if (transporterJob.status === "IN_TRANSIT" || transporterJob.status === "PICKING_UP" || transporterJob.status === "ASSIGNED") {
    currentStep = 4;
  } else if (order?.status === "DELIVERY_SELECTED") {
    currentStep = 4;
  } else if (order?.status === "ORDER_CONFIRMED") {
    currentStep = 3;
  } else if (negotiation?.status === "ACCEPTED") {
    currentStep = 3;
  } else if (negotiation?.history?.length > 1) {
    currentStep = 2;
  }

  const steps = [
    {
      step: 1,
      title: "List & Discover",
      role: "Farmer / Buyer",
      desc: "Farmer lists 500kg Red Onion @ ₹28/kg. Buyer discovers in Marketplace.",
      targetRole: "Farmer"
    },
    {
      step: 2,
      title: "Negotiate Price",
      role: "Buyer ⇄ Farmer",
      desc: "Buyer offers ₹24 → Farmer counters ₹26 → Buyer counters ₹25.",
      targetRole: "Buyer"
    },
    {
      step: 3,
      title: "Finalize & Choose Delivery",
      role: "Farmer / Buyer",
      desc: "Accept @ ₹25/kg. Pick Immediate (75% rule) or Consolidated Delivery.",
      targetRole: "Buyer"
    },
    {
      step: 4,
      title: "Transporter Match & Multi-Stop",
      role: "Transporter",
      desc: "Transporter accepts Trip TR-104 (3 Farm Pickups, 1,500kg total).",
      targetRole: "Transporter"
    },
    {
      step: 5,
      title: "In Transit & Delivery",
      role: "Transporter",
      desc: "Stops 1, 2, 3 picked up → In Transit → Arrives at Nagpur Market.",
      targetRole: "Transporter"
    },
    {
      step: 6,
      title: "Acceptance & Settlement",
      role: "Buyer / Farmer",
      desc: "Buyer inspects & accepts produce → Automatic transparent payout settlement.",
      targetRole: "Buyer"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white border-b border-emerald-800/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wider text-emerald-300">
              <Sparkles size={14} className="text-emerald-400" />
              Interactive Prototype Hero Demo
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Role Toggle Buttons */}
            <div className="hidden sm:flex items-center bg-black/30 p-1 rounded-lg border border-emerald-700/40 text-xs">
              <span className="text-gray-400 px-2 font-medium">Switch Perspective:</span>
              <button
                onClick={() => switchRole("Farmer")}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all cursor-pointer font-medium ${
                  currentUser.role === "Farmer"
                    ? "bg-emerald-600 text-white shadow-sm font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Tractor size={13} />
                Farmer
              </button>
              <button
                onClick={() => switchRole("Buyer")}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all cursor-pointer font-medium ${
                  currentUser.role === "Buyer"
                    ? "bg-emerald-600 text-white shadow-sm font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Users size={13} />
                Buyer
              </button>
              <button
                onClick={() => switchRole("Transporter")}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all cursor-pointer font-medium ${
                  currentUser.role === "Transporter"
                    ? "bg-emerald-600 text-white shadow-sm font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Truck size={13} />
                Transporter
              </button>
            </div>

            <button
              onClick={resetDemo}
              title="Reset hero demo to initial state"
              className="text-xs text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded border border-white/10 transition-colors cursor-pointer"
            >
              Reset Demo
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>{isExpanded ? "Hide Flow" : "Show Steps"}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Expanded Steps Carousel */}
        {isExpanded && (
          <div className="mt-2.5 pt-2 border-t border-emerald-800/40 grid grid-cols-2 md:grid-cols-6 gap-2 text-left">
            {steps.map((s) => {
              const isActive = currentStep === s.step;
              const isPast = currentStep > s.step;
              return (
                <div
                  key={s.step}
                  onClick={() => switchRole(s.targetRole)}
                  className={`p-2 rounded-lg border text-xs cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/20 border-emerald-400 text-white ring-1 ring-emerald-400"
                      : isPast
                      ? "bg-white/5 border-emerald-800/60 text-gray-300 opacity-90 hover:bg-white/10"
                      : "bg-black/20 border-gray-800 text-gray-400 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold flex items-center gap-1">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isPast ? "bg-emerald-500 text-black" : isActive ? "bg-emerald-400 text-black font-extrabold" : "bg-gray-700 text-gray-300"
                      }`}>
                        {isPast ? "✓" : s.step}
                      </span>
                      Step {s.step}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-semibold">{s.role}</span>
                  </div>
                  <div className="font-medium text-white truncate">{s.title}</div>
                  <p className="text-[11px] text-gray-300 line-clamp-2 mt-0.5 leading-snug">{s.desc}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
