import React, { useState } from 'react';
import { Sprout, Phone, ShieldCheck, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserRole, Language } from '../types/onion';
import { TRANSLATIONS } from '../data/mockData';

interface AuthScreenProps {
  onLoginSuccess: (role: UserRole) => void;
  language: Language;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, language }) => {
  const [phoneNumber, setPhoneNumber] = useState('9823014782');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [role, setRole] = useState<UserRole>('farmer');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const handleSendOtp = () => {
    if (phoneNumber.length < 10) {
      setNotification('Please enter a valid 10-digit mobile number');
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    setOtpSent(true);
    setOtpValue('4829'); // Auto-populate demo OTP for smooth evaluation
    setNotification('Demo OTP: 4829 sent to +91 ' + phoneNumber);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(role);
    }, 600);
  };

  return (
    <div className="flex-1 px-6 py-6 flex flex-col justify-between bg-gradient-to-b from-[#F2F7F2] via-[#F9FBF8] to-white min-h-full">
      {/* Top Banner / Logo Section */}
      <div className="flex flex-col items-center text-center pt-4">
        {/* Animated Leaf Green Emblem */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-700/25 ring-4 ring-emerald-50">
            <span className="text-3xl">🧅</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white text-xs">
            <Sprout className="w-4 h-4" />
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-stone-900 font-display">
          {t.appName}
        </h1>
        <p className="text-xs font-medium text-emerald-800 mt-1 max-w-[280px]">
          {t.tagline}
        </p>

        {/* Hackathon Pill */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-[11px] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t.sihBadge}</span>
        </div>
      </div>

      {/* Main Authentication Form */}
      <div className="w-full my-6 bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number with Send OTP */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Mobile Number
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <span className="text-xs font-bold text-stone-600 mr-2 border-r border-stone-300 pr-2">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full bg-transparent text-sm font-semibold text-stone-800 focus:outline-none placeholder:text-stone-400 font-mono-numbers"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleSendOtp}
                className="whitespace-nowrap px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 transition-colors active:scale-95"
              >
                {otpSent ? 'Resend' : 'Send OTP'}
              </button>
            </div>
          </div>

          {/* OTP Verification Input */}
          {otpSent && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Verification Code (OTP)
                </label>
                <span className="text-[11px] text-emerald-700 font-medium">Demo: 4829</span>
              </div>
              <div className="flex items-center bg-emerald-50/50 border border-emerald-300 rounded-xl px-3 py-2.5">
                <input
                  type="text"
                  maxLength={4}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  placeholder="Enter 4-digit OTP"
                  className="w-full bg-transparent text-sm font-bold tracking-widest text-emerald-950 focus:outline-none font-mono-numbers text-center"
                />
                <CheckCircle2 className="w-5 h-5 text-emerald-600 ml-2" />
              </div>
            </div>
          )}

          {/* User Role Dropdown */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Select User Role
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-3 text-sm font-semibold text-stone-800 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
              >
                <option value="farmer">🌾 {t.roleFarmer}</option>
                <option value="buyer">🏪 {t.roleBuyer}</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                ▼
              </div>
            </div>
            <p className="text-[11px] text-stone-500 mt-1.5">
              {role === 'farmer'
                ? 'Empowering farmers with transparent Grade A grading & mandi price discovery.'
                : 'Verified bulk buyer & mandi trader quality certification ledger.'}
            </p>
          </div>

          {/* Primary Login CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-800/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Login to AgriVision</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 max-w-[90%] bg-stone-900 text-white text-xs py-2 px-4 rounded-full shadow-lg z-50 flex items-center gap-2 border border-emerald-500/40 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{notification}</span>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center pb-2">
        <p className="text-[11px] text-stone-500">
          Integrated with Lasalgaon, Pimpalgaon & Azadpur APMC Mandis
        </p>
        <p className="text-[10px] text-stone-400 mt-0.5">
          Standardized under Indian AGMARK Quality Grades
        </p>
      </div>
    </div>
  );
};
