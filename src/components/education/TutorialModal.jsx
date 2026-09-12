import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from '../Icons';

export default function TutorialModal({ tutorial, onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!tutorial || !tutorial.steps || tutorial.steps.length === 0) return null;

  const totalSteps = tutorial.steps.length;
  const stepData = tutorial.steps[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) onComplete(tutorial.id);
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Optional: Handle element highlighting by adding a class to the target element
  useEffect(() => {
    if (tutorial.steps) {
      // Remove highlight from all potential targets first
      tutorial.steps.forEach(step => {
        if (step.highlightElement) {
          const el = document.getElementById(step.highlightElement);
          if (el) {
            el.classList.remove('ring-4', 'ring-emerald-500', 'ring-opacity-50', 'z-50', 'relative', 'animate-pulse');
          }
        }
      });

      // Add highlight to current target
      if (stepData.highlightElement) {
        const el = document.getElementById(stepData.highlightElement);
        if (el) {
          el.classList.add('ring-4', 'ring-emerald-500', 'ring-opacity-50', 'z-50', 'relative', 'animate-pulse');
        }
      }
    }

    // Cleanup on unmount
    return () => {
      if (tutorial.steps) {
        tutorial.steps.forEach(step => {
          if (step.highlightElement) {
            const el = document.getElementById(step.highlightElement);
            if (el) {
              el.classList.remove('ring-4', 'ring-emerald-500', 'ring-opacity-50', 'z-50', 'relative', 'animate-pulse');
            }
          }
        });
      }
    };
  }, [currentStep, tutorial, stepData]);


  return (
    <div className="fixed inset-0 z-[200] bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-emerald-50">
          <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
            <span>{tutorial.icon}</span> {tutorial.title}
          </h3>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-emerald-100 rounded-full text-emerald-700 cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center min-h-[200px]">
          <h4 className="text-xl font-bold text-gray-900 mb-3">{stepData.title}</h4>
          <p className="text-gray-600 text-lg leading-relaxed">{stepData.content}</p>
        </div>

        {/* Footer / Controls */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-sm font-bold text-gray-400">
            {currentStep + 1} / {totalSteps}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1 transition-colors ${
                currentStep === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-200 cursor-pointer'
              }`}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              {currentStep === totalSteps - 1 ? 'Finish' : 'Next'} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
