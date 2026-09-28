import React, { useState } from 'react';
import {
  CheckCircle2,
  Share2,
  Download,
  Database,
  ArrowLeft,
  Sparkles,
  Layers,
  ChevronRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Calendar,
  MapPin,
  TrendingUp,
  FileCheck,
} from 'lucide-react';
import { ScanReport, BoundingBox, Language } from '../types/onion';
import { TRANSLATIONS } from '../data/mockData';

interface QualityReportScreenProps {
  report: ScanReport;
  onBack: () => void;
  language: Language;
  onExportPdf: () => void;
  onSaveBlockchain: () => void;
}

export const QualityReportScreen: React.FC<QualityReportScreenProps> = ({
  report,
  onBack,
  language,
  onExportPdf,
  onSaveBlockchain,
}) => {
  const [selectedSurface, setSelectedSurface] = useState<'top' | 'bottom'>('bottom'); // Default to bottom to show occlusion solution!
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [selectedBox, setSelectedBox] = useState<BoundingBox | null>(null);
  const [blockchainSaved, setBlockchainSaved] = useState(Boolean(report.blockchainHash));
  const [blockchainToast, setBlockchainToast] = useState(false);

  const t = TRANSLATIONS[language];
  const activeBoxes = selectedSurface === 'top' ? report.topBoxes : report.bottomBoxes;
  const activeImage = selectedSurface === 'top' ? report.topViewImage : report.bottomViewImage;

  // Donut chart calculations (circumference math)
  const gradeAPercent = report.gradeAPercentage;
  const ursPercent = report.ursPercentage;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const gradeAStrokeDash = (gradeAPercent / 100) * circumference;
  const ursStrokeDash = (ursPercent / 100) * circumference;

  const handleSaveToLedger = () => {
    setBlockchainSaved(true);
    setBlockchainToast(true);
    onSaveBlockchain();
    setTimeout(() => setBlockchainToast(false), 3500);
  };

  return (
    <div className="flex-1 px-4 py-4 space-y-4 pb-12 bg-[#F9FBF8]">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 py-1.5 px-3 rounded-xl shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full">
          {report.lotNumber}
        </span>
      </div>

      {/* Screen 4: "Scan Successful" Success Animation / Badge */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 p-5 text-white shadow-lg shadow-emerald-950/20 border border-emerald-700">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-emerald-300 stroke-[2.5]" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                AI Grading Completed
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-tight mt-0.5">
              Scan Successful &bull; Grade A Certified
            </h2>
            <p className="text-[11px] text-emerald-200/90 font-mono-numbers mt-0.5">
              Certificate ID: #AGRI-2026-NASHIK-9428
            </p>
          </div>
        </div>

        {/* Occlusion note tag */}
        <div className="mt-3 pt-3 border-t border-emerald-700/60 flex items-center justify-between text-[11px] text-emerald-200">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-300" />
            <span>Dual-Surface Occlusion Compensated</span>
          </span>
          <span className="font-semibold text-white">45 Bulbs Inspected</span>
        </div>
      </div>

      {/* Screen 4: Large Donut Chart visually splitting Grade A vs URS */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-stone-900">
            Grade Quality Distribution
          </h3>
          <span className="text-[11px] font-semibold text-stone-500">
            AGMARK Standard
          </span>
        </div>

        {/* SVG Donut Chart */}
        <div className="relative flex items-center justify-center py-4">
          <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="text-stone-100"
              strokeWidth="22"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Grade A arc (Forest Leaf Green) */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#2E7D32"
              strokeWidth="22"
              strokeDasharray={`${gradeAStrokeDash} ${circumference}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            {/* URS Defective arc (Red/Crimson) */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#E53935"
              strokeWidth="22"
              strokeDasharray={`${ursStrokeDash} ${circumference}`}
              strokeDashoffset={-gradeAStrokeDash}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Text inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-extrabold text-stone-900 font-mono-numbers">
              {gradeAPercent.toFixed(1)}%
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800">
              Grade A (Premium)
            </span>
            <span className="text-[10px] text-stone-400 mt-0.5">
              High Mandi Payout
            </span>
          </div>
        </div>

        {/* Donut Legend */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <div className="w-3.5 h-3.5 rounded-full bg-[#2E7D32] shrink-0" />
            <div>
              <span className="text-xs font-bold text-emerald-950 block">
                {t.gradeA}
              </span>
              <span className="text-xs font-extrabold text-[#2E7D32] font-mono-numbers">
                {gradeAPercent.toFixed(1)}% (34 Bulbs)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-rose-50/60 border border-rose-100">
            <div className="w-3.5 h-3.5 rounded-full bg-[#E53935] shrink-0" />
            <div>
              <span className="text-xs font-bold text-rose-950 block">
                {t.urs}
              </span>
              <span className="text-xs font-extrabold text-[#E53935] font-mono-numbers">
                {ursPercent.toFixed(1)}% (11 Bulbs)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Screen 4: Detailed Defect Breakdown Card */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
        <h3 className="text-sm font-bold text-stone-900 mb-1">
          Detailed Defect Breakdown
        </h3>
        <p className="text-[11px] text-stone-500 mb-3">
          Categorized under national onion export & domestic APMC parameters
        </p>

        <div className="space-y-3">
          {/* Rotten Defect (Red dot) */}
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Red dot indicator */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#D32F2F] ring-4 ring-red-100 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-900">
                    Rotten (Neck & Basal Plate)
                  </span>
                  <span className="text-[9px] uppercase font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                    High Risk
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Identified on bottom rhizome plate during 2-step flip inspection
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-extrabold text-[#D32F2F] font-mono-numbers">
                {report.defects.rotten}%
              </span>
              <span className="text-[10px] text-stone-400 block font-mono-numbers">
                6 Bulbs
              </span>
            </div>
          </div>

          {/* Sprouted Defect (Green dot) */}
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Green dot indicator */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#00897B] ring-4 ring-teal-100 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-900">
                    Sprouted (Internal/External Shoots)
                  </span>
                  <span className="text-[9px] uppercase font-bold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded">
                    Moisture
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Premature germination & shoot elongation &gt; 3mm
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-extrabold text-[#00897B] font-mono-numbers">
                {report.defects.sprouted}%
              </span>
              <span className="text-[10px] text-stone-400 block font-mono-numbers">
                3 Bulbs
              </span>
            </div>
          </div>

          {/* Undersized Defect (Yellow dot) */}
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Yellow dot indicator */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#F57F17] ring-4 ring-amber-100 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-900">
                    Undersized (&lt; 40mm Caliber)
                  </span>
                  <span className="text-[9px] uppercase font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                    Caliber
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Sub-grade diameter below APMC commercial grading threshold
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-extrabold text-[#F57F17] font-mono-numbers">
                {report.defects.undersized}%
              </span>
              <span className="text-[10px] text-stone-400 block font-mono-numbers">
                2 Bulbs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Screen 4: Visual Section showing analyzed images with small bounding boxes */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              AI Defect Detection Visualizer
            </h3>
            <p className="text-[11px] text-stone-500">
              Interactive bounding boxes over detected bad onions
            </p>
          </div>

          {/* Toggle Bounding Boxes */}
          <button
            onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
            className="flex items-center gap-1 text-[11px] font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition-colors"
          >
            {showBoundingBoxes ? (
              <>
                <Eye className="w-3 h-3 text-emerald-700" />
                <span>Boxes ON</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3 text-stone-400" />
                <span>Boxes OFF</span>
              </>
            )}
          </button>
        </div>

        {/* Surface Switcher (Top View vs Bottom View) */}
        <div className="flex items-center bg-stone-100 rounded-xl p-1 mb-3 text-xs">
          <button
            onClick={() => {
              setSelectedSurface('top');
              setSelectedBox(null);
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              selectedSurface === 'top'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Top View (Upper Skin)
          </button>
          <button
            onClick={() => {
              setSelectedSurface('bottom');
              setSelectedBox(null);
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all relative ${
              selectedSurface === 'bottom'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Bottom View (Occlusion Solver)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-1" />
          </button>
        </div>

        {/* Visual Inspection Container with Interactive Bounding Boxes */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-stone-800 shadow-inner group">
          <img
            src={activeImage}
            alt={`${selectedSurface} onion inspection`}
            className="w-full h-full object-cover"
          />

          {/* Bounding Box Overlays */}
          {showBoundingBoxes &&
            activeBoxes.map((box) => {
              const isSelected = selectedBox?.id === box.id;
              const boxColor =
                box.type === 'rotten'
                  ? '#D32F2F'
                  : box.type === 'sprouted'
                  ? '#00897B'
                  : '#F57F17';

              return (
                <div
                  key={box.id}
                  onClick={() => setSelectedBox(box)}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                    borderColor: boxColor,
                  }}
                  className={`absolute rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                    isSelected ? 'ring-2 ring-white shadow-lg' : 'bg-black/10'
                  }`}
                >
                  {/* Defect Label Pill */}
                  <div
                    style={{ backgroundColor: boxColor }}
                    className="absolute -top-5 left-0 px-1.5 py-0.5 rounded text-[9px] font-bold text-white shadow-sm whitespace-nowrap flex items-center gap-1"
                  >
                    <span>{box.type.toUpperCase()}</span>
                    <span>{(box.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}

          {/* Occlusion Insight Strip on bottom view */}
          {selectedSurface === 'bottom' && (
            <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md rounded-xl p-2 text-[10px] text-emerald-200 border border-emerald-500/30 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Found 2 occluded defects hidden from Top View</span>
              </span>
              <span className="font-bold text-white">97% Basal Rot Conf.</span>
            </div>
          )}
        </div>

        {/* Selected Box Telemetry Card */}
        {selectedBox && (
          <div className="mt-3 p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-stone-900 block">
                {selectedBox.label}
              </span>
              <span className="text-[11px] text-stone-500">
                Confidence: {(selectedBox.confidence * 100).toFixed(1)}% &bull; Size: {selectedBox.sizeMm}mm
              </span>
            </div>
            <button
              onClick={() => setSelectedBox(null)}
              className="text-xs text-stone-400 hover:text-stone-700"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Mandi Payout Valuation Summary */}
      <div className="bg-emerald-950 text-white rounded-3xl p-5 border border-emerald-800 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Estimated Mandi Realization
          </span>
          <span className="text-xs font-semibold text-emerald-400">
            950 kg Lot
          </span>
        </div>

        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-white font-mono-numbers">
            ₹27,850
          </span>
          <span className="text-xs font-semibold text-emerald-200">
            Fair APMC Valuation
          </span>
        </div>

        <div className="mt-3 pt-3 border-t border-emerald-800/80 text-[11px] text-emerald-300 flex justify-between">
          <span>Grade A: 722 kg @ ₹32.00/kg</span>
          <span>URS: 228 kg @ ₹14.00/kg</span>
        </div>
      </div>

      {/* Screen 4: Two Action Buttons at the Bottom */}
      <div className="space-y-3 pt-1">
        {/* Action Button 1: Export as PDF / WhatsApp */}
        <button
          onClick={onExportPdf}
          className="w-full py-4 px-5 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Export as PDF / WhatsApp</span>
        </button>

        {/* Action Button 2: Save to Blockchain / Database */}
        <button
          onClick={handleSaveToLedger}
          disabled={blockchainSaved}
          className={`w-full py-4 px-5 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
            blockchainSaved
              ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-default'
              : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 shadow-xs active:scale-[0.98]'
          }`}
        >
          <Database className="w-4 h-4 text-emerald-700" />
          <span>
            {blockchainSaved
              ? `Saved to AgriChain Ledger (${report.blockchainHash?.slice(0, 10)})`
              : 'Save to Blockchain / Database'}
          </span>
        </button>
      </div>

      {/* Toast confirmation for blockchain save */}
      {blockchainToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs py-2.5 px-5 rounded-full shadow-2xl z-50 flex items-center gap-2 border border-emerald-500/50 animate-in fade-in slide-in-from-bottom-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Lot Grade Hash committed to AgriChain Ledger!</span>
        </div>
      )}
    </div>
  );
};
