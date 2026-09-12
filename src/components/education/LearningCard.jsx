import React, { useState } from 'react';
import { CheckCircle2, ChevronRight } from '../Icons';
import TutorialModal from './TutorialModal';
import { useEMandi } from '../../context/EMandiContext';

export default function LearningCard({ tutorial }) {
  const [showModal, setShowModal] = useState(false);
  const { completedModules, markModuleCompleted } = useEMandi();

  const isCompleted = completedModules.includes(tutorial.id);

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer flex flex-col h-full"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-emerald-100">
            {tutorial.icon}
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 size={12} /> COMPLETED
            </div>
          )}
        </div>
        
        <h3 className="text-base font-bold text-gray-900 mb-1">{tutorial.title}</h3>
        <p className="text-sm text-gray-500 flex-1 mb-4">{tutorial.description}</p>
        
        <div className="flex items-center justify-between text-emerald-600 font-bold text-sm pt-3 border-t border-gray-50">
          <span>{tutorial.steps.length} Steps</span>
          <span className="flex items-center gap-1">Start <ChevronRight size={16} /></span>
        </div>
      </div>

      {showModal && (
        <TutorialModal 
          tutorial={tutorial} 
          onClose={() => setShowModal(false)}
          onComplete={markModuleCompleted}
        />
      )}
    </>
  );
}
