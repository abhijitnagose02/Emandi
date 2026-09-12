import React, { createContext, useContext, useState, useEffect } from 'react';

const EMandiContext = createContext();

export const INITIAL_LISTINGS = [
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

export const INITIAL_SHARED_TRIPS = [
  {
    id: "ST-101",
    transporterName: "Raj Transport",
    route: "Chandrapur → Nagpur",
    vehicle: "1 Ton Mini Truck",
    rating: 4.8,
    totalCapacity: 1000,
    currentLoad: 0,
    totalFare: 3000,
    departureDate: "15 Sep 2026",
    departureTime: "5:00 PM",
    bookingCloses: "15 Sep 2026, 3:30 PM",
    status: "ACCEPTING", // ACCEPTING, LOCKED, IN_TRANSIT, DELIVERED
    farmers: [] // { id, name, loadAmount }
  },
  {
    id: "ST-102",
    transporterName: "Shree Logistics",
    route: "Chandrapur → Nagpur",
    vehicle: "2 Ton Eicher",
    rating: 4.6,
    totalCapacity: 2000,
    currentLoad: 800,
    totalFare: 5500,
    departureDate: "15 Sep 2026",
    departureTime: "6:00 PM",
    bookingCloses: "15 Sep 2026, 4:00 PM",
    status: "ACCEPTING",
    farmers: [
      { id: "F-1", name: "Anil More", loadAmount: 500 },
      { id: "F-2", name: "Balasaheb", loadAmount: 300 }
    ]
  }
];

export const MOCK_PROFILES = [
  {
    id: "P-F1",
    role: "Farmer",
    name: "Ramesh Patil",
    photo: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=600&auto=format&fit=crop&q=80",
    location: "Chandrapur, Maharashtra",
    isVerified: true,
    rating: 4.6,
    reviewsCount: 24,
    experience: "8 Years",
    landArea: "3.5 Acres",
    mainCrops: ["Tomato", "Onion", "Chilli"],
    farmingType: "Organic Transition",
    about: "Third-generation farmer focused on sustainable agriculture and direct market supply.",
    stats: {
      activeListings: 4,
      totalOrders: 42,
      quantitySold: "8,500 KG",
      totalEarnings: "₹1,85,000",
      successfulDeliveries: 40
    },
    verification: {
      identity: true,
      farmDetails: true,
      productHistory: true,
      deliveryHistory: true
    },
    trustScore: 92,
    reviews: [
      { author: "FreshMart", rating: 5, text: "Excellent quality tomatoes, perfectly graded." },
      { author: "Ramesh Logix", rating: 4, text: "Pickup was smooth, well packed." }
    ]
  },
  {
    id: "P-B1",
    role: "Buyer",
    name: "Neha Sharma",
    businessName: "FreshMart Retail",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    location: "Nagpur, Maharashtra",
    isVerified: true,
    rating: 4.8,
    reviewsCount: 56,
    buyerType: "Retail Buyer",
    businessType: "Supermarket Chain",
    productsPurchased: ["Onion", "Potato", "Tomato", "Wheat"],
    about: "Procurement head for a chain of 5 supermarkets in Nagpur. We source directly from farmers for fresh produce.",
    stats: {
      totalOrders: 124,
      activeOrders: 3,
      quantityPurchased: "24,000 KG",
      totalSpending: "₹6,40,000",
      successfulDeliveries: 120
    },
    verification: {
      business: true,
      contact: true,
      purchaseHistory: true,
      paymentHistory: true
    },
    trustScore: 96,
    reviews: [
      { author: "Suresh Patil", rating: 5, text: "Very reliable buyer and quick payment." },
      { author: "Anil More", rating: 5, text: "Clear requirements and fair negotiation." }
    ],
    recentPurchases: [
      { product: "Red Onion", farmer: "Suresh Patil", quantity: "500 KG", price: "₹25/kg", status: "Delivered" },
      { product: "Tomato", farmer: "Ramesh Patil", quantity: "200 KG", price: "₹22/kg", status: "In Transit" }
    ]
  },
  {
    id: "P-T1",
    role: "Transporter",
    name: "Raj Transport",
    driverName: "Rajesh Kumar",
    photo: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&auto=format&fit=crop&q=80",
    location: "Chandrapur, Maharashtra",
    isVerified: true,
    rating: 4.7,
    reviewsCount: 89,
    experience: "6 Years",
    fleetSize: "5 Vehicles",
    vehicleTypes: ["Tata 407", "17ft Truck", "Mini Truck"],
    about: "Specialized in agricultural transport across Vidarbha region. Reliable and on-time delivery.",
    stats: {
      totalTrips: 342,
      activeTrips: 2,
      completedDeliveries: 338,
      capacityDelivered: "540 Tons",
      onTimeDelivery: "98%",
      farmersServed: 120
    },
    verification: {
      identity: true,
      vehicle: true,
      routeHistory: true,
      deliveryHistory: true
    },
    trustScore: 94,
    reviews: [
      { author: "Neha Sharma", rating: 5, text: "Good transporter, delivered the produce on time." },
      { author: "Baldev Singh", rating: 4, text: "Careful with the produce during loading." }
    ],
    availableTrips: [
      { 
        route: "CHANDRAPUR → NAGPUR",
        departure: "5:00 PM",
        bookingCloses: "3:30 PM",
        vehicle: "1000 KG Truck",
        availableCapacity: 400,
        currentFarmers: 2,
        estimatedFare: 3000,
        status: "Accepting Farmers"
      }
    ]
  }
];

export function EMandiProvider({ children, initialUser, onLogout }) {
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

  const [activeTab, setActiveTab] = useState(() => {
    if (initialUser?.role === 'Buyer') return 'dashboard';
    if (initialUser?.role === 'Transporter') return 'requests';
    return 'dashboard';
  });
  
  // Profile overlay state
  const [activeProfile, setActiveProfile] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    language: "English",
    notifications: {
      orderUpdates: true,
      paymentUpdates: true,
      newRequests: true,
      transportUpdates: true,
      marketAlerts: true,
      promotions: false
    },
    privacy: {
      profileVisibility: "Public",
      showMobile: false,
      showEmail: false,
      showLocation: true
    }
  });

  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [negotiation, setNegotiation] = useState(INITIAL_NEGOTIATION);
  const [order, setOrder] = useState(null);
  const [sharedTrips, setSharedTrips] = useState(INITIAL_SHARED_TRIPS);
  const [mySharedTrip, setMySharedTrip] = useState(null);
  const [dedicatedRequests, setDedicatedRequests] = useState([]);
  
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
      if (initialUser.role === 'Buyer') setActiveTab('dashboard');
      else if (initialUser.role === 'Transporter') setActiveTab('requests');
      else setActiveTab('dashboard');
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
    if (newRole === 'Buyer') setActiveTab('dashboard');
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
  const makeOffer = (listingId, offeredPrice, customNote, deliveryPref = "IMMEDIATE", deliveryDeadline = "") => {
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
      deliveryDeadline: deliveryDeadline,
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
      title: "e-Mandi Update",
      message,
      time: "Just now",
      read: false,
      role: targetRole || "All"
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 9)]);
  };

  // --- Shared Transport Actions ---

  const joinSharedTrip = (tripId, loadAmount) => {
    const trip = sharedTrips.find(t => t.id === tripId);
    if (!trip) return;
    
    const newFarmer = {
      id: "MY-ID",
      name: currentUser.name,
      loadAmount: Number(loadAmount)
    };
    
    setSharedTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          currentLoad: t.currentLoad + newFarmer.loadAmount,
          farmers: [...t.farmers, newFarmer]
        };
      }
      return t;
    }));
    
    setMySharedTrip({ tripId, myLoad: Number(loadAmount) });
    addNotification(`Successfully joined shared trip with ${trip.transporterName}.`, "Farmer");
  };

  const addMockFarmerToTrip = (tripId, mockFarmerName, loadAmount) => {
    setSharedTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          currentLoad: t.currentLoad + loadAmount,
          farmers: [...t.farmers, { id: `MOCK-${Date.now()}`, name: mockFarmerName, loadAmount }]
        };
      }
      return t;
    }));
  };

  const removeMockFarmerFromTrip = (tripId, mockFarmerId) => {
    setSharedTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        const farmerRecord = t.farmers.find(f => f.id === mockFarmerId);
        const loadToDeduct = farmerRecord ? farmerRecord.loadAmount : 0;
        return {
          ...t,
          currentLoad: t.currentLoad - loadToDeduct,
          farmers: t.farmers.filter(f => f.id !== mockFarmerId)
        };
      }
      return t;
    }));
    addNotification("A farmer cancelled their booking. Shared trip updated.", "Farmer");
  };

  const cancelSharedTrip = (tripId, fineAmount = 0) => {
    setSharedTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        const myFarmerRecord = t.farmers.find(f => f.id === "MY-ID");
        const loadToDeduct = myFarmerRecord ? myFarmerRecord.loadAmount : 0;
        return {
          ...t,
          currentLoad: t.currentLoad - loadToDeduct,
          farmers: t.farmers.filter(f => f.id !== "MY-ID")
        };
      }
      return t;
    }));
    setMySharedTrip(null);
    if (fineAmount > 0) {
      addNotification(`Trip cancelled. ₹${fineAmount} cancellation fee applied.`, "Farmer");
    } else {
      addNotification(`Trip cancelled successfully.`, "Farmer");
    }
  };

  const lockSharedTrip = (tripId) => {
    setSharedTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return { ...t, status: "LOCKED" };
      }
      return t;
    }));
    addNotification("Booking closed. Trip finalized and price locked.", "All");
  };

  const requestDedicatedTransport = (route = "Katol Farm A → Nagpur", load = "Up to 3000 kg", estimatedCost = 3000) => {
    const newRequest = {
      id: `DREQ-${Date.now()}`,
      farmerName: currentUser.name || "Farmer",
      route: route,
      capacity: load,
      estimatedCost: estimatedCost,
      status: "PENDING"
    };
    setDedicatedRequests(prev => [newRequest, ...prev]);
    addNotification(`New dedicated transport request from ${currentUser.name || "Farmer"}`, "Transporter");
  };

  const acceptDedicatedTransport = (requestId) => {
    setDedicatedRequests(prev => prev.map(req => {
      if (req.id === requestId) return { ...req, status: "ACCEPTED" };
      return req;
    }));
    addNotification(`Transporter accepted your dedicated transport request!`, "Farmer");
  };

  const createTransporterTrip = (tripData) => {
    const newTrip = {
      id: `ST-${Date.now()}`,
      transporterName: currentUser.name,
      route: tripData.route,
      vehicle: tripData.vehicle,
      rating: 5.0,
      totalCapacity: tripData.capacity,
      currentLoad: 0,
      totalFare: tripData.platformFare,
      departureDate: tripData.departureDate,
      departureTime: tripData.departureTime,
      bookingCloses: tripData.bookingCloses,
      status: "ACCEPTING",
      farmers: []
    };
    setSharedTrips(prev => [newTrip, ...prev]);
    setActiveTab("trips");
    addNotification(`New trip published for ${tripData.departureDate}. Accepting farmers.`, "Transporter");
  };


  return (
    <EMandiContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        activeTab,
        setActiveTab,
        activeProfile,
        setActiveProfile,
        MOCK_PROFILES,
        showSettings,
        setShowSettings,
        userPreferences,
        setUserPreferences,
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
        sharedTrips,
        mySharedTrip,
        joinSharedTrip,
        addMockFarmerToTrip,
        removeMockFarmerFromTrip,
        cancelSharedTrip,
        lockSharedTrip,
        createTransporterTrip,
        dedicatedRequests,
        requestDedicatedTransport,
        acceptDedicatedTransport,
        resetDemo,
        onLogout
      }}
    >
      {children}
    </EMandiContext.Provider>
  );
}

export function useEMandi() {
  const context = useContext(EMandiContext);
  if (!context) {
    throw new Error("useEMandi must be used within a EMandiProvider");
  }
  return context;
}
