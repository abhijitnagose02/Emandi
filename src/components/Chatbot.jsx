import React, { useState } from 'react';
import { useEMandi } from '../context/EMandiContext';
import { MessageSquare, X, Send, Sparkles, Tractor, Users, Truck } from './Icons';

export default function Chatbot() {
  const { currentUser } = useEMandi();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello! I am your e-Mandi Assistant. How can I help you as a ${currentUser.role}?`,
      time: "Just now"
    }
  ]);

  const roleQuestions = {
    Farmer: [
      { q: "How do I list produce?", a: "Go to 'My Listings' or click 'Create Listing' on your dashboard. Enter crop name, quantity (kg/quintal), grade, expected price, harvest date, and farm pickup location. Once published, buyers across the region can discover it immediately!" },
      { q: "How do I respond to an offer?", a: "Under 'Offers & Negotiation', review the buyer's offered price per kg. You can Accept directly to confirm the order, Reject if too low, or propose a Counter-Offer (e.g. counter ₹26/kg if buyer offered ₹24/kg)." },
      { q: "How does consolidated delivery work?", a: "Instead of booking an entire truck for your lot alone, e-Mandi groups compatible harvest orders heading along the same highway to the same market. Transporters make scheduled farm pickups, significantly lowering your transport cost share." },
      { q: "When do I receive my payment?", a: "Once the transporter delivers the produce and the buyer verifies grade and weight upon dropoff, escrow funds are instantly released to your linked bank account/Kisan Credit Card." }
    ],
    Buyer: [
      { q: "How do I make an offer?", a: "Browse the 'Marketplace' to discover active farmer lots. Click any produce card to inspect grade, harvest date, and location. Click 'Make Offer' to submit your target purchase price per kg." },
      { q: "What is the 75% immediate transport rule?", a: "If you need fast dedicated dispatch without waiting for route pooling, you can select Immediate Delivery. Under e-Mandi's rule, the customer pays 75% of the dedicated transport cost (e.g., ₹750 on a ₹1,000 trip)." },
      { q: "How does transport pooling save costs?", a: "Consolidated Delivery pools your order with nearby orders in a high-capacity truck (e.g., Eicher 2.5 Ton). You only pay for your weight portion and route deviation (e.g., ₹800 vs ₹1,000 dedicated), saving money and carbon emissions." },
      { q: "How do I accept delivery?", a: "When the transporter arrives at your destination, inspect the produce and weight slip. Click 'Accept Delivery' in your Orders tab to finalize the transaction and generate your GST/mandi receipt." }
    ],
    Transporter: [
      { q: "How do I accept a trip?", a: "Check 'Open Requests' on your Transporter home. Review the total load (e.g., 1,500 kg), number of pickup stops, final delivery market, and payout (e.g., ₹2,000). Click 'Accept Request' to lock the route." },
      { q: "How do multi-stop pickups work?", a: "For consolidated trips (e.g., TR-104), e-Mandi organizes an optimized sequence of farm stops (Stop 1 Katol, Stop 2 Kalmeshwar, Stop 3 Saoner). Click 'Confirm Pickup' at each farm once loaded." },
      { q: "How do I confirm delivery?", a: "Upon reaching the wholesale market drop location, uncharge the produce and tap 'Confirm Delivery'. Once the buyer clicks accept, your trip earnings are marked for instant settlement." },
      { q: "When is my transport fee disbursed?", a: "Transport earnings are credited to your transporter wallet within 30 minutes of buyer acceptance, guaranteed without brokerage cuts." }
    ]
  };

  const currentQuestions = roleQuestions[currentUser.role] || roleQuestions.Farmer;

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: "user", text: query, time: "Just now" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let reply = "I can guide you through listings, offers, negotiation, immediate vs consolidated delivery, and settlements. Pick any suggested topic above or ask anything specific!";
      const matched = currentQuestions.find(cq => cq.q.toLowerCase() === query.toLowerCase());
      if (matched) {
        reply = matched.a;
      } else if (query.toLowerCase().includes("immediate") || query.toLowerCase().includes("75%")) {
        reply = "Immediate delivery dispatches a dedicated vehicle for prompt transport. The prototype rule allocates 75% of the transportation charge to the buyer/customer (₹750 of ₹1,000).";
      } else if (query.toLowerCase().includes("consolidat") || query.toLowerCase().includes("pool")) {
        reply = "Consolidated Delivery matches multiple compatible farm orders on nearby routes heading to the same market. For example, Pool TP-104 groups 3 orders (500kg + 400kg + 600kg = 1,500kg in a 2.5T truck), distributing the ₹2,000 transport cost transparently by weight.";
      } else if (query.toLowerCase().includes("negotiat") || query.toLowerCase().includes("price")) {
        reply = "e-Mandi negotiation allows direct price bargaining. Farmer sets asking price, Buyer makes offer, and both parties can counter-offer until a mutually agreed price is accepted.";
      }

      setMessages(prev => [...prev, { sender: "bot", text: reply, time: "Just now" }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-3 rounded-full shadow-2xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-emerald-400/40"
      >
        <Sparkles size={18} className="text-emerald-300 animate-spin-slow" />
        <span className="font-bold text-sm tracking-wide">Ask e-Mandi</span>
        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
      </button>

      {/* Chat Popup Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-800 text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles size={18} className="text-emerald-300" />
              </div>
              <div>
                <div className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>e-Mandi Assistant</span>
                  <span className="text-[10px] bg-emerald-800/80 px-1.5 py-0.5 rounded text-emerald-200 uppercase font-semibold">
                    {currentUser.role} Mode
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100/90">Instant answers for your workflow</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-emerald-100 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Question Chips */}
          <div className="bg-emerald-50/70 p-2.5 border-b border-emerald-100">
            <p className="text-[11px] font-semibold text-emerald-800 mb-1.5 flex items-center gap-1">
              <span>Suggested for {currentUser.role}:</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {currentQuestions.map((cq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(cq.q)}
                  className="text-[11px] bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-200 px-2 py-1 rounded-full transition-colors cursor-pointer text-left shadow-2xs font-medium"
                >
                  {cq.q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="p-3.5 space-y-3 h-72 overflow-y-auto bg-slate-50 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 shadow-2xs rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={`Ask about ${currentUser.role} flow or delivery...`}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white p-2 rounded-xl transition-colors cursor-pointer"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
