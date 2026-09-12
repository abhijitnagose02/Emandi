export const loginTutorial = {
  id: "login_tutorial",
  title: "How to Login to E-Mandi",
  description: "Follow these simple steps to access your E-Mandi account.",
  icon: "🔐",
  steps: [
    {
      title: "Step 1 — Open the Login Page",
      content: "You're already on the E-Mandi Login page. This is where you access your account.",
      highlightElement: null
    },
    {
      title: "Step 2 — Enter Your Mobile Number",
      content: "Enter the 10-digit mobile number you used while creating your E-Mandi account.",
      highlightElement: "phone-input"
    },
    {
      title: "Step 3 — Enter OTP",
      content: "Enter the 4-digit OTP sent to your mobile number.",
      highlightElement: "otp-input"
    },
    {
      title: "Step 4 — Click Login",
      content: "Click the Login button to access your E-Mandi account.",
      highlightElement: "login-btn"
    },
    {
      title: "Change Number?",
      content: "If you entered the wrong number, you can go back and change it before verifying.",
      highlightElement: null
    },
    {
      title: "Step 5 — Welcome to E-Mandi",
      content: "After successful login, you will be taken to your E-Mandi dashboard.",
      highlightElement: null
    }
  ]
};

export const learningModules = [
  {
    id: "what_is_emandi",
    title: "What is E-Mandi?",
    description: "Understand how E-Mandi works.",
    icon: "🌾",
    category: "General",
    steps: [
      { title: "What E-Mandi is", content: "E-Mandi is a digital agricultural marketplace that connects farmers directly with buyers and transporters." },
      { title: "What problem it solves", content: "It eliminates unnecessary middlemen, ensuring better prices for farmers and fresher produce for buyers." },
      { title: "How farmers use it", content: "Farmers can list their harvested produce, set their prices, and negotiate directly with interested buyers." },
      { title: "How buyers use it", content: "Buyers can browse a wide range of agricultural products, verify farmer profiles, and place bulk orders." },
      { title: "How transporters use it", content: "Transporters can find available delivery jobs and optimize their routes by pooling multiple farmer shipments." },
      { title: "How the marketplace works", content: "It functions like an open market where supply and demand dictate prices, but with digital transparency." },
      { title: "How E-Mandi connects these users", content: "Through an intuitive dashboard, real-time negotiation chat, and integrated logistics tracking." }
    ]
  },
  {
    id: "dashboard_guide",
    title: "Dashboard",
    description: "Learn how to navigate E-Mandi.",
    icon: "📊",
    category: "General",
    steps: [
      { title: "Home", content: "Your main overview, showing quick stats, active deals, and personalized recommendations." },
      { title: "Marketplace", content: "The central hub where all agricultural produce is listed for buying and selling." },
      { title: "Orders", content: "Track the status of your purchases or sales, from negotiation to final delivery." },
      { title: "Transportation", content: "Manage logistics, request a dedicated truck, or join a shared transport pool." },
      { title: "Messages", content: "Communicate directly with other users to negotiate prices and confirm details." },
      { title: "AI Insights", content: "View smart analytics predicting market trends, fair pricing, and weather forecasts." },
      { title: "Profile", content: "Manage your personal details, verify your identity, and set privacy preferences." },
      { title: "Notifications", content: "Stay updated with real-time alerts about your orders, messages, and transport." }
    ]
  },
  {
    id: "farmer_guide",
    title: "Farmer Guide",
    description: "Learn how farmers sell products.",
    icon: "🌾",
    category: "Farmer",
    steps: [
      { title: "Create farmer profile", content: "Add details about your farm size, location, and the main crops you grow." },
      { title: "Add agricultural products", content: "List the produce you have harvested and want to sell." },
      { title: "Add product quantity", content: "Specify exactly how much stock you have available in kilograms or tons." },
      { title: "Set price", content: "Determine your asking price per unit based on current market trends." },
      { title: "Add product details", content: "Include high-quality photos and descriptions of the crop's grade and freshness." },
      { title: "Find buyers", content: "Wait for buyers to send you offers or proactively reach out to potential buyers." },
      { title: "Manage orders", content: "Accept offers, track payment status, and prepare your produce for dispatch." },
      { title: "Request transportation", content: "Arrange for a transporter to pick up the produce directly from your farm." }
    ]
  },
  {
    id: "buyer_guide",
    title: "Buyer Guide",
    description: "Learn how buyers find and purchase products.",
    icon: "🛒",
    category: "Buyer",
    steps: [
      { title: "Browse marketplace", content: "Explore the live listings of fresh agricultural produce from various farmers." },
      { title: "Search products", content: "Use the search bar to find specific crops like onions, tomatoes, or wheat." },
      { title: "Apply filters", content: "Filter results by location, price range, verification status, and crop grade." },
      { title: "View product details", content: "Check the farmer's profile, read reviews, and inspect the product photos." },
      { title: "Contact farmer", content: "Initiate a chat with the farmer to ask questions about the produce." },
      { title: "Make an offer", content: "Propose a price for the quantity you need through the live negotiation feature." },
      { title: "Place order", content: "Once the farmer accepts your offer, the deal is finalized and the order is placed." },
      { title: "Track order", content: "Monitor the transportation status until the produce is delivered to your location." }
    ]
  },
  {
    id: "transporter_guide",
    title: "Transporter Guide",
    description: "Learn how transportation works.",
    icon: "🚚",
    category: "Transporter",
    steps: [
      { title: "Create transporter profile", content: "Register your transport business and verify your fleet details." },
      { title: "Add vehicle", content: "List the types of trucks or vehicles you have available and their cargo capacity." },
      { title: "View delivery requests", content: "Browse the board for farmers who need their produce shipped to buyers." },
      { title: "Accept delivery request", content: "Review the route and payment, and accept the job if it fits your schedule." },
      { title: "Manage pickup", content: "Navigate to the farmer's location, verify the goods, and confirm pickup." },
      { title: "Update delivery status", content: "Keep the buyer informed by updating your status to 'In Transit'." },
      { title: "Complete delivery", content: "Drop off the produce at the buyer's location and collect your payment." }
    ]
  },
  {
    id: "orders_payments",
    title: "Orders",
    description: "Understand the order and delivery process.",
    icon: "📦",
    category: "General",
    steps: [
      { title: "Order Placed", content: "A buyer sends a formal purchase offer to a farmer." },
      { title: "Farmer Accepts", content: "The farmer reviews the price and quantity, and accepts the deal." },
      { title: "Product Prepared", content: "The farmer packs the produce and gets it ready for pickup at the farm." },
      { title: "Transport Assigned", content: "A transporter is hired to move the goods from the farm to the buyer." },
      { title: "Product Delivered", content: "The transporter successfully drops the goods at the buyer's destination." },
      { title: "Order Completed", content: "The buyer verifies the quality, and the final payment is released." },
      { title: "Payment Flow", content: "Payments are held securely in escrow until the delivery is verified, protecting both parties." }
    ]
  },
  {
    id: "ai_features",
    title: "AI Features",
    description: "Understand E-Mandi's smart features.",
    icon: "🤖",
    category: "General",
    steps: [
      { title: "AI Buyer-Seller Matching", content: "AI helps connect suitable farmers and buyers based on products, quantity, location and requirements." },
      { title: "AI Price Insights", content: "Helps users understand whether a product price is competitive based on real-time market data." },
      { title: "Demand Prediction", content: "Analyzes marketplace trends to estimate future demand, helping farmers decide what to plant." },
      { title: "Smart Logistics", content: "Helps identify efficient transportation options by pooling nearby shipments together." },
      { title: "Smart Recommendations", content: "Suggests relevant products or opportunities based on your past marketplace activity." }
    ]
  },
  {
    id: "iot_monitoring",
    title: "IoT Monitoring",
    description: "Learn how smart farm monitoring works.",
    icon: "🌱",
    category: "Farmer",
    steps: [
      { title: "IoT Sensors", content: "Small connected devices placed in the soil and around the farm collect environmental data." },
      { title: "Farm Data", content: "Sensors monitor Temperature, Humidity, Soil Moisture, and precise GPS Location." },
      { title: "E-Mandi Platform", content: "The data is transmitted wirelessly to the E-Mandi cloud platform in real-time." },
      { title: "Dashboard", content: "Farmers can view live metrics directly on their E-Mandi dashboard." },
      { title: "Smart Insights", content: "The system provides automated alerts, like warning the farmer if the soil is too dry." }
    ]
  }
];

export const quickTourSteps = [
  {
    title: "Step 1 — Marketplace",
    content: "Find agricultural products and explore available listings.",
  },
  {
    title: "Step 2 — Orders",
    content: "Manage your buying and selling orders here.",
  },
  {
    title: "Step 3 — Transportation",
    content: "Manage delivery and transportation.",
  },
  {
    title: "Step 4 — AI Insights",
    content: "View smart recommendations and insights.",
  },
  {
    title: "Step 5 — Profile",
    content: "Manage your E-Mandi account.",
  }
];
