import React from 'react';
import { X, CheckCircle2, BookOpen } from '../Icons';
import { useEMandi } from '../../context/EMandiContext';
import { learningModules } from './TutorialData';
import LearningCard from './LearningCard';

export default function LearningCenter() {
  const { showLearningCenter, setShowLearningCenter, completedModules } = useEMandi();

  if (!showLearningCenter) return null;

  const totalModules = learningModules.length;
  const completedCount = completedModules.length;
  const progressPercentage = Math.round((completedCount / totalModules) * 100);

  const generalModules = learningModules.filter(m => m.category === 'General');
  const farmerModules = learningModules.filter(m => m.category === 'Farmer');
  const buyerModules = learningModules.filter(m => m.category === 'Buyer');
  const transporterModules = learningModules.filter(m => m.category === 'Transporter');

  return (
    <div className="fixed inset-0 z-[150] bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">E-Mandi Learning Center</h2>
              <p className="text-xs font-medium text-gray-500">Master the platform with interactive guides</p>
            </div>
          </div>
          <button 
            onClick={() => setShowLearningCenter(false)}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Progress Bar */}
        <section className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Your Learning Progress</h3>
              <p className="text-sm text-gray-500">Complete all modules to become an E-Mandi expert.</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-emerald-600">
                {completedCount} <span className="text-sm font-bold text-gray-400">/ {totalModules}</span>
              </div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Modules Completed</div>
            </div>
          </div>
          
          <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-1000 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          {completedCount === totalModules && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 py-2 rounded-xl border border-emerald-100">
              <CheckCircle2 size={18} /> Congratulations! You have completed all learning modules.
            </div>
          )}
        </section>

        {/* Modules by Category */}
        <div className="space-y-12">
          
          {/* General Section */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">🌱</span> Platform Basics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {generalModules.map(mod => (
                <LearningCard key={mod.id} tutorial={mod} />
              ))}
            </div>
          </section>

          {/* Farmer Section */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">🌾</span> For Farmers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {farmerModules.map(mod => (
                <LearningCard key={mod.id} tutorial={mod} />
              ))}
            </div>
          </section>

          {/* Buyer Section */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">🛒</span> For Buyers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {buyerModules.map(mod => (
                <LearningCard key={mod.id} tutorial={mod} />
              ))}
            </div>
          </section>

          {/* Transporter Section */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">🚚</span> For Transporters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {transporterModules.map(mod => (
                <LearningCard key={mod.id} tutorial={mod} />
              ))}
            </div>
          </section>

        </div>
        
        {/* Bottom spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
