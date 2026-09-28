import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Video,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2,
  Info,
  Sliders,
  Zap,
  ZapOff,
} from 'lucide-react';
import { ScanReport, Language } from '../types/onion';
import {
  TOP_VIEW_IMAGE,
  BOTTOM_VIEW_IMAGE,
  SAMPLE_TOP_BOXES,
  SAMPLE_BOTTOM_BOXES,
  TRANSLATIONS,
} from '../data/mockData';

interface SmartScanScreenProps {
  onBack: () => void;
  onScanComplete: (newReport: ScanReport) => void;
  language: Language;
}

export const SmartScanScreen: React.FC<SmartScanScreenProps> = ({
  onBack,
  onScanComplete,
  language,
}) => {
  const [scanMode, setScanMode] = useState<'photo' | 'video'>('photo');
  const [currentStep, setCurrentStep] = useState<1 | 2>(1); // 1 = Top View, 2 = Bottom View
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [pipelineStage, setPipelineStage] = useState('');
  const [useWebcam, setUseWebcam] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isShutterActive, setIsShutterActive] = useState(false);
  const [videoTimer, setVideoTimer] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const t = TRANSLATIONS[language];

  // Optional real webcam feed
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (useWebcam) {
      navigator.mediaDevices
        ?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.warn('Camera access not available or denied:', err);
          setUseWebcam(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [useWebcam]);

  // Handle Photo Shutter
  const handleCapture = () => {
    setIsShutterActive(true);
    setTimeout(() => setIsShutterActive(false), 200);

    if (scanMode === 'photo' && currentStep === 1) {
      // Step 1 complete -> Switch to Step 2 for occlusion solution
      setTimeout(() => {
        setCurrentStep(2);
      }, 300);
      return;
    }

    // Step 2 captured or video finished -> trigger AI pipeline
    startInferencePipeline();
  };

  // Handle Video 5-second scan
  const handleStartVideoScan = () => {
    setVideoTimer(5);
    const interval = setInterval(() => {
      setVideoTimer((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setVideoTimer(null);
          startInferencePipeline();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startInferencePipeline = () => {
    setIsProcessing(true);
    setProgressPercent(15);
    setPipelineStage('Extracting frames & normalizing light...');

    setTimeout(() => {
      setProgressPercent(45);
      setPipelineStage('Aligning Top & Bottom surface geometry (Occlusion Solver)...');
    }, 800);

    setTimeout(() => {
      setProgressPercent(75);
      setPipelineStage('Running YOLOv8-Agri: Detecting rot, sprouts & caliber...');
    }, 1700);

    setTimeout(() => {
      setProgressPercent(100);
      setPipelineStage('Calculating AGMARK Grade A vs URS percentages...');
    }, 2400);

    setTimeout(() => {
      // Create new realistic report
      const newReport: ScanReport = {
        id: `REP-${Date.now().toString().slice(-4)}`,
        date: 'Just now · Verified',
        lotNumber: `LOT #ON-${Math.floor(1000 + Math.random() * 9000)}`,
        farmerName: 'Ramesh Patil',
        mandiLocation: 'Lasalgaon Mandi, Nashik',
        variety: 'Nashik Red (Garwa)',
        totalWeightKg: 950,
        gradeAPercentage: 76.0,
        ursPercentage: 24.0,
        defects: {
          rotten: 12.5,
          sprouted: 7.2,
          undersized: 4.3,
        },
        totalCount: 45,
        estimatedPricePerKg: 31.50,
        topViewImage: TOP_VIEW_IMAGE,
        bottomViewImage: BOTTOM_VIEW_IMAGE,
        topBoxes: SAMPLE_TOP_BOXES,
        bottomBoxes: SAMPLE_BOTTOM_BOXES,
        blockchainHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        timestamp: Date.now(),
      };

      setIsProcessing(false);
      onScanComplete(newReport);
    }, 3100);
  };

  return (
    <div className="relative w-full h-full min-h-[620px] bg-black text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Background Camera View / Simulated Onion Batch */}
      <div className="absolute inset-0 z-0">
        {useWebcam ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={currentStep === 1 ? TOP_VIEW_IMAGE : BOTTOM_VIEW_IMAGE}
            alt="Camera Tray"
            className="w-full h-full object-cover transition-all duration-500"
          />
        )}

        {/* Semi-transparent dark overlay for camera UI contrast */}
        <div className="absolute inset-0 bg-black/35 backdrop-brightness-95" />

        {/* Shutter flash animation */}
        {isShutterActive && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-200" />
        )}
      </div>

      {/* Top Controls Header */}
      <div className="relative z-20 pt-3 px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Mode Toggle: Video Scan (5s) vs Two-Step Photo */}
          <div className="flex items-center bg-black/60 backdrop-blur-md border border-white/20 rounded-full p-1 text-xs">
            <button
              onClick={() => {
                setScanMode('photo');
                setCurrentStep(1);
              }}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                scanMode === 'photo'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Two-Step Photo
            </button>
            <button
              onClick={() => setScanMode('video')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                scanMode === 'video'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Video Scan (5s)
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFlashEnabled(!flashEnabled)}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
              title="Toggle Flashlight"
            >
              {flashEnabled ? (
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              ) : (
                <ZapOff className="w-4 h-4 text-white/70" />
              )}
            </button>
          </div>
        </div>

        {/* UI for Two-Step Photo (Step 1 & Step 2 indicators) */}
        {scanMode === 'photo' && (
          <div className="flex items-center justify-center gap-2">
            {/* Step 1 indicator */}
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all ${
                currentStep === 1
                  ? 'bg-emerald-600 text-white border border-emerald-400 shadow-lg shadow-emerald-900/50'
                  : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                {currentStep > 1 ? '✓' : '1'}
              </span>
              <span>Take Top View Photo</span>
            </div>

            <div className="w-4 h-0.5 bg-white/30" />

            {/* Step 2 indicator */}
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all ${
                currentStep === 2
                  ? 'bg-amber-600 text-white border border-amber-400 shadow-lg shadow-amber-900/50 animate-pulse'
                  : 'bg-black/50 text-white/50 border border-white/10'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Flip onions & capture Bottom</span>
            </div>
          </div>
        )}

        {/* Video Mode Guidance */}
        {scanMode === 'video' && (
          <div className="flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white/90">
              {videoTimer !== null
                ? `Recording: 00:0${videoTimer}s`
                : 'Tap record to capture 5s orbital 360° video'}
            </span>
          </div>
        )}
      </div>

      {/* Center Viewport Guidance Box with Occlusion Reticle */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        <div className="relative w-full max-w-[310px] aspect-square rounded-3xl border-2 border-dashed border-emerald-400/80 flex flex-col items-center justify-between p-4 bg-emerald-500/5 backdrop-blur-[1px]">
          {/* Corner tick marks */}
          <div className="w-full flex justify-between">
            <div className="w-5 h-5 border-t-2 border-l-2 border-white rounded-tl-md" />
            <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-tr-md" />
          </div>

          {/* Center Gyroscopic Level & Occlusion Callout */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-medium text-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>
                {currentStep === 1
                  ? 'Step 1: Spread onions on flat tray'
                  : 'Step 2: Flip over to expose root bases'}
              </span>
            </div>

            {/* Explanation of Occlusion Solution */}
            <p className="text-[11px] text-white/80 max-w-[220px] bg-black/40 px-2 py-1 rounded-lg">
              {currentStep === 1
                ? 'Detects neck rot, outer mold & caliber sizing'
                : 'Detects basal plate decay & hidden sprouting under onions'}
            </p>
          </div>

          <div className="w-full flex justify-between">
            <div className="w-5 h-5 border-b-2 border-l-2 border-white rounded-bl-md" />
            <div className="w-5 h-5 border-b-2 border-r-2 border-white rounded-br-md" />
          </div>
        </div>

        {/* Input source toggle (Webcam vs Realistic Test Tray) */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => setUseWebcam(!useWebcam)}
            className="text-[11px] text-stone-300 bg-black/60 hover:bg-black/80 px-2.5 py-1 rounded-lg border border-white/20 transition-colors"
          >
            {useWebcam ? 'Switch to Test Tray Demo' : 'Use Device Camera Feed'}
          </button>
        </div>
      </div>

      {/* Bottom Shutter & Capture Controls */}
      <div className="relative z-20 pb-8 pt-4 px-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center">
        {/* Step helper note */}
        <p className="text-xs text-white/70 mb-4 font-medium text-center">
          {scanMode === 'photo'
            ? currentStep === 1
              ? 'Press shutter to capture Top Surface'
              : 'Turn onions 180° and press shutter for Bottom Surface'
            : 'Press button to capture 5s rotation video'}
        </p>

        {/* Shutter Button */}
        <div className="flex items-center justify-center gap-8 w-full">
          {/* Flip / Reset step button */}
          <button
            onClick={() => setCurrentStep(currentStep === 1 ? 2 : 1)}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/80 transition-colors"
            title="Switch Surface View"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Primary Shutter Trigger */}
          {scanMode === 'photo' ? (
            <button
              onClick={handleCapture}
              disabled={isProcessing}
              className="w-20 h-20 rounded-full border-4 border-white/90 p-1.5 flex items-center justify-center shadow-xl active:scale-95 transition-all group"
            >
              <div className="w-full h-full rounded-full bg-emerald-600 group-hover:bg-emerald-500 flex items-center justify-center transition-colors">
                <Camera className="w-7 h-7 text-white" />
              </div>
            </button>
          ) : (
            <button
              onClick={videoTimer !== null ? () => {} : handleStartVideoScan}
              disabled={isProcessing}
              className="w-20 h-20 rounded-full border-4 border-white/90 p-1.5 flex items-center justify-center shadow-xl active:scale-95 transition-all group"
            >
              <div
                className={`w-full h-full rounded-full flex items-center justify-center transition-colors ${
                  videoTimer !== null ? 'bg-red-600 animate-pulse' : 'bg-red-500'
                }`}
              >
                <Video className="w-7 h-7 text-white" />
              </div>
            </button>
          )}

          {/* Quick Info Trigger */}
          <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80">
            <span className="text-xs font-bold font-mono-numbers">
              {currentStep}/2
            </span>
          </div>
        </div>
      </div>

      {/* High-Tech AI Inference Progress Dialog Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 animate-pulse">
              <Sparkles className="w-10 h-10" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-stone-900 text-xs font-bold">
              ✓
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">
            Extracting frames & detecting defects...
          </h3>

          <p className="text-xs text-emerald-300 mb-6 max-w-xs font-medium">
            {pipelineStage}
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-xs bg-stone-800 rounded-full h-2.5 overflow-hidden border border-stone-700">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span className="text-xs font-bold text-stone-400 mt-2 font-mono-numbers">
            {progressPercent}% Complete
          </span>

          {/* Occlusion banner */}
          <div className="mt-8 px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-[11px] text-emerald-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fused Top & Bottom 3D Mesh to eliminate blind spots</span>
          </div>
        </div>
      )}
    </div>
  );
};
