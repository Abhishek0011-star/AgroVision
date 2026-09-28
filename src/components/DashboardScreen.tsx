import React, { useState } from 'react';
import {
  Camera,
  TrendingUp,
  MapPin,
  Bell,
  ArrowRight,
  Layers,
  ChevronRight,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  IndianRupee,
  RefreshCw,
} from 'lucide-react';
import { ScanReport, MandiPrice, Language } from '../types/onion';
import { MANDI_PRICES, TRANSLATIONS, MANDI_BANNER } from '../data/mockData';

interface DashboardScreenProps {
  onStartScan: () => void;
  onSelectReport: (report: ScanReport) => void;
  reports: ScanReport[];
  language: Language;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onStartScan,
  onSelectReport,
  reports,
  language,
}) => {
  const [selectedMandiIndex, setSelectedMandiIndex] = useState(0);
  const [showMandiModal, setShowMandiModal] = useState(false);

  const t = TRANSLATIONS[language];
  const currentMandi: MandiPrice = MANDI_PRICES[selectedMandiIndex];

  // Summary statistics
  const avgGradeA = (
    reports.reduce((acc, curr) => acc + curr.gradeAPercentage, 0) / (reports.length || 1)
  ).toFixed(1);

  return (
    <div className="flex-1 px-4 py-4 space-y-4 pb-8">
      {/* Personalized Greeting Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-emerald-800/20">
              RP
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-900 tracking-tight leading-tight">
              {t.welcome}
            </h2>
            <button
              onClick={() => setShowMandiModal(true)}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900 mt-0.5"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{currentMandi.mandi}</span>
              <span className="text-[10px] text-stone-400">▼</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMandiModal(true)}
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-emerald-700 shadow-sm transition-colors"
            title="Switch APMC Mandi"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="relative">
            <button
              className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 shadow-sm"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600" />
          </div>
        </div>
      </div>

      {/* Quick Market Insights Card (Today's Onion Price per kg) */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm relative overflow-hidden">
        {/* Subtle background graphic */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/60 rounded-full -mr-10 -mt-10 pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>{t.todayModalPrice}</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
            +{currentMandi.change > 0 ? `₹${currentMandi.change}` : `₹${Math.abs(currentMandi.change)}`} today
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2 relative z-10">
          <span className="text-3xl font-extrabold text-stone-900 font-mono-numbers">
            ₹{currentMandi.modalPrice.toFixed(2)}
          </span>
          <span className="text-sm font-semibold text-stone-500">
            {t.perKg} ({t.modalRate})
          </span>
        </div>

        {/* Mandi Min-Max & Arrivals Breakdown */}
        <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 relative z-10">
          <div>
            <span className="text-[11px] text-stone-400 block">Min Rate</span>
            <span className="text-xs font-bold text-stone-700 font-mono-numbers">
              ₹{currentMandi.minPrice.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-stone-400 block">Max Rate (Grade A)</span>
            <span className="text-xs font-bold text-emerald-700 font-mono-numbers">
              ₹{currentMandi.maxPrice.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-stone-400 block">{t.arrivals}</span>
            <span className="text-xs font-bold text-stone-700 font-mono-numbers">
              {currentMandi.arrivalsTon.toLocaleString()} Tons
            </span>
          </div>
        </div>
      </div>

      {/* Massive Prominent Floating Card: "Start Smart AI Scan" */}
      <div
        onClick={onStartScan}
        className="group relative cursor-pointer overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 text-white shadow-xl shadow-emerald-950/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        {/* Decorative scanning grid pattern & radar rings */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full border border-emerald-400/20 animate-pulse pointer-events-none" />
        <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full border border-emerald-400/30 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            {/* Dynamic Camera/Video Icon with glowing aura */}
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner group-hover:bg-white/25 transition-colors">
              <Camera className="w-7 h-7 text-emerald-300" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-emerald-300" />
              <span>Occlusion Solver</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold tracking-tight text-white font-display">
              {t.startSmartScan}
            </h3>
            <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
              {t.scanSubtext}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs shadow-md group-hover:bg-emerald-50 transition-colors">
              <span>{t.scanNow}</span>
              <ArrowRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-0.5 transition-transform" />
            </div>

            <span className="text-[11px] font-semibold text-emerald-300/80">
              Dual-Surface Camera &bull; 5s Video
            </span>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-stone-500 block">Avg Grade A</span>
            <span className="text-base font-extrabold text-stone-900 font-mono-numbers">
              {avgGradeA}%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-stone-500 block">Grade Premium</span>
            <span className="text-base font-extrabold text-emerald-700 font-mono-numbers">
              +₹6.00/kg
            </span>
          </div>
        </div>
      </div>

      {/* Recent Reports List */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-stone-800 tracking-tight">
            {t.recentReports}
          </h3>
          <span className="text-xs font-semibold text-stone-400">
            {reports.length} Batches
          </span>
        </div>

        <div className="space-y-2.5">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                {/* Grade Badge Circle */}
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center text-emerald-800 font-bold">
                  <span className="text-xs font-mono-numbers">
                    {report.gradeAPercentage.toFixed(0)}%
                  </span>
                  <span className="text-[9px] uppercase tracking-tighter text-emerald-600 font-semibold">
                    Grade A
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">
                      {report.lotNumber}
                    </span>
                    <span className="text-[10px] text-stone-400">&bull;</span>
                    <span className="text-[11px] font-semibold text-emerald-700 font-mono-numbers">
                      ₹{report.estimatedPricePerKg.toFixed(2)}/kg
                    </span>
                  </div>

                  <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                    <span>Rot: {report.defects.rotten}%</span>
                    <span>&bull;</span>
                    <span>Sprout: {report.defects.sprouted}%</span>
                  </div>

                  <span className="text-[10px] text-stone-400 block mt-0.5">
                    {report.date}
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-emerald-100 text-stone-400 group-hover:text-emerald-800 flex items-center justify-center transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* APMC Mandi Selector Modal */}
      {showMandiModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full border border-stone-200 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-stone-900">
                Select APMC Onion Mandi
              </h4>
              <button
                onClick={() => setShowMandiModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {MANDI_PRICES.map((m, idx) => (
                <div
                  key={m.mandi}
                  onClick={() => {
                    setSelectedMandiIndex(idx);
                    setShowMandiModal(false);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedMandiIndex === idx
                      ? 'border-emerald-600 bg-emerald-50/50'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">{m.mandi}</h5>
                    <p className="text-[11px] text-stone-500">{m.state}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-stone-900 font-mono-numbers">
                      ₹{m.modalPrice.toFixed(2)}/kg
                    </span>
                    <span className="text-[10px] text-emerald-700 block font-medium">
                      Max: ₹{m.maxPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
