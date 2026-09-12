import React, { useState, useEffect } from 'react';
import { useEMandi } from '../../context/EMandiContext';
import { Truck, MapPin, Clock, DollarSign, AlertCircle, CheckCircle2, ShieldCheck, X, Users, Package } from '../Icons';

export default function FarmerTransport() {
  const { 
    sharedTrips, 
    mySharedTrip, 
    joinSharedTrip, 
    addMockFarmerToTrip, 
    removeMockFarmerFromTrip,
    cancelSharedTrip, 
    lockSharedTrip,
    dedicatedRequests,
    requestDedicatedTransport,
    order
  } = useEMandi();

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loadInput, setLoadInput] = useState("400");
  const [showFareModal, setShowFareModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Timer for demo purposes
  const [timeLeft, setTimeLeft] = useState("01:24:36");

  // Calculate shared price based on proportion of total load
  const calculateSharedPrice = (load, totalLoad, tripFare) => {
    if (totalLoad === 0) return tripFare;
    return Math.round((load / totalLoad) * tripFare);
  };

  const calculateMaxPrice = (tripFare) => {
    return tripFare; // if no one else joins
  };

  const handleJoin = () => {
    joinSharedTrip(selectedTrip.id, loadInput);
    setSelectedTrip(null);
  };

  const handleCancel = (fineAmount) => {
    cancelSharedTrip(mySharedTrip.tripId, fineAmount);
    setShowCancelModal(false);
  };

  if (mySharedTrip) {
    const trip = sharedTrips.find(t => t.id === mySharedTrip.tripId);
    if (!trip) return null;

    const myCurrentShare = calculateSharedPrice(mySharedTrip.myLoad, trip.currentLoad, trip.totalFare);
    const capacityPercent = Math.round((trip.currentLoad / trip.totalCapacity) * 100);

    return (
      <div className="space-y-6">
        <div className="bg-emerald-800 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Your Shared Transport</h2>
            <p className="text-emerald-200 text-sm mt-1">{trip.route} • {trip.departureDate}</p>
          </div>
          <div className="bg-emerald-900/50 px-4 py-2 rounded-xl border border-emerald-700">
            <span className="text-emerald-200 text-xs block">Booking Status</span>
            <span className="font-bold text-lg">{trip.status === "LOCKED" ? "🔒 Locked" : "Accepting Farmers"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{trip.transporterName}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><Truck size={16} /> {trip.vehicle}</span>
                    <span className="flex items-center gap-1"><Clock size={16} /> {trip.departureTime}</span>
                  </div>
                </div>
                {trip.status !== "LOCKED" && (
                  <div className="text-right">
                    <span className="text-xs text-red-500 font-bold block">Booking closes in</span>
                    <span className="text-lg font-bold text-gray-900">{timeLeft}</span>
                  </div>
                )}
              </div>

              {/* Capacity Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-gray-600">Truck Capacity Utilization</span>
                  <span className={capacityPercent >= 100 ? "text-red-500" : "text-emerald-600"}>
                    {trip.currentLoad} / {trip.totalCapacity} kg ({capacityPercent}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden flex">
                  {trip.farmers.map((f, idx) => (
                    <div 
                      key={f.id} 
                      className={`h-full ${f.id === "MY-ID" ? "bg-emerald-500" : "bg-emerald-300 border-l border-emerald-400"}`}
                      style={{ width: `${(f.loadAmount / trip.totalCapacity) * 100}%` }}
                      title={`${f.name}: ${f.loadAmount}kg`}
                    ></div>
                  ))}
                </div>
                {capacityPercent >= 100 && <p className="text-xs text-red-500 mt-1 font-bold">Truck is FULL.</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <span className="text-xs text-emerald-800 font-semibold">Your Confirmed Load</span>
                  <div className="text-xl font-bold text-emerald-900 mt-1">{mySharedTrip.myLoad} kg</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <span className="text-xs text-emerald-800 font-semibold">
                    {trip.status === "LOCKED" ? "Final Transport Cost" : "Current Estimated Cost"}
                  </span>
                  <div className="text-xl font-bold text-emerald-900 mt-1 flex items-center gap-2">
                    ₹{myCurrentShare}
                    {trip.status === "LOCKED" && <CheckCircle2 size={18} className="text-emerald-600" />}
                  </div>
                </div>
              </div>

              {trip.status === "LOCKED" && (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-xl mb-6 flex items-start gap-3">
                  <ShieldCheck className="shrink-0 text-blue-600" />
                  <div>
                    <strong className="block">Your transport price is locked.</strong>
                    It will not change after trip confirmation. Total Trip Fare: ₹{trip.totalFare}. 
                    Total Load: {trip.currentLoad} kg. Your Share: {Math.round((mySharedTrip.myLoad/trip.currentLoad)*100)}%.
                  </div>
                </div>
              )}

              {trip.status !== "LOCKED" && (
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setShowCancelModal(true)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                  <button 
                    onClick={() => lockSharedTrip(trip.id)}
                    className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-bold cursor-pointer transition-colors"
                  >
                    Simulate: Time Expired (Lock Trip)
                  </button>
                </div>
              )}
            </div>
            
            {/* Simulation controls for demo */}
            {trip.status !== "LOCKED" && (
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
                <h4 className="font-bold text-purple-900 text-sm mb-3">Demo Controls (Simulate other farmers)</h4>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => addMockFarmerToTrip(trip.id, "Farmer B", 300, "Kalmeshwar Farm")}
                    disabled={trip.currentLoad + 300 > trip.totalCapacity}
                    className="bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50 cursor-pointer"
                  >
                    + Add Farmer B (300kg)
                  </button>
                  <button 
                    onClick={() => addMockFarmerToTrip(trip.id, "Farmer C", 300, "Saoner Farm")}
                    disabled={trip.currentLoad + 300 > trip.totalCapacity}
                    className="bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50 cursor-pointer"
                  >
                    + Add Farmer C (300kg)
                  </button>
                  {trip.farmers.filter(f => f.id.startsWith("MOCK")).map(mock => (
                    <button 
                      key={mock.id}
                      onClick={() => removeMockFarmerFromTrip(trip.id, mock.id)}
                      className="bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      - Remove {mock.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Joined Farmers</h3>
              <div className="space-y-3">
                {trip.farmers.map(f => (
                  <div key={f.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${f.id === "MY-ID" ? "bg-emerald-600" : "bg-gray-400"}`}>
                        {f.name.charAt(0)}
                      </div>
                      <span className={`text-sm ${f.id === "MY-ID" ? "font-bold text-emerald-700" : "text-gray-700"}`}>
                        {f.id === "MY-ID" ? "You" : f.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{f.loadAmount} kg</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 text-center">
                Prices decrease as more farmers join up to the truck's capacity.
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle size={28} />
                <h3 className="font-bold text-xl">Cancel Shared Transport?</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-700 mb-6">
                <p>You are cancelling <strong>{trip.route}</strong>.</p>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between mb-1"><span>Your quantity:</span> <strong>{mySharedTrip.myLoad} kg</strong></div>
                  <div className="flex justify-between mb-1"><span>Time remaining:</span> <strong>{timeLeft}</strong></div>
                  <div className="flex justify-between text-red-600"><span>Cancellation fee (15%):</span> <strong>₹180</strong></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 bg-red-50 p-2 rounded">
                  ⚠ <strong>Why the fine exists:</strong> Your booking reserves capacity. Cancelling close to departure leaves unused space and increases costs for the transporter and other farmers on this shared route.
                </p>
                <p className="text-xs font-semibold text-red-700">
                  Cancelling will increase the transportation cost for remaining farmers.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 cursor-pointer"
                >
                  Go Back
                </button>
                <button 
                  onClick={() => handleCancel(180)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 cursor-pointer"
                >
                  Cancel & Pay ₹180 Fine
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Arrange Transport</h2>
          <p className="text-sm text-gray-500">Find shared trucks heading your way to save on logistics.</p>
        </div>
        <button 
          onClick={() => setShowFareModal(true)}
          className="text-emerald-600 hover:text-emerald-800 text-sm font-bold flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
        >
          <DollarSign size={16} /> How is Fair Fare Calculated?
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
        {sharedTrips.filter(t => t.status === "ACCEPTING").map(trip => {
          const currentLoadInput = selectedTrip?.id === trip.id ? Number(loadInput) : 400;
          const expectedMyCost = calculateSharedPrice(currentLoadInput, trip.currentLoad + currentLoadInput, trip.totalFare);
          const maxPossibleCost = calculateMaxPrice(trip.totalFare);
          const availableSpace = trip.totalCapacity - trip.currentLoad;

          return (
            <div key={trip.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{trip.transporterName}</h3>
                  <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    ⭐ {trip.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-1.5 mb-1">
                  <MapPin size={14} className="text-gray-400" /> {trip.route}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-3">
                  <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Truck size={14} /> {trip.vehicle}</span>
                  <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Clock size={14} /> {trip.departureDate}, {trip.departureTime}</span>
                </div>
              </div>
              
              <div className="p-5 flex-1 bg-gray-50/50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0 mb-4">
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">Available Space</span>
                    <span className="font-bold text-gray-900">{availableSpace} kg</span>
                    <span className="text-[10px] text-gray-400 block">{trip.currentLoad} kg booked out of {trip.totalCapacity} kg</span>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-xs text-emerald-600 font-bold block">Current est. price</span>
                    <span className="text-xl font-black text-emerald-700">₹{expectedMyCost}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedTrip?.id === trip.id ? (
                    <div className="bg-white p-4 rounded-xl border border-emerald-200 animate-in fade-in">
                      <label className="block text-xs font-bold text-gray-700 mb-1">Your Load Quantity (kg)</label>
                      <input 
                        type="number" 
                        value={loadInput}
                        onChange={(e) => setLoadInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      
                      <div className="bg-orange-50 border border-orange-200 p-2.5 rounded-lg mb-3">
                        <div className="text-xs text-orange-800 mb-1 flex items-start gap-1">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <span>If no additional farmers join before deadline, you may have to bear the full trip cost: <strong>₹{trip.totalFare}</strong>.</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedTrip(null)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleJoin}
                          disabled={Number(loadInput) > availableSpace || Number(loadInput) <= 0}
                          className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold disabled:opacity-50 cursor-pointer transition-colors"
                        >
                          Confirm Join
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => { setSelectedTrip(trip); setLoadInput("400"); }}
                      className="w-full py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                    >
                      Select Trip
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Dedicated Transport Option */}
        <div className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <h3 className="font-bold text-lg mb-2">Need transport immediately?</h3>
            <p className="text-gray-500 text-sm mb-4">Book a dedicated truck. No waiting for shared farmers, immediate pickup.</p>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4">
              <span className="text-xs text-gray-500 block">Estimated Dedicated Cost</span>
              <span className="text-xl font-bold text-gray-900">₹{order ? order.transportCost || 1000 : 3000}</span>
            </div>
          </div>
          {dedicatedRequests.some(r => r.status === 'PENDING') ? (
            <button disabled className="w-full py-2.5 bg-gray-200 text-gray-500 font-bold rounded-xl text-sm shadow-sm cursor-not-allowed">
              Request Pending...
            </button>
          ) : dedicatedRequests.some(r => r.status === 'ACCEPTED') ? (
            <button disabled className="w-full py-2.5 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-sm shadow-sm cursor-not-allowed border border-emerald-300 flex items-center justify-center gap-2">
              <CheckCircle2 size={16} /> Transporter Assigned
            </button>
          ) : (
            <button 
              onClick={() => requestDedicatedTransport(
                order ? `${order.pickupLocation} → ${order.dropLocation}` : "Katol Farm A → Nagpur", 
                order ? `${order.quantity} ${order.unit} ${order.crop}` : "Up to 3000 kg", 
                order ? order.transportCost || 1000 : 3000
              )}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-sm"
            >
              Find Dedicated Transport
            </button>
          )}
        </div>
      </div>

      {/* Fair Fare Breakdown Modal */}
      {showFareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-900">Why is this trip ₹3,450?</h3>
              <button onClick={() => setShowFareModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">Platform-calculated fair fare ensures transparency and prevents arbitrary pricing by transporters.</p>
            
            <div className="space-y-2 text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between"><span>Base vehicle charge</span><span>₹500</span></div>
              <div className="flex justify-between"><span>Distance charge (150km)</span><span>₹2,250</span></div>
              <div className="flex justify-between"><span>Loading/unloading</span><span>₹400</span></div>
              <div className="flex justify-between"><span>Tolls</span><span>₹300</span></div>
              <div className="border-t border-gray-300 my-2 pt-2 flex justify-between font-bold text-gray-900 text-base">
                <span>Total Trip Fare</span><span>₹3,450</span>
              </div>
            </div>
            
            <button 
              onClick={() => setShowFareModal(false)}
              className="w-full mt-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
