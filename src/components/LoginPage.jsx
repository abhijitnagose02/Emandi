import React, { useState } from 'react';
import { Tractor, Users, Landmark, HeartHandshake, ChevronDown, Check } from './Icons';
import TutorialModal from './education/TutorialModal';
import { loginTutorial } from './education/TutorialData';

const LANGUAGES = ["English", "हिन्दी", "मराठी", "తెలుగు", "தமிழ்", "ਪੰਜਾਬੀ", "ಕನ್ನಡ", "ગુજરાતી", "മലയാളം", "অসমীয়া", "ଓଡ଼ିଆ", "বাংলা", "कश्मीरी", "कोकबोरोक", "डोगरी", "नेपाली", "सिंधी",];

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

const ROLES = [
  { name: "Farmer", icon: Tractor },
  { name: "Buyer", icon: Users },
  { name: "Transporter", icon: Landmark },
  { name: "NGO", icon: HeartHandshake },
];

export default function LoginPage({ onLogin }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(STATES[0]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length === 10 && selectedRole) {
      setStep(2);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === "1234" || otp.length === 4) {
      if (onLogin) {
        onLogin({
          phone,
          language: selectedLanguage,
          state: selectedState,
          role: selectedRole
        });
      }
    } else {
      alert("Please enter 4 digits (e.g. 1234)");
    }
  };

  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header Branding */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.jpg"
            alt="e-mandi Logo"
            className="w-24 h-24 rounded-full mb-3 object-cover shadow-md border-2 border-emerald-100"
          />
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">e-mandi</h1>
          <p className="text-text-secondary text-center mt-1 text-sm font-medium">
            Connecting Farmers to Better Markets
          </p>
        </div>

        {/* Education Module 1: Login Tutorial */}
        <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <h3 className="text-sm font-bold text-emerald-900 mb-1">New to E-Mandi?</h3>
          <p className="text-xs text-emerald-700 mb-3">Don't know how to login?</p>
          <button 
            onClick={() => setShowTutorial(true)}
            className="text-xs font-bold bg-white text-emerald-700 px-4 py-2 rounded-lg shadow-sm border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            Learn How to Login
          </button>
        </div>

        {/* Step 1: Initial Login Form */}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            {/* Select Language */}
            <div className="mb-4">
              <label htmlFor="language" className="block text-sm font-medium text-text-secondary mb-1">
                Select Language
              </label>
              <div className="relative">
                <button
                  id="language"
                  type="button"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary flex justify-between items-center cursor-pointer"
                >
                  <span>{selectedLanguage.split(" ")[0]}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isLangOpen && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {LANGUAGES.map((lang) => {
                      const [main, sub] = lang.split(" ");
                      const isSelected = lang === selectedLanguage;
                      return (
                        <li
                          key={lang}
                          onClick={() => handleSelectLanguage(lang)}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between transition-colors ${isSelected ? "bg-secondary text-white hover:bg-emerald-600" : "text-text-primary"
                            }`}
                        >
                          <span>
                            {main} {sub && <span className={isSelected ? "text-white/80" : "text-gray-500"}>{sub}</span>}
                          </span>
                          {isSelected && <Check size={16} />}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            {/* Select State */}
            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium text-text-secondary mb-1">
                Select State
              </label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-text-primary cursor-pointer"
              >
                {STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Role */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((roleItem) => {
                  const isSelected = selectedRole === roleItem.name;
                  const Icon = roleItem.icon;
                  return (
                    <button
                      key={roleItem.name}
                      type="button"
                      onClick={() => setSelectedRole(roleItem.name)}
                      className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer ${isSelected
                        ? "bg-primary/10 border-primary text-primary ring-2 ring-primary font-medium"
                        : "bg-gray-50 border-gray-200 text-text-secondary hover:bg-gray-100"
                        }`}
                    >
                      <Icon size={28} className="mb-1" />
                      <span className="text-xs font-semibold">{roleItem.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label htmlFor="phone-input" className="block text-sm font-medium text-text-secondary mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength={10}
                placeholder="Enter 10-digit number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                required
              />
            </div>

            {/* Send OTP Button */}
            <button
              id="login-btn"
              type="submit"
              disabled={!selectedRole || phone.length !== 10}
              className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification Form */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <p className="text-center text-sm text-text-secondary mb-4">
              Enter the 4-digit OTP sent to +91 {phone}.
            </p>
            <div className="mb-4">
              <label htmlFor="otp-input" className="block text-sm font-medium text-text-secondary mb-1">
                OTP
              </label>
              <input
                type="text"
                id="otp-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                maxLength={4}
                placeholder="_ _ _ _"
                className="w-full px-3 py-2 text-center tracking-[1em] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-lg font-semibold text-text-primary"
                autoFocus
                required
              />

            </div>
            <button
              id="login-btn"
              type="submit"
              className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors cursor-pointer shadow-sm"
            >
              Verify & Continue
            </button>
            <button
              onClick={() => setStep(1)}
              type="button"
              className="w-full text-center text-sm text-primary mt-4 hover:underline cursor-pointer"
            >
              Change Number
            </button>
          </form>
        )}

        {/* Education Modules Link */}
        <div className="mt-4 text-center">
          <button 
            onClick={() => setShowTutorial(true)}
            className="mt-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
          >
            New to E-Mandi? Learn how it works →
          </button>
        </div>

        {showTutorial && (
          <TutorialModal 
            tutorial={loginTutorial} 
            onClose={() => setShowTutorial(false)} 
          />
        )}
      </div>
    </div>
  );
}
