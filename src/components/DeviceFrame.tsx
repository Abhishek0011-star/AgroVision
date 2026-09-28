import React from 'react';
import { Wifi, Battery, Signal, Home, Camera, FileText, User } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  isFramed: boolean;
  currentScreen: 'auth' | 'dashboard' | 'scan' | 'report';
  onNavigate: (screen: 'auth' | 'dashboard' | 'scan' | 'report') => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  isFramed,
  currentScreen,
  onNavigate,
}) => {
  const showBottomNav = currentScreen !== 'auth' && currentScreen !== 'scan';

  if (!isFramed) {
    return (
      <div className="w-full h-full flex flex-col bg-[#F9FBF8] text-stone-900 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        {showBottomNav && (
          <div className="w-full bg-white/95 backdrop-blur-md border-t border-stone-200 py-2 px-6 flex justify-around items-center z-40">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex flex-col items-center gap-1 text-xs font-medium py-1 px-4 rounded-xl transition-colors ${
                currentScreen === 'dashboard' ? 'text-emerald-700 font-semibold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Home className={`w-5 h-5 ${currentScreen === 'dashboard' ? 'text-emerald-700 stroke-[2.5]' : ''}`} />
              <span>Home</span>
            </button>
            <button
              onClick={() => onNavigate('scan')}
              className="flex flex-col items-center gap-1 text-xs font-medium py-1 px-4 rounded-xl text-emerald-800 hover:text-emerald-900"
            >
              <div className="w-10 h-10 -mt-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-700/30">
                <Camera className="w-5 h-5" />
              </div>
              <span className="font-semibold text-emerald-800">Scan</span>
            </button>
            <button
              onClick={() => onNavigate('report')}
              className={`flex flex-col items-center gap-1 text-xs font-medium py-1 px-4 rounded-xl transition-colors ${
                currentScreen === 'report' ? 'text-emerald-700 font-semibold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileText className={`w-5 h-5 ${currentScreen === 'report' ? 'text-emerald-700 stroke-[2.5]' : ''}`} />
              <span>Report</span>
            </button>
            <button
              onClick={() => onNavigate('auth')}
              className="flex flex-col items-center gap-1 text-xs font-medium py-1 px-4 rounded-xl text-stone-500 hover:text-stone-800"
            >
              <User className="w-5 h-5" />
              <span>Account</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden bg-stone-950">
      {/* Smartphone Outer Chassis */}
      <div className="relative w-full max-w-[412px] h-[840px] max-h-[92vh] bg-stone-900 rounded-[48px] p-3 shadow-2xl shadow-emerald-950/40 border-[4px] border-stone-700/80 flex flex-col overflow-hidden ring-1 ring-white/10">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-stone-950 rounded-full z-50 flex items-center justify-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* Screen Bezel & Display Area */}
        <div className="relative flex-1 bg-[#F9FBF8] rounded-[38px] overflow-hidden flex flex-col text-stone-900">
          {/* Mobile Status Bar */}
          <div className="w-full h-10 px-6 pt-2 pb-1 flex items-center justify-between text-[11px] font-semibold text-stone-700 select-none z-40 bg-transparent">
            <span>10:45</span>
            <div className="flex items-center gap-1.5 text-stone-700">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-mono-numbers">94%</span>
                <Battery className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>

          {/* Active Screen View */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
            {children}
          </div>

          {/* Material 3 Bottom Navigation Bar */}
          {showBottomNav && (
            <div className="w-full bg-white/95 backdrop-blur-md border-t border-stone-200/80 py-1.5 px-4 flex justify-around items-center z-40 shadow-sm">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                  currentScreen === 'dashboard'
                    ? 'text-emerald-800 font-semibold'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <div className={`p-1 rounded-full ${currentScreen === 'dashboard' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-[10px]">Home</span>
              </button>

              <button
                onClick={() => onNavigate('scan')}
                className="flex flex-col items-center gap-0.5 group"
              >
                <div className="w-12 h-12 -mt-6 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-700/30 group-hover:scale-105 active:scale-95 transition-all">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-emerald-800">Scan</span>
              </button>

              <button
                onClick={() => onNavigate('report')}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                  currentScreen === 'report'
                    ? 'text-emerald-800 font-semibold'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <div className={`p-1 rounded-full ${currentScreen === 'report' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px]">Report</span>
              </button>

              <button
                onClick={() => onNavigate('auth')}
                className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-stone-400 hover:text-stone-700 transition-all"
              >
                <div className="p-1 rounded-full">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-[10px]">Account</span>
              </button>
            </div>
          )}

          {/* Mobile Home Bar Indicator */}
          <div className="w-full py-1.5 flex justify-center bg-white/95">
            <div className="w-32 h-1 bg-stone-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
