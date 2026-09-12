import React, { useState } from 'react';
import TutorialModal from './TutorialModal';
import { learningModules } from './TutorialData';

export default function HelpButton({ tutorialId, title = "Help", className = "" }) {
  const [showModal, setShowModal] = useState(false);

  const tutorial = learningModules.find(m => m.id === tutorialId);

  if (!tutorial) return null;

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 transition-colors cursor-pointer ${className}`}
        title={`Help: ${tutorial.title}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        {title}
      </button>

      {showModal && (
        <TutorialModal 
          tutorial={tutorial} 
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
