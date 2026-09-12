import React, { useState } from 'react';
import TutorialModal from './TutorialModal';
import { quickTourSteps } from './TutorialData';

export default function GuidedTour() {
  const [showTour, setShowTour] = useState(false);

  const tourTutorial = {
    id: "quick_tour",
    title: "E-Mandi Dashboard Tour",
    description: "A quick walkthrough of your new workspace.",
    icon: "🌟",
    steps: quickTourSteps
  };

  return (
    <>
      <button 
        onClick={() => setShowTour(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        Take a Quick Tour
      </button>

      {showTour && (
        <TutorialModal 
          tutorial={tourTutorial} 
          onClose={() => setShowTour(false)}
        />
      )}
    </>
  );
}
