import React, { createContext, useContext, useState, useEffect } from 'react';

const FarmLinkContext = createContext();

export const INITIAL_LISTINGS = [
  {
    id: "L-101",
    crop: "Red Onion (लाल कांदा)",
    variety: "Nashik Red",
    quantity: 500,
    unit: "kg",
    grade: "Grade A",
    expectedPrice: 28,
    farmerName: "Suresh Patil",
    farmerPhone: "9876543210",
    pickupLocation: "Katol Farm A, Nagpur, Maharashtra",
    harvestDate: "15 Sep 2026",
    status: "Available",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    moisture: "12%",
    description: "Naturally cured export-quality onions. Firm texture, uniform 55mm+ size.",
    createdAt: "Today, 08:30 AM"
  },
  {
    id: "L-102",
    crop: "Sharbati Wheat (गेहूं)",
    variety: "MP Sharbati",
    quantity: 1200,
    unit: "kg",
    grade: "Grade A+",
    expectedPrice: 32,
    farmerName: "Rameshwar Rao",
    farmerPhone: "9823114455",
    pickupLocation: "Sehore Mandi Route, Madhya Pradesh",
    harvestDate: "10 Sep 2026",
    status: "Available",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
    moisture: "9%",
    description: "Golden heavy grains, pest-free storage, high protein content.",
    createdAt: "Yesterday"
  },
  {
    id: "L-103",
    crop: "Yellow Soybean (सोयाबीन)",
    variety: "JS-335",
    quantity: 800,
    unit: "kg",
    grade: "Grade B+",
    expectedPrice: 46,
    farmerName: "Gajanan Deshmukh",
    farmerPhone: "9877221144",
    pickupLocation: "Wardha Agri Hub, Maharashtra",
    harvestDate: "18 Sep 2026",
    status: "Available",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80",
    moisture: "11%",
    description: "High oil yield seeds, cleaned and graded for mill processing.",
    createdAt: "2 days ago"
  },
  {
    id: "L-104",
    crop: "Hybrid Tomatoes (टमाटर)",
    variety: "Abhinav 105",
    quantity: 400,
    unit: "kg",
    grade: "Grade A",
    expectedPrice: 22,
    farmerName: "Pandurang Koli",
    farmerPhone: "9855332211",
    pickupLocation: "Pimpalgaon, Nashik, Maharashtra",
    harvestDate: "Today",
    status: "Available",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    moisture: "Fresh",
    description: "Hand-picked early morning harvest. Firm skin, ideal for transport.",
    createdAt: "Today, 06:15 AM"
  },
  {
    id: "L-105",
    crop: "Organic Potatoes (आलू)",
    variety: "Jyoti",
    quantity: 1500,
    unit: "kg",
    grade: "Grade A",
    expectedPrice: 18,
    farmerName: "Baldev Singh",
    farmerPhone: "9811223344",
    pickupLocation: "Sanwer Belt, Indore, Madhya Pradesh",
    harvestDate: "12 Sep 2026",
    status: "Available",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    moisture: "Cured",
    description: "No chemical sprays, cold-chain ready, uniform medium-large size.",
    createdAt: "3 days ago"
  }
];

export const INITIAL_NEGOTIATION = {
  id: "NEG-101",
  listingId: "L-101",
  crop: "Red Onion (लाल कांदा)",
  quantity: 500,
  unit: "kg",
  buyerName: "FreshDirect Procurement",
  buyerLocation: "Central Wholesale Yard, Nagpur",
  farmerName: "Suresh Patil",
  farmerLocation: "Katol Farm A, Nagpur",
  askingPrice: 28,
  currentOffer: 25,
  lastOfferBy: "buyer", // "buyer" | "farmer" - who made the last offer/counter
  deliveryPreference: "IMMEDIATE", // IMMEDIATE or POOL
  status: "IN_PROGRESS", // "OPEN", "IN_PROGRESS", "ACCEPTED", "REJECTED"
  history: [
    { sender: "Farmer", role: "farmer", price: 28, message: "Freshly harvested Grade-A onions, asking ₹28/kg.", time: "10:00 AM", type: "initial" },
    { sender: "Buyer", role: "buyer", price: 24, message: "Interested in full 500kg lot. We offer ₹24/kg for prompt pickup.", time: "10:15 AM", type: "offer" },
    { sender: "Farmer", role: "farmer", price: 26, message: "Transport quality is exceptional. Can meet at ₹26/kg.", time: "10:30 AM", type: "counter" },
    { sender: "Buyer", role: "buyer", price: 25, message: "Fair middle ground at ₹25/kg. We will finalize immediately.", time: "10:45 AM", type: "counter" }
  ]
};

export const INITIAL_ORDER = null;

export function FarmLinkProvider({ children, initialUser, onLogout }) {
  const getDefaultName = (role) => {
    if (role === 'Farmer') return 'Suresh Patil';
    if (role === 'Buyer') return 'FreshDirect Procurement';
    if (role === 'Transporter') return 'Ramesh Logix (Ramesh Transports)';
    return 'Samarth NGO';
  };

  const getDefaultLocation = (role) => {
    if (role === 'Farmer') return 'Katol Farm A, Nagpur, Maharashtra';
    if (role === 'Buyer') return 'Central Wholesale Yard, Nagpur';
    if (role === 'Transporter') return 'Nagpur Bypass Logistics Hub';
    return 'Amravati Division, Maharashtra';
  };

  const [currentUser, setCurrentUser] = useState(() => {
    if (!initialUser) {
      return {
        name: "Suresh Patil",
        role: "Farmer",
        phone: "9876543210",
        location: "Katol Farm A, Nagpur, Maharashtra",
        state: "Maharashtra",
        language: "English"
      };
    }
    return {
      ...initialUser,
      name: initialUser.name || getDefaultName(initialUser.role),
      location: initialUser.location || getDefaultLocation(initialUser.role)
    };
  });

  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, marketplace, listings, negotiations, orders, transport, settlement, profile
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [negotiation, setNegotiation] = useState(INITIAL_NEGOTIATION);
  const [order, setOrder] = useState(null);
  
  // Transport pool state for consolidation
  const [transportPool, setTransportPool] = useState({
    id: "TP-104",
    destination: "Nagpur Central Wholesale Market",
    maxCapacity: 2000,
    vehicleType: "Eicher Pro 2049 (2.5 Ton)",
    orders: [
      {
        orderId: "ORD-101",
        farmer: "Suresh Patil (Farm A)",
        crop: "Red Onion",
        quantity: 500,
        pickupStop: "Stop 1: Katol Farm A (Nagpur)",
        baseShare: 667,
        routeAdjustment: 133,
        totalShare: 800,
        status: "Confirmed"
      },
      {
        orderId: "ORD-098",
        farmer: "Namdeo Rao (Farm B)",
        crop: "Red Onion",
        quantity: 400,
        pickupStop: "Stop 2: Kalmeshwar Farm B (Nagpur)",
        baseShare: 533,
        routeAdjustment: 67,
        totalShare: 600,
        status: "Confirmed"
      },
      {
        orderId: "ORD-099",
        farmer: "Vasantrao Shinde (Farm C)",
        crop: "Red Onion",
        quantity: 600,
        pickupStop: "Stop 3: Saoner Farm C (Nagpur)",
        baseShare: 800,
        routeAdjustment: -200,
        totalShare: 600,
        status: "Confirmed"
      }
    ],
    totalTransportCost: 2000,
    stopsCount: 3
  });

  // Transporter state
  const [transporterJob, setTransporterJob] = useState({
    tripId: "TR-104",
    transporterName: "Ramesh Logix (Ramesh Transports)",
    vehicleNumber: "MH-31-AG-4091",
    status: "AVAILABLE", // AVAILABLE, ASSIGNED, PICKING_UP, IN_TRANSIT, DELIVERED, COMPLETED
    payout: 2000,
    pickupStops: [
      { stopIndex: 1, location: "Katol Farm A (Suresh Patil)", produce: "500 kg Red Onion", pickedUp: false, time: null },
      { stopIndex: 2, location: "Kalmeshwar Farm B (Namdeo Rao)", produce: "400 kg Red Onion", pickedUp: false, time: null },
      { stopIndex: 3, location: "Saoner Farm C (Vasantrao Shinde)", produce: "600 kg Red Onion", pickedUp: false, time: null }
    ],
    finalDrop: "Nagpur Central Wholesale Market (FreshDirect)",
    pickupProofUploaded: false,
    deliveryProofUploaded: false
  });

  // Global toasts / notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Price Offer Received", message: "FreshDirect offered ₹25/kg for 500kg Onion.", time: "10m ago", read: false, role: "Farmer" },
    { id: 2, title: "Transport Pool Open", message: "Pool TP-104 has 2 compatible orders to Nagpur.", time: "25m ago", read: false, role: "Buyer" }
  ]);

  // Keep currentUser synced if initialUser changes
  useEffect(() => {
    if (initialUser) {
      setCurrentUser(prev => ({
        ...prev,
        ...initialUser,
        name: initialUser.role === 'Farmer' ? 'Suresh Patil' :
              initialUser.role === 'Buyer' ? 'FreshDirect (Rajesh K.)' :
              initialUser.role === 'Transporter' ? 'Ramesh Transports' : 'Samarth NGO'
      }));
    }
  }, [initialUser]);

  // Role Switcher helper (for live demo toggle)
  const switchRole = (newRole) => {
    const roleProfiles = {
      Farmer: {
        name: "Suresh Patil",
        role: "Farmer",
        phone: "9876543210",
        location: "Katol, Nagpur, Maharashtra",
        state: "Maharashtra",
        language: currentUser.language || "English"
      },
      Buyer: {
        name: "FreshDirect Procurement",
        role: "Buyer",
        phone: "9123456780",
        location: "Central Wholesale Yard, Nagpur",
        state: "Maharashtra",
        language: currentUser.language || "English"
      },
      Transporter: {
        name: "Ramesh Logix (Ramesh Transports)",
        role: "Transporter",
        phone: "9988776655",
        location: "Nagpur Bypass Logistics Hub",
        vehicle: "Eicher Pro (MH-31-AG-4091)",
        state: "Maharashtra",
        language: currentUser.language || "English"
      },
      NGO: {
        name: "Samarth Krishi NGO",
        role: "NGO",
        phone: "9811002233",
        location: "Amravati Division",
        state: "Maharashtra",
        language: currentUser.language || "English"
      }
    };
    setCurrentUser(roleProfiles[newRole] || roleProfiles.Farmer);
    if (newRole === 'Buyer') setActiveTab('negotiations');
    else if (newRole === 'Transporter') setActiveTab('requests');
    else setActiveTab('dashboard');
  };

  // 1. Farmer creates listing
  const createListing = (newListingData) => {
    const newListing = {
      id: `L-${100 + listings.length + 1}`,
      crop: newListingData.crop,
      variety: newListingData.variety || "Standard",
      quantity: Number(newListingData.quantity),
      unit: newListingData.unit || "kg",
      grade: newListingData.grade || "Grade A",
      expectedPrice: Number(newListingData.expectedPrice),
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      pickupLocation: newListingData.pickupLocation || currentUser.location,
      harvestDate: newListingData.harvestDate || "Ready now",
      status: "Available",
      image: newListingData.image || "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
      moisture: newListingData.moisture || "Normal",
      description: newListingData.description || "Farm fresh harvest ready for pickup.",
      createdAt: "Just now"
    };
    setListings(prev => [newListing, ...prev]);
    addNotification(`New Listing Created: ${newListing.crop} (${newListing.quantity}${newListing.unit})`, "Farmer");
  };

  // 2. Buyer makes an offer (Buyer sets price X -> Farmer gets next turn to accept or counter)
  const makeOffer = (listingId, offeredPrice, customNote, deliveryPref = "IMMEDIATE") => {
    const listing = listings.find(l => l.id === listingId) || listings[0];
    const newNeg = {
      id: `NEG-${Math.floor(100 + Math.random() * 900)}`,
      listingId: listing.id,
      crop: listing.crop,
      quantity: listing.quantity,
      unit: listing.unit,
      buyerName: currentUser.name,
      buyerLocation: currentUser.location,
      farmerName: listing.farmerName,
      farmerLocation: listing.pickupLocation,
      askingPrice: listing.expectedPrice,
      currentOffer: Number(offeredPrice),
      lastOfferBy: "buyer", // Buyer made the offer -> Farmer decides next
      deliveryPreference: deliveryPref,
      status: "IN_PROGRESS",
      history: [
        { 
          sender: listing.farmerName, 
          role: "farmer", 
          price: listing.expectedPrice, 
          message: `Listing published: Expected ₹${listing.expectedPrice}/${listing.unit}`, 
          time: "Earlier",
          type: "initial"
        },
        { 
          sender: currentUser.name, 
          role: "buyer", 
          price: Number(offeredPrice), 
          message: customNote || `Offer submitted at ₹${offeredPrice}/${listing.unit}. Ready for prompt pickup.`, 
          time: "Just now",
          type: "offer"
        }
      ]
    };
    setNegotiation(newNeg);
    addNotification(`New Offer of ₹${offeredPrice}/kg on ${listing.crop} by ${currentUser.name}. Awaiting Farmer response.`, "Farmer");
  };

  // 3. Farmer counters (Farmer sets price Y -> Buyer gets next turn to accept or counter)
  const sendFarmerCounter = (counterPrice, customNote) => {
    if (!negotiation) return;
    const priceNum = Number(counterPrice);
    const updatedHistory = [
      ...negotiation.history,
      {
        sender: currentUser.name || "Suresh Patil (Farmer)",
        role: "farmer",
        price: priceNum,
        message: customNote || `Farmer countered at ₹${priceNum}/${negotiation.unit}. Premium harvest guaranteed.`,
        time: "Just now",
        type: "counter"
      }
    ];
    setNegotiation({
      ...negotiation,
      currentOffer: priceNum,
      lastOfferBy: "farmer", // Farmer made this counter -> Buyer decides next
      history: updatedHistory,
      status: "IN_PROGRESS"
    });
    addNotification(`Farmer countered with ₹${priceNum}/kg on ${negotiation.crop}. Waiting for Buyer decision.`, "Buyer");
  };

  // 4. Buyer counters (Buyer sets price Z -> Farmer gets next turn to accept or counter)
  const sendBuyerCounter = (counterPrice, customNote) => {
    if (!negotiation) return;
    const priceNum = Number(counterPrice);
    const updatedHistory = [
      ...negotiation.history,
      {
        sender: currentUser.name || "FreshDirect Procurement",
        role: "buyer",
        price: priceNum,
        message: customNote || `Buyer countered at ₹${priceNum}/${negotiation.unit}.`,
        time: "Just now",
        type: "counter"
      }
    ];
    setNegotiation({
      ...negotiation,
      currentOffer: priceNum,
      lastOfferBy: "buyer", // Buyer made this counter -> Farmer decides next
      history: updatedHistory,
      status: "IN_PROGRESS"
    });
    addNotification(`Buyer offered ₹${priceNum}/kg on ${negotiation.crop}. Waiting for Farmer decision.`, "Farmer");
  };

  // 5. Accept Offer & Lock Deal
  const acceptOffer = () => {
    if (!negotiation) return;
    const finalPrice = negotiation.currentOffer;
    const isFarmer = currentUser.role === "Farmer";
    const accepterName = currentUser.name || (isFarmer ? "Suresh Patil" : "FreshDirect");
    const updatedHistory = [
      ...negotiation.history,
      {
        sender: accepterName,
        role: currentUser.role.toLowerCase(),
        price: finalPrice,
        message: `Deal Accepted! ${accepterName} accepted the offer of ₹${finalPrice}/${negotiation.unit}. Legally binding order initiated.`,
        time: "Just now",
        type: "accept"
      }
    ];

    setNegotiation({
      ...negotiation,
      status: "ACCEPTED",
      history: updatedHistory
    });

    const newOrder = {
      orderId: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      listingId: negotiation.listingId,
      crop: negotiation.crop,
      quantity: negotiation.quantity,
      unit: negotiation.unit,
      agreedPrice: finalPrice,
      totalProduceValue: negotiation.quantity * finalPrice,
      farmer: negotiation.farmerName,
      farmerPhone: "9876543210",
      pickupLocation: negotiation.farmerLocation,
      buyer: negotiation.buyerName,
      buyerPhone: "9123456780",
      dropLocation: negotiation.buyerLocation,
      status: "ORDER_CONFIRMED", // ORDER_CONFIRMED, DELIVERY_SELECTED, TRANSPORTER_ASSIGNED, IN_TRANSIT, DELIVERED, COMPLETED
      deliveryMethod: null, // "IMMEDIATE" | "CONSOLIDATED"
      transportCost: 0,
      customerTransportShare: 0,
      transportShareFormula: "",
      poolId: null,
      createdAt: "Just now"
    };

    setOrder(newOrder);
    addNotification(`Order Confirmed! ${newOrder.crop} @ ₹${finalPrice}/kg. Select Delivery Method now.`, "All");
  };

  // Decline / Reject Offer
  const rejectOffer = (reason) => {
    if (!negotiation) return;
    const actorRole = currentUser.role === "Farmer" ? "Farmer" : "Buyer";
    const declinerName = currentUser.name || actorRole;
    const updatedHistory = [
      ...negotiation.history,
      {
        sender: declinerName,
        role: currentUser.role.toLowerCase(),
        price: negotiation.currentOffer,
        message: reason || `Offer of ₹${negotiation.currentOffer}/${negotiation.unit} was declined by ${declinerName}.`,
        time: "Just now",
        type: "reject"
      }
    ];
    setNegotiation({
      ...negotiation,
      status: "REJECTED",
      history: updatedHistory
    });
    addNotification(`Offer for ${negotiation.crop} was declined by ${actorRole}.`, "All");
  };

  // Reopen negotiation after rejection or to reset
  const reopenNegotiation = (newPrice) => {
    if (!negotiation) return;
    const actorRole = currentUser.role === "Farmer" ? "Farmer" : "Buyer";
    const priceNum = Number(newPrice) || negotiation.askingPrice || 26;
    const updatedHistory = [
      ...negotiation.history,
      {
        sender: currentUser.name || actorRole,
        role: currentUser.role.toLowerCase(),
        price: priceNum,
        message: `Negotiation restarted with new offer of ₹${priceNum}/${negotiation.unit}.`,
        time: "Just now",
        type: "offer"
      }
    ];
    setNegotiation({
      ...negotiation,
      status: "IN_PROGRESS",
      currentOffer: priceNum,
      lastOfferBy: currentUser.role.toLowerCase(),
      history: updatedHistory
    });
    addNotification(`Negotiation restarted at ₹${priceNum}/${negotiation.unit} by ${actorRole}.`, "All");
  };

  // 6. Select Delivery Method (Immediate vs Consolidated)
  const chooseDeliveryMethod = (method) => {
    if (!order) return;
    if (method === "IMMEDIATE") {
      // 75% rule prototype requirement
      const totalTransport = 1000;
      const share = 750; // 75% of 1000
      setOrder({
        ...order,
        deliveryMethod: "IMMEDIATE",
        status: "DELIVERY_SELECTED",
        transportCost: totalTransport,
        customerTransportShare: share,
        transportShareFormula: "Immediate Dedicated Rule: Customer pays 75% (₹750 of ₹1,000 transport cost)",
        poolId: null
      });

      setTransporterJob(prev => ({
        ...prev,
        tripId: "TR-IMM-101",
        status: "AVAILABLE",
        payout: totalTransport,
        pickupStops: [
          { stopIndex: 1, location: order.pickupLocation, produce: `${order.quantity} ${order.unit} ${order.crop}`, pickedUp: false, time: null }
        ],
        finalDrop: order.dropLocation
      }));

      addNotification("Immediate Delivery requested. Dispatching dedicated transporter request.", "Transporter");
    } else {
      // Consolidated
      const share = 800; // Transparent weight share
      setOrder({
        ...order,
        deliveryMethod: "CONSOLIDATED",
        status: "DELIVERY_SELECTED",
        transportCost: 2000,
        customerTransportShare: share,
        transportShareFormula: "Consolidated Pool TP-104: 500kg of 1,500kg load + Katol pickup adjustment = ₹800",
        poolId: "TP-104"
      });

      setTransporterJob(prev => ({
        ...prev,
        tripId: "TR-104",
        status: "AVAILABLE",
        payout: 2000
      }));

      addNotification("Consolidated Transport Pool TP-104 activated (3 compatible orders grouped).", "Transporter");
    }
  };

  // 7. Transporter Accepts Request
  const acceptTransportJob = () => {
    setTransporterJob(prev => ({
      ...prev,
      status: "ASSIGNED"
    }));

    if (order) {
      setOrder(prev => ({
        ...prev,
        status: "TRANSPORTER_ASSIGNED"
      }));
    }

    addNotification("Transporter Ramesh Logix (MH-31-AG-4091) accepted Trip TR-104!", "All");
  };

  // 8. Confirm Pickup for Stop
  const confirmPickupStop = (stopIndex) => {
    setTransporterJob(prev => {
      const updatedStops = prev.pickupStops.map(s => {
        if (s.stopIndex === stopIndex) {
          return { ...s, pickedUp: true, time: "Just now" };
        }
        return s;
      });

      const allPickedUp = updatedStops.every(s => s.pickedUp);
      return {
        ...prev,
        pickupStops: updatedStops,
        pickupProofUploaded: true,
        status: allPickedUp ? "IN_TRANSIT" : "PICKING_UP"
      };
    });

    if (stopIndex === 1 && order) {
      setOrder(prev => ({ ...prev, status: "IN_TRANSIT" }));
      addNotification("Stop 1 (Katol Farm A - Suresh Patil) picked up! In transit to destination.", "Farmer");
    }
  };

  // 9. Transporter Confirms Delivery at Drop Location
  const confirmDeliveryAtDrop = () => {
    setTransporterJob(prev => ({
      ...prev,
      status: "DELIVERED",
      deliveryProofUploaded: true
    }));

    if (order) {
      setOrder(prev => ({
        ...prev,
        status: "DELIVERED"
      }));
    }

    addNotification("Produce delivered at Central Wholesale Yard Nagpur! Awaiting Buyer Acceptance.", "Buyer");
  };

  // 10. Buyer Accepts Delivery & Settles
  const acceptDeliveryByBuyer = () => {
    if (order) {
      setOrder(prev => ({
        ...prev,
        status: "COMPLETED"
      }));
    }

    setTransporterJob(prev => ({
      ...prev,
      status: "COMPLETED"
    }));

    addNotification("Delivery Accepted & Payment Settled! Funds disbursed to Farmer & Transporter.", "All");
  };

  // Quick reset to start hero demo from clean state
  const resetDemo = () => {
    setListings(INITIAL_LISTINGS);
    setNegotiation(INITIAL_NEGOTIATION);
    setOrder(null);
    setTransporterJob({
      tripId: "TR-104",
      transporterName: "Ramesh Logix (Ramesh Transports)",
      vehicleNumber: "MH-31-AG-4091",
      status: "AVAILABLE",
      payout: 2000,
      pickupStops: [
        { stopIndex: 1, location: "Katol Farm A (Suresh Patil)", produce: "500 kg Red Onion", pickedUp: false, time: null },
        { stopIndex: 2, location: "Kalmeshwar Farm B (Namdeo Rao)", produce: "400 kg Red Onion", pickedUp: false, time: null },
        { stopIndex: 3, location: "Saoner Farm C (Vasantrao Shinde)", produce: "600 kg Red Onion", pickedUp: false, time: null }
      ],
      finalDrop: "Nagpur Central Wholesale Market (FreshDirect)",
      pickupProofUploaded: false,
      deliveryProofUploaded: false
    });
    addNotification("Demo scenario reset to initial state.", "All");
  };

  const addNotification = (message, targetRole) => {
    const newNotif = {
      id: Date.now(),
      title: "FarmLink Update",
      message,
      time: "Just now",
      read: false,
      role: targetRole || "All"
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 9)]);
  };

  return (
    <FarmLinkContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        activeTab,
        setActiveTab,
        listings,
        createListing,
        negotiation,
        makeOffer,
        sendFarmerCounter,
        sendBuyerCounter,
        acceptOffer,
        rejectOffer,
        reopenNegotiation,
        order,
        chooseDeliveryMethod,
        transportPool,
        transporterJob,
        acceptTransportJob,
        confirmPickupStop,
        confirmDeliveryAtDrop,
        acceptDeliveryByBuyer,
        notifications,
        resetDemo,
        onLogout
      }}
    >
      {children}
    </FarmLinkContext.Provider>
  );
}

export function useFarmLink() {
  const context = useContext(FarmLinkContext);
  if (!context) {
    throw new Error("useFarmLink must be used within a FarmLinkProvider");
  }
  return context;
}
