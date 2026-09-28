import React, { useState } from 'react';
import {
  X,
  Printer,
  Share2,
  Check,
  QrCode,
  ShieldCheck,
  Send,
  Download,
} from 'lucide-react';
import { ScanReport } from '../types/onion';

interface PdfExportModalProps {
  report: ScanReport;
  onClose: () => void;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({ report, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [whatsAppSent, setWhatsAppSent] = useState(false);

  const shareText = `🧅 *AgriVision AI Quality Certificate*
Lot: ${report.lotNumber}
Farmer: ${report.farmerName} (${report.mandiLocation})
Grade A (Premium): ${report.gradeAPercentage}%
URS (Defective): ${report.ursPercentage}%
- Rotten: ${report.defects.rotten}%
- Sprouted: ${report.defects.sprouted}%
- Undersized: ${report.defects.undersized}%
Est. Fair Value: ₹${report.estimatedPricePerKg.toFixed(2)}/kg
Blockchain Hash: ${report.blockchainHash || '0x8f2d...3c9a81e5'}
Verified by Smart India Hackathon AgriVision AI Engine`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
    setWhatsAppSent(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧅</span>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Mandi Quality Certificate
              </h3>
              <p className="text-[11px] text-stone-500">
                Official APMC & AGMARK Grading Document
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Body (Printable Area) */}
        <div className="p-6 overflow-y-auto space-y-4 print:p-0">
          <div className="border-2 border-emerald-900/40 rounded-2xl p-5 bg-gradient-to-b from-emerald-50/20 to-white relative">
            {/* Watermark badge */}
            <div className="flex justify-between items-start pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-emerald-800 uppercase">
                  Government of India &bull; APMC Lasalgaon
                </span>
                <h4 className="text-base font-extrabold text-stone-900 mt-0.5">
                  ONION QUALITY INSPECTION CERTIFICATE
                </h4>
                <p className="text-[11px] text-stone-500">
                  Dual-Surface AI Computer Vision Assessment
                </p>
              </div>

              <div className="w-12 h-12 rounded-lg bg-stone-900 text-white flex flex-col items-center justify-center text-[9px] font-mono-numbers">
                <QrCode className="w-6 h-6 text-emerald-400" />
                <span>VERIFIED</span>
              </div>
            </div>

            {/* Certificate Metadata */}
            <div className="grid grid-cols-2 gap-3 py-3 text-xs border-b border-stone-200">
              <div>
                <span className="text-stone-400 block text-[10px]">Lot Number</span>
                <strong className="text-stone-900">{report.lotNumber}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Farmer Name</span>
                <strong className="text-stone-900">{report.farmerName}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Inspection Date</span>
                <span className="text-stone-700 font-mono-numbers">{report.date}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Market Location</span>
                <span className="text-stone-700">{report.mandiLocation}</span>
              </div>
            </div>

            {/* Results Table */}
            <div className="py-3">
              <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-2">
                Certified Quality Parameters
              </span>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-emerald-50 text-emerald-950 font-semibold">
                  <span>Grade A (Premium Bulbs)</span>
                  <span className="font-extrabold text-[#2E7D32] font-mono-numbers">
                    {report.gradeAPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-rose-50 text-rose-950 font-semibold">
                  <span>Under-Grade / Defective (URS)</span>
                  <span className="font-extrabold text-[#E53935] font-mono-numbers">
                    {report.ursPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">Rotten</span>
                  <strong className="text-xs text-red-600 font-mono-numbers">
                    {report.defects.rotten}%
                  </strong>
                </div>
                <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">Sprouted</span>
                  <strong className="text-xs text-teal-700 font-mono-numbers">
                    {report.defects.sprouted}%
                  </strong>
                </div>
                <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">Undersized</span>
                  <strong className="text-xs text-amber-700 font-mono-numbers">
                    {report.defects.undersized}%
                  </strong>
                </div>
              </div>
            </div>

            {/* Fair price benchmark */}
            <div className="mt-2 pt-3 border-t border-stone-200 flex justify-between items-center text-xs">
              <span className="text-stone-500 font-medium">Recommended APMC Base Rate:</span>
              <strong className="text-sm text-emerald-800 font-mono-numbers">
                ₹{report.estimatedPricePerKg.toFixed(2)}/kg
              </strong>
            </div>

            {/* Blockchain hash verification */}
            <div className="mt-3 bg-stone-900 text-stone-300 p-2.5 rounded-xl text-[10px] font-mono flex items-center justify-between">
              <div className="truncate mr-2">
                <span className="text-emerald-400">HASH: </span>
                <span>{report.blockchainHash || '0x8f2d65a19cb2e5f8841a02'}</span>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex flex-wrap gap-2">
          {/* WhatsApp Direct Share */}
          <button
            onClick={handleWhatsApp}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send to WhatsApp</span>
          </button>

          {/* Copy Report Summary */}
          <button
            onClick={handleCopy}
            className="py-3 px-4 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          {/* Print Certificate */}
          <button
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
