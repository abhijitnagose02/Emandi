import React, { useState, useEffect } from 'react';
import { useEMandi } from '../context/EMandiContext';
import { 
  Send, MapPin, CheckCircle2, AlertCircle, Truck, Sparkles, 
  X, FileText, ShieldCheck, Tractor, Users, RefreshCw
} from './Icons';

export default function LiveNegotiationChat() {
  const { 
    currentUser, 
    switchRole, 
    negotiation, 
    sendFarmerCounter, 
    sendBuyerCounter, 
    acceptOffer, 
    rejectOffer,
    reopenNegotiation,
    setActiveTab, 
    resetDemo 
  } = useEMandi();

  const [inputPrice, setInputPrice] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [actionNotice, setActionNotice] = useState(null);

  // Sync default inputPrice whenever negotiation changes
  useEffect(() => {
    if (negotiation) {
      // Suggest slightly higher for farmer, slightly lower or equal for buyer
      if (currentUser.role === "Farmer") {
        setInputPrice(String(Math.min(negotiation.askingPrice, (negotiation.currentOffer || 25) + 1)));
      } else {
        setInputPrice(String(Math.max(1, (negotiation.currentOffer || 25) - 1)));
      }
    }
  }, [negotiation?.currentOffer, negotiation?.lastOfferBy, currentUser.role]);

  if (!negotiation) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
        <AlertCircle size={32} className="text-gray-300 mx-auto mb-3" />
        <h3 className="font-bold text-gray-900 text-base">No Active Negotiations</h3>
        <p className="text-gray-500 text-xs mt-1">
          When an offer is made on a listing, your live negotiation chat will appear here.
        </p>
      </div>
    );
  }

  const isFarmer = currentUser.role === "Farmer";
  const isBuyer = currentUser.role === "Buyer";
  const otherPartyName = isFarmer ? negotiation.buyerName : negotiation.farmerName;
  const otherPartyLocation = isFarmer ? negotiation.buyerLocation : negotiation.farmerLocation;

  // Determine who made the latest offer/counter
  const lastOfferRole = negotiation.lastOfferBy || 
    (negotiation.history && negotiation.history.length > 0 
      ? negotiation.history[negotiation.history.length - 1].role 
      : "farmer");

  // The person who made the offer must wait; the NEXT person decides accept or counter
  const turnRole = lastOfferRole === "buyer" ? "Farmer" : "Buyer";
  const isMyTurn = (isFarmer && turnRole === "Farmer") || (isBuyer && turnRole === "Buyer");

  const isAccepted = negotiation.status === "ACCEPTED";
  const isRejected = negotiation.status === "REJECTED";

  const handleSendCounter = () => {
    if (!inputPrice || isNaN(Number(inputPrice))) return;
    const priceNum = Number(inputPrice);

    if (isFarmer) {
      sendFarmerCounter(priceNum, inputMessage || `Farmer countered at ₹${priceNum}/${negotiation.unit}. Fresh Grade-A produce.`);
    } else {
      sendBuyerCounter(priceNum, inputMessage || `Buyer countered at ₹${priceNum}/${negotiation.unit}.`);
    }

    setInputMessage("");
    setActionNotice(`Counter-offer of ₹${priceNum}/${negotiation.unit} sent to ${otherPartyName}! Now waiting for their decision.`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleConfirmAccept = () => {
    setShowTermsModal(false);
    setAgreedToTerms(false);
    acceptOffer();
  };

  const handleConfirmReject = () => {
    setShowRejectModal(false);
    rejectOffer(rejectReason || "Price expectation not met.");
    setRejectReason("");
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col min-h-[640px] max-h-[85vh]">
      
      {/* 1. Turn & Role Simulation Banner */}
      <div className="bg-slate-900 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Viewing Perspective:</span>
          <span className="font-bold flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
            {isFarmer ? <Tractor size={14} className="text-emerald-400" /> : <Users size={14} className="text-emerald-400" />}
            <span>{currentUser.name} ({currentUser.role})</span>
          </span>
        </div>

        {/* Real-time Turn Status & Quick Switch */}
        <div className="flex items-center gap-2">
          {!isAccepted && !isRejected && (
            <>
              {isMyTurn ? (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-extrabold bg-emerald-500 text-gray-950 animate-pulse text-[11px] shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-gray-950"></span>
                  YOUR TURN TO DECIDE
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px]">
                  <span>⏳ Waiting for {turnRole}</span>
                </span>
              )}

              {/* Quick toggle to simulate other party */}
              <button
                onClick={() => switchRole(turnRole)}
                className="bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 hover:text-white px-2.5 py-1 rounded-lg border border-emerald-500/40 font-semibold text-[11px] transition-all cursor-pointer flex items-center gap-1"
                title={`Switch to ${turnRole} to respond to this offer`}
              >
                <span>Switch to {turnRole} View ⇄</span>
              </button>
            </>
          )}

          {(isAccepted || isRejected) && (
            <button
              onClick={resetDemo}
              className="bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 font-semibold text-[11px] transition-all cursor-pointer flex items-center gap-1"
            >
              <RefreshCw size={12} />
              Reset Demo
            </button>
          )}
        </div>
      </div>

      {/* 2. Header: Deal Information */}
      <div className="p-4 bg-gray-50/80 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 z-10">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {negotiation.crop} • {negotiation.quantity} {negotiation.unit}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              isAccepted 
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300" 
                : isRejected 
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
            }`}>
              {isAccepted ? "Deal Accepted" : isRejected ? "Declined" : "In Negotiation"}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-gray-700 bg-white border border-gray-200 px-2.5 py-0.5 rounded-full">
              <Truck size={11} className="text-emerald-600" />
              {negotiation.deliveryPreference === "IMMEDIATE" ? "Immediate Dispatch Needed" : `Pool Delivery (by ${negotiation.deliveryDeadline ? new Date(negotiation.deliveryDeadline).toLocaleDateString() : 'flexible'})`}
            </span>
          </div>

          <h3 className="font-black text-gray-900 text-base flex items-center gap-2 mt-1">
            <span className={`w-2.5 h-2.5 rounded-full ${isAccepted ? 'bg-emerald-500' : isRejected ? 'bg-red-500' : 'bg-emerald-500 animate-ping'}`}></span>
            Negotiating with: {otherPartyName}
          </h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
            <MapPin size={12} className="text-gray-400" /> {otherPartyLocation}
          </p>
        </div>
        
        {/* Deal Pricing Snapshot */}
        <div className="flex items-center gap-4 text-right">
          <div className="pr-4 border-r border-gray-200 hidden sm:block">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Farmer Asking</div>
            <div className="text-sm font-bold text-gray-600">₹{negotiation.askingPrice}/{negotiation.unit}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold mb-0.5">
              Current Best Offer
            </div>
            <div className="text-2xl font-black text-emerald-600 tracking-tight">
              ₹{negotiation.currentOffer}
              <span className="text-xs text-gray-500 font-medium">/{negotiation.unit}</span>
            </div>
            <div className="text-[10px] text-gray-500">
              Total: ₹{(negotiation.currentOffer * negotiation.quantity).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-2 flex items-center justify-between transition-all animate-in fade-in slide-in-from-top">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 size={16} />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-emerald-200 hover:text-white cursor-pointer">
            <X size={14} />
          </button>
        </div>
      )}

      {/* 3. Chat and Offer Timeline Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 space-y-4">
        
        {/* Contextual AI / Guide Alert */}
        {!isAccepted && !isRejected && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50/60 border border-emerald-100 rounded-2xl p-3.5 shadow-2xs flex items-start gap-3">
            <div className="bg-emerald-100 text-emerald-700 p-2 rounded-xl shrink-0">
              <Sparkles size={18} />
            </div>
            <div className="text-xs">
              <h4 className="font-extrabold text-emerald-900 uppercase tracking-wider text-[11px] mb-0.5">
                Turn-Based Negotiation Rule
              </h4>
              <p className="text-gray-600 leading-relaxed">
                When a party proposes an offer, the <strong>other person</strong> decides to <strong>Accept</strong>, <strong>Decline</strong>, or <strong>Counter-Offer</strong>. 
                {isMyTurn ? (
                  <span className="text-emerald-700 font-bold ml-1">
                    It is currently your turn! Choose to accept or submit a counter below.
                  </span>
                ) : (
                  <span className="text-amber-800 font-medium ml-1">
                    You made the last offer. Waiting for {otherPartyName} to respond.
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Formal Ledger Timeline */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent pt-4 pb-4">
          {negotiation.history.map((msg, idx) => {
            const isAcceptMsg = msg.type === "accept";
            const isRejectMsg = msg.type === "reject";
            const isInitial = msg.type === "initial";
            const isCounter = msg.type === "counter";
            const isOffer = msg.type === "offer";

            let IconC = Users;
            if (isAcceptMsg) IconC = CheckCircle2;
            else if (isRejectMsg) IconC = AlertCircle;
            else if (msg.role === 'farmer') IconC = Tractor;
            
            const dotColor = isAcceptMsg ? 'bg-emerald-500' : isRejectMsg ? 'bg-red-500' : (msg.role === 'farmer' ? 'bg-emerald-600' : 'bg-blue-600');

            return (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* Timeline dot */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${dotColor} text-white absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10`}>
                  <IconC size={16} />
                </div>
                
                {/* Card */}
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border ${isAcceptMsg ? 'border-emerald-200 shadow-emerald-100' : isRejectMsg ? 'border-red-200 shadow-red-100' : 'border-gray-200'} shadow-sm ml-14 md:ml-0 hover:shadow-md transition-shadow relative`}>
                  {/* Small arrow pointing to center line on MD screens */}
                  <div className={`hidden md:block absolute top-5 w-3 h-3 bg-white border-t border-r ${isAcceptMsg ? 'border-emerald-200' : isRejectMsg ? 'border-red-200' : 'border-gray-200'} transform group-odd:rotate-45 group-odd:-left-1.5 group-even:-rotate-135 group-even:-right-1.5`}></div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">{msg.sender}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider ${
                        msg.role === 'farmer' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {msg.role}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-400">{msg.time}</span>
                  </div>
                  
                  <div className={`flex items-center justify-between gap-3 pb-3 mb-3 border-b ${isAcceptMsg ? 'border-emerald-100' : isRejectMsg ? 'border-red-100' : 'border-gray-100'}`}>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">
                        {isInitial ? "Initial Listing" : isCounter ? "Counter-Bid" : isOffer ? "Offer Placed" : isAcceptMsg ? "Deal Finalized" : "Deal Declined"}
                      </span>
                      <span className={`font-black text-xl tracking-tight ${isAcceptMsg ? 'text-emerald-600' : isRejectMsg ? 'text-red-600' : 'text-gray-900'}`}>
                        ₹{msg.price}<span className="text-sm font-semibold text-gray-500 ml-0.5">/{negotiation.unit}</span>
                      </span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">Total Value</span>
                      <span className={`font-black px-2.5 py-1 rounded-lg text-xs ${isAcceptMsg ? 'bg-emerald-50 text-emerald-700' : isRejectMsg ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                        ₹{(msg.price * negotiation.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {msg.message && (
                    <div className={`text-xs font-medium leading-relaxed p-3 rounded-lg border ${isAcceptMsg ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800' : isRejectMsg ? 'bg-red-50/50 border-red-100 text-red-800' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                      "{msg.message}"
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Decision & Action Panel */}
      
      {/* CASE A: DEAL ACCEPTED */}
      {isAccepted && (
        <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-t border-emerald-200 z-10">
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold mb-1.5">
              <CheckCircle2 size={22} className="text-emerald-600" />
              <h4 className="text-base">Deal Successfully Finalized at ₹{negotiation.currentOffer}/{negotiation.unit}!</h4>
            </div>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Both parties have agreed to the transaction for <strong>{negotiation.quantity} {negotiation.unit} of {negotiation.crop}</strong> (Total: ₹{(negotiation.currentOffer * negotiation.quantity).toLocaleString()}). A legally binding electronic contract has been generated.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setShowInvoiceModal(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm cursor-pointer text-xs"
              >
                <FileText size={16} />
                View Digital Invoice & Smart Contract PDF
              </button>

              <button 
                onClick={() => setActiveTab("orders")}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm cursor-pointer text-xs"
              >
                <Truck size={16} />
                Proceed to Orders & Transport Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CASE B: DEAL REJECTED */}
      {isRejected && (
        <div className="p-4 sm:p-5 bg-red-50 border-t border-red-200 z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-red-900 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-600" />
              <span>Negotiation Ended: Offer was declined.</span>
            </div>
            <p className="text-xs text-red-700 mt-0.5">
              Either party can restart bargaining by submitting a fresh proposal.
            </p>
          </div>
          <button
            onClick={() => reopenNegotiation(negotiation.askingPrice)}
            className="w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Restart with New Proposal (₹{negotiation.askingPrice})
          </button>
        </div>
      )}

      {/* CASE C: IN PROGRESS & IT IS CURRENT USER'S TURN TO DECIDE */}
      {!isAccepted && !isRejected && isMyTurn && (
        <div className="bg-white border-t border-gray-200 z-10 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.1)]">
          {/* Turn Prompt Header */}
          <div className="bg-emerald-50/80 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-xs">
            <div className="text-emerald-900 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span><strong>{otherPartyName}</strong> offered <strong>₹{negotiation.currentOffer}/{negotiation.unit}</strong>. It's your turn to decide:</span>
            </div>
            <button
              onClick={() => setShowRejectModal(true)}
              className="text-gray-400 hover:text-red-600 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Decline Deal
            </button>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* OPTION 1: ACCEPT OFFER (Fast Action) */}
            <div className="md:col-span-4 bg-emerald-50/60 rounded-2xl p-3 border border-emerald-200/80 flex flex-col justify-between">
              <div className="mb-2">
                <div className="text-[10px] uppercase tracking-wider text-emerald-800 font-extrabold">Option 1: Agree to Deal</div>
                <div className="text-xs text-emerald-900 mt-0.5">
                  Accept at <strong>₹{negotiation.currentOffer}/{negotiation.unit}</strong> (Total: ₹{(negotiation.currentOffer * negotiation.quantity).toLocaleString()})
                </div>
              </div>
              <button 
                onClick={() => setShowTermsModal(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 size={16} />
                <span>Accept Deal @ ₹{negotiation.currentOffer}</span>
              </button>
            </div>

            {/* OR Divider */}
            <div className="hidden md:flex md:col-span-1 items-center justify-center">
              <span className="text-xs font-black text-gray-400 bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wider">
                OR
              </span>
            </div>

            {/* OPTION 2: GIVE ANOTHER OFFER (COUNTER-OFFER) */}
            <div className="md:col-span-7 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider text-gray-600 font-extrabold flex items-center gap-1.5">
                  <RefreshCw size={12} className="text-gray-400" /> Option 2: Submit Counter-Bid
                </span>
                
                {/* Quick Increment Chips */}
                <div className="flex items-center gap-1.5">
                  {isFarmer ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setInputPrice(String((negotiation.currentOffer || 25) + 1))}
                        className="text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        +₹1 (₹{(negotiation.currentOffer || 25) + 1})
                      </button>
                      <button
                        type="button"
                        onClick={() => setInputPrice(String((negotiation.currentOffer || 25) + 2))}
                        className="text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        +₹2 (₹{(negotiation.currentOffer || 25) + 2})
                      </button>
                      <button
                        type="button"
                        onClick={() => setInputPrice(String(negotiation.askingPrice))}
                        className="text-[10px] font-bold px-2 py-0.5 rounded border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Base Asking (₹{negotiation.askingPrice})
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setInputPrice(String(Math.max(1, (negotiation.currentOffer || 25) - 1)))}
                        className="text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        -₹1 (₹{Math.max(1, (negotiation.currentOffer || 25) - 1)})
                      </button>
                      <button
                        type="button"
                        onClick={() => setInputPrice(String((negotiation.currentOffer || 25) + 1))}
                        className="text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        +₹1 (₹{(negotiation.currentOffer || 25) + 1})
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4 relative">
                  <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Proposed Rate</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500 font-bold text-sm">₹</span>
                    <input 
                      type="number" 
                      placeholder="Price"
                      value={inputPrice}
                      onChange={(e) => setInputPrice(e.target.value)}
                      className="w-full pl-8 pr-8 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-black text-gray-900 transition-shadow"
                    />
                    <span className="absolute right-3 top-2 text-[10px] text-gray-400 font-medium">/{negotiation.unit}</span>
                  </div>
                </div>

                <div className="sm:col-span-8 relative">
                  <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Formal Note (Optional)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. Best and final offer for Grade-A..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendCounter()}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                    />
                    <button 
                      onClick={handleSendCounter}
                      disabled={!inputPrice || Number(inputPrice) <= 0}
                      className="bg-gray-900 hover:bg-black disabled:opacity-50 text-white font-bold rounded-lg px-4 py-1.5 text-xs flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASE D: IN PROGRESS & CURRENT USER IS WAITING FOR THE OTHER PARTY */}
      {!isAccepted && !isRejected && !isMyTurn && (
        <div className="p-4 sm:p-5 bg-amber-50/70 border-t border-amber-200 z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0 shadow-2xs">
                <span className="animate-spin text-base">⏳</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-amber-950 text-sm">
                    Offer of ₹{negotiation.currentOffer}/{negotiation.unit} Sent! Awaiting {otherPartyName}'s Decision
                  </h4>
                  <span className="bg-amber-200/80 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Their Turn
                  </span>
                </div>
                <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                  You cannot accept your own offer. <strong>{otherPartyName} ({turnRole})</strong> is currently deciding whether to <strong>Accept</strong> your proposed ₹{negotiation.currentOffer}/{negotiation.unit} or <strong>make a Counter-Offer</strong>.
                </p>
              </div>
            </div>

            {/* Direct Switch Perspective CTA */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => switchRole(turnRole)}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Respond as {turnRole}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Terms & Conditions Modal (Required before Final Acceptance) */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-emerald-700 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5 font-extrabold text-base">
                <ShieldCheck size={22} />
                <span>Legally Binding Agreement</span>
              </div>
              <button 
                onClick={() => { setShowTermsModal(false); setAgreedToTerms(false); }} 
                className="text-emerald-100 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 text-xs text-gray-700 space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="text-emerald-900 font-bold mb-1">Agreement Summary:</div>
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>Produce:</span>
                  <span className="font-bold text-gray-900">{negotiation.crop}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-medium mt-1">
                  <span>Quantity:</span>
                  <span className="font-bold text-gray-900">{negotiation.quantity} {negotiation.unit}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-medium mt-1">
                  <span>Agreed Price:</span>
                  <span className="font-black text-emerald-700">₹{negotiation.currentOffer}/{negotiation.unit}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-bold border-t border-emerald-200 mt-2 pt-1 text-sm text-emerald-900">
                  <span>Total Value:</span>
                  <span>₹{(negotiation.currentOffer * negotiation.quantity).toLocaleString()}</span>
                </div>
              </div>

              <p className="leading-relaxed">
                By accepting, you are entering into a <strong>legally binding agricultural trade agreement</strong> with <strong>{otherPartyName}</strong> under the electronic Mandi framework.
              </p>
              
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                <li>Agreed price of <strong>₹{negotiation.currentOffer}/{negotiation.unit}</strong> is final and locked into escrow.</li>
                <li>Neither party can arbitrarily cancel without penalty once accepted.</li>
                <li>An official digital tax invoice and dispatch manifest will be generated automatically.</li>
              </ul>
              
              <label className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer mt-4 hover:bg-gray-100/80 transition-colors">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer" 
                />
                <span className="font-bold text-gray-900 leading-tight">
                  I accept this offer of ₹{negotiation.currentOffer}/{negotiation.unit} and agree to legally binding terms.
                </span>
              </label>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => { setShowTermsModal(false); setAgreedToTerms(false); }}
                className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900 cursor-pointer text-xs"
              >
                Cancel
              </button>
              <button 
                disabled={!agreedToTerms}
                onClick={handleConfirmAccept}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black rounded-xl shadow-md transition-all cursor-pointer text-xs flex items-center gap-1.5"
              >
                <CheckCircle2 size={16} />
                <span>Confirm & Lock Deal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Decline Confirmation Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl p-5 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-bold text-base">
              <AlertCircle size={22} />
              <span>Decline Negotiation?</span>
            </div>
            <p className="text-xs text-gray-600">
              Are you sure you want to decline the current offer of <strong>₹{negotiation.currentOffer}/{negotiation.unit}</strong> from {otherPartyName}?
            </p>
            <input 
              type="text"
              placeholder="Reason (optional)..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowRejectModal(false)}
                className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Back
              </button>
              <button 
                onClick={handleConfirmReject}
                className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer"
              >
                Yes, Decline Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Digital Invoice PDF Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 h-[80vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <FileText size={16} /> e-Mandi Digital Smart Contract Invoice
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="text-gray-500 hover:text-gray-800 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            {/* PDF Content Area */}
            <div className="flex-1 overflow-y-auto bg-gray-200 p-4 sm:p-8 flex justify-center">
              <div className="bg-white w-full max-w-md shadow-lg p-8 space-y-6 text-gray-800 font-sans text-[11px] relative">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
                  <span className="text-8xl font-black rotate-[-45deg] whitespace-nowrap">FARMLINK</span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-emerald-800 pb-4">
                  <div>
                    <h1 className="text-2xl font-black text-emerald-800 tracking-tighter">e-Mandi</h1>
                    <p className="text-gray-500">Digital Smart Contract Receipt</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-lg font-bold">INVOICE</h2>
                    <p>#{negotiation.id}</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-gray-400 uppercase tracking-wider mb-1 text-[9px]">Seller (Farmer)</h3>
                    <p className="font-bold text-sm">{negotiation.farmerName}</p>
                    <p className="text-gray-600">{negotiation.farmerLocation}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-400 uppercase tracking-wider mb-1 text-[9px]">Buyer</h3>
                    <p className="font-bold text-sm">{negotiation.buyerName}</p>
                    <p className="text-gray-600">{negotiation.buyerLocation}</p>
                  </div>
                </div>

                {/* Details Table */}
                <table className="w-full mt-6">
                  <thead>
                    <tr className="bg-emerald-50 text-emerald-800 border-y border-emerald-200">
                      <th className="py-2 px-2 text-left font-bold">Item Description</th>
                      <th className="py-2 px-2 text-right font-bold">Qty</th>
                      <th className="py-2 px-2 text-right font-bold">Rate</th>
                      <th className="py-2 px-2 text-right font-bold">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-gray-200">
                    <tr>
                      <td className="py-3 px-2">
                        <p className="font-bold">{negotiation.crop}</p>
                        <p className="text-gray-500 text-[9px]">Grade A, Inspected</p>
                      </td>
                      <td className="py-3 px-2 text-right">{negotiation.quantity} {negotiation.unit}</td>
                      <td className="py-3 px-2 text-right">₹{negotiation.currentOffer}</td>
                      <td className="py-3 px-2 text-right font-bold">₹{(negotiation.quantity * negotiation.currentOffer).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end pt-2">
                  <div className="w-1/2 space-y-1">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>₹{(negotiation.quantity * negotiation.currentOffer).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Platform Fee (0%):</span>
                      <span>₹0</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-emerald-800 border-t border-emerald-800 pt-1 mt-1">
                      <span>Total Value:</span>
                      <span>₹{(negotiation.quantity * negotiation.currentOffer).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Notes */}
                <div className="mt-8 pt-4 border-t border-gray-200 text-[9px] text-gray-500 space-y-1">
                  <p><strong>Delivery Preference:</strong> {negotiation.deliveryPreference === "IMMEDIATE" ? "Immediate Dispatch" : `Consolidated Pool (Deadline: ${negotiation.deliveryDeadline ? new Date(negotiation.deliveryDeadline).toLocaleDateString() : 'Flexible'})`}</p>
                  <p><strong>Legal Disclaimer:</strong> This is a legally binding contract generated via e-Mandi Escrow. Both parties are obligated to fulfill this transaction under the Agricultural Produce Trade Act.</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-white border-t border-gray-200 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = `Invoice_${negotiation.id}.pdf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setShowInvoiceModal(false);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-2 text-xs"
              >
                <FileText size={16} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
