import React from 'react';
import { Smartphone, Code, Languages, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { Language } from '../types/onion';
import { TRANSLATIONS } from '../data/mockData';

interface HeaderNavProps {
  activeView: 'simulator' | 'flutter-code';
  setActiveView: (view: 'simulator' | 'flutter-code') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isFramed: boolean;
  setIsFramed: (framed: boolean) => void;
  currentScreenTitle: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeView,
  setActiveView,
  language,
  setLanguage,
  isFramed,
  setIsFramed,
  currentScreenTitle,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="w-full bg-stone-900 border-b border-stone-800 text-stone-200 px-4 py-3 flex items-center justify-between z-50">
      {/* Brand & SIH Badge */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
          <span className="text-xl leading-none">🧅</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-stone-100 tracking-tight text-base font-display">AgriVision</h1>
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              SIH 2026
            </span>
          </div>
          <p className="text-xs text-stone-400 hidden sm:block">
            AI Onion Grading & Occlusion Detection
          </p>
        </div>
      </div>

      {/* Center status for screen */}
      <div className="hidden lg:flex items-center gap-2 text-xs text-stone-400 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/60">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Active View:</span>
        <strong className="text-stone-200 font-medium">{currentScreenTitle}</strong>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <div className="relative flex items-center bg-stone-800 border border-stone-700 rounded-lg p-0.5 text-xs">
          <Languages className="w-3.5 h-3.5 ml-2 text-stone-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-stone-200 text-xs px-2 py-1 pr-6 rounded focus:outline-none cursor-pointer appearance-none"
            title="Select Language"
          >
            <option value="en" className="bg-stone-800 text-stone-100">English</option>
            <option value="hi" className="bg-stone-800 text-stone-100">हिंदी (Hindi)</option>
            <option value="mr" className="bg-stone-800 text-stone-100">मराठी (Marathi)</option>
          </select>
        </div>

        {/* View Switcher: Live Simulator vs Flutter Dart Code */}
        <div className="flex items-center bg-stone-800 border border-stone-700 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => setActiveView('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeView === 'simulator'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">App Preview</span>
          </button>
          <button
            onClick={() => setActiveView('flutter-code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeView === 'flutter-code'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Flutter Dart Code</span>
          </button>
        </div>

        {/* Frame Toggle */}
        {activeView === 'simulator' && (
          <button
            onClick={() => setIsFramed(!isFramed)}
            className="p-1.5 text-stone-400 hover:text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors"
            title={isFramed ? 'Switch to Full Screen' : 'Switch to Phone Frame'}
          >
            {isFramed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    </header>
  );
};
